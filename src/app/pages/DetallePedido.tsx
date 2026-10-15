import { useParams, Link } from 'react-router';
import { useState } from 'react';
import {
  CreditCard, CheckCircle, Package, Layers, BookOpen,
  FileText, XCircle, Truck, RotateCcw, ExternalLink, ChevronDown, ChevronUp
} from 'lucide-react';

type OrderStatus =
  | 'pendiente-pago'
  | 'pagado'
  | 'en-surtido'
  | 'dividido'
  | 'bajo-pedido'
  | 'facturado'
  | 'cancelado';

interface StepDef {
  key: OrderStatus;
  label: string;
  description: string;
  icon: React.ElementType;
}

const STEPS: StepDef[] = [
  { key: 'pendiente-pago', label: 'Pendiente de pago',              description: 'Tu pedido fue creado y está esperando confirmación de pago.',            icon: CreditCard },
  { key: 'pagado',         label: 'Pagado',                         description: 'Tu pago fue confirmado exitosamente.',                                     icon: CheckCircle },
  { key: 'en-surtido',    label: 'En surtido',                     description: 'Estamos preparando tus productos para el envío.',                          icon: Package },
  { key: 'dividido',      label: 'Dividido',                       description: 'Tu pedido se dividió en paquetes que se enviarán por separado.',           icon: Layers },
  { key: 'bajo-pedido',   label: 'Bajo pedido – Catálogo Extendido', description: 'Uno o más productos se solicitaron al proveedor. Están en camino.',       icon: BookOpen },
  { key: 'facturado',     label: 'Facturado',                      description: 'Tu pedido fue facturado y está en camino a tu domicilio.',                 icon: FileText },
  { key: 'cancelado',     label: 'Cancelado',                      description: 'Tu pedido fue cancelado. Contacta soporte si tienes dudas.',               icon: XCircle },
];

type MockOrder = {
  id: string;
  date: string;
  status: OrderStatus;
  estimatedDelivery?: string;
  total: string;
  guide?: string;
  carrier?: string;
  trackingUrl?: string;
  packages?: { id: string; label: string; status: OrderStatus; estimatedDelivery?: string; guide?: string }[];
};

const MOCK_ORDERS: Record<string, MockOrder> = {
  'AUT-2026-00189': {
    id: 'AUT-2026-00189', date: '2026-07-28', status: 'facturado', total: '$1,850.00',
    estimatedDelivery: '2026-08-02', guide: '1Z999AA10123456784', carrier: 'Estafeta',
    trackingUrl: 'https://www.estafeta.com',
  },
  'AUT-2026-00172': {
    id: 'AUT-2026-00172', date: '2026-07-20', status: 'dividido', total: '$640.00',
    estimatedDelivery: '2026-08-05',
    packages: [
      { id: 'PKG-001', label: 'Paquete 1', status: 'facturado', estimatedDelivery: '2026-08-02', guide: '1Z999AA10123456784' },
      { id: 'PKG-002', label: 'Paquete 2', status: 'en-surtido', estimatedDelivery: '2026-08-05' },
    ],
  },
  'AUT-2026-00155': {
    id: 'AUT-2026-00155', date: '2026-07-10', status: 'en-surtido', total: '$320.00',
    estimatedDelivery: '2026-08-01',
  },
  'AUT-2026-00140': {
    id: 'AUT-2026-00140', date: '2026-06-28', status: 'bajo-pedido', total: '$2,100.00',
  },
  'AUT-2026-00121': {
    id: 'AUT-2026-00121', date: '2026-06-15', status: 'cancelado', total: '$490.00',
  },
  'AUT-2026-00108': {
    id: 'AUT-2026-00108', date: '2026-06-01', status: 'facturado', total: '$875.00',
    estimatedDelivery: '2026-06-06', guide: '1Z999AA10123456111', carrier: 'DHL',
    trackingUrl: 'https://www.dhl.com',
  },
};

const statusColor: Record<OrderStatus, string> = {
  'pendiente-pago': 'text-amber-600',
  pagado:           'text-blue-600',
  'en-surtido':     'text-indigo-600',
  dividido:         'text-violet-600',
  'bajo-pedido':    'text-orange-600',
  facturado:        'text-green-600',
  cancelado:        'text-red-500',
};

const statusBadge: Record<OrderStatus, string> = {
  'pendiente-pago': 'bg-amber-50 text-amber-700 border-amber-200',
  pagado:           'bg-blue-50 text-blue-700 border-blue-200',
  'en-surtido':     'bg-indigo-50 text-indigo-700 border-indigo-200',
  dividido:         'bg-violet-50 text-violet-700 border-violet-200',
  'bajo-pedido':    'bg-orange-50 text-orange-700 border-orange-200',
  facturado:        'bg-green-50 text-green-700 border-green-200',
  cancelado:        'bg-red-50 text-red-700 border-red-200',
};

const NORMAL_FLOW: OrderStatus[] = ['pendiente-pago', 'pagado', 'en-surtido', 'facturado'];
const DIVIDED_FLOW: OrderStatus[] = ['pendiente-pago', 'pagado', 'en-surtido', 'dividido', 'facturado'];
const BACKORDER_FLOW: OrderStatus[] = ['pendiente-pago', 'pagado', 'bajo-pedido', 'facturado'];
const CANCELLED_FLOW: OrderStatus[] = ['pendiente-pago', 'cancelado'];

function getFlow(status: OrderStatus): OrderStatus[] {
  if (status === 'cancelado') return CANCELLED_FLOW;
  if (status === 'dividido') return DIVIDED_FLOW;
  if (status === 'bajo-pedido') return BACKORDER_FLOW;
  return NORMAL_FLOW;
}

function getStepIndex(flow: OrderStatus[], status: OrderStatus) {
  return flow.indexOf(status);
}

function Timeline({ status, flow }: { status: OrderStatus; flow: OrderStatus[] }) {
  const activeIdx = getStepIndex(flow, status);
  return (
    <ol className="relative">
      {flow.map((key, i) => {
        const step = STEPS.find((s) => s.key === key)!;
        const Icon = step.icon;
        const isDone = i < activeIdx;
        const isActive = i === activeIdx;
        const isPending = i > activeIdx;
        const isLast = i === flow.length - 1;

        return (
          <li key={key} className="flex gap-4 pb-8 last:pb-0 relative">
            {/* Vertical line */}
            {!isLast && (
              <div className={`absolute left-4 top-8 w-0.5 bottom-0 ${isDone ? 'bg-blue-500' : 'bg-gray-200'}`} />
            )}

            {/* Icon circle */}
            <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
              isDone    ? 'bg-blue-500 border-blue-500 text-white' :
              isActive  ? 'bg-white border-[#1E3A8A] text-[#1E3A8A]' :
                          'bg-white border-gray-200 text-gray-300'
            }`}>
              <Icon className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className={`pt-1 ${isPending ? 'opacity-40' : ''}`}>
              <p className={`text-sm font-semibold ${isActive ? statusColor[key] : isDone ? 'text-gray-700' : 'text-gray-400'}`}>
                {step.label}
              </p>
              {(isDone || isActive) && (
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function PackageCard({ pkg }: { pkg: NonNullable<MockOrder['packages']>[number] }) {
  const [open, setOpen] = useState(true);
  const flow = getFlow(pkg.status);
  const stepDef = STEPS.find((s) => s.key === pkg.status)!;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-[#1E3A8A]" />
          <span className="font-semibold text-gray-800">{pkg.label}</span>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusBadge[pkg.status]}`}>
            {stepDef.label}
          </span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t">
          {pkg.estimatedDelivery && (
            <p className="text-sm text-green-600 font-medium mt-4 mb-4">
              Entrega estimada: {new Date(pkg.estimatedDelivery).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
          {pkg.guide && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
              <Truck className="w-4 h-4 text-gray-400" />
              <span>Guía: <span className="font-mono font-medium">{pkg.guide}</span></span>
            </div>
          )}
          <Timeline status={pkg.status} flow={flow} />
        </div>
      )}
    </div>
  );
}

export function DetallePedido() {
  const { id } = useParams<{ id: string }>();
  const order = id ? MOCK_ORDERS[id] : undefined;

  /* ── Not found ── */
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600">Inicio</Link>
            <span>/</span>
            <Link to="/rastreo-pedido" className="hover:text-blue-600">Rastreo</Link>
            <span>/</span>
            <span className="text-gray-800">Pedido no encontrado</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Package className="w-9 h-9 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No encontramos un pedido con ese número</h2>
          <p className="text-gray-500 mb-8">Verifica el número e inténtalo nuevamente.</p>
          <Link
            to="/rastreo-pedido"
            className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Intentar otra vez
          </Link>
        </div>
      </div>
    );
  }

  const flow = getFlow(order.status);
  const statusLabel = STEPS.find((s) => s.key === order.status)?.label ?? order.status;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <Link to="/mis-pedidos" className="hover:text-blue-600">Mis pedidos</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{order.id}</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#1E3A8A] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-blue-300 text-sm mb-1">Seguimiento de pedido</p>
              <h1 className="text-2xl md:text-3xl font-semibold">{order.id}</h1>
            </div>
            <span className={`self-start sm:self-auto text-sm font-medium px-3 py-1.5 rounded-full border ${statusBadge[order.status]}`}>
              {statusLabel}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm text-blue-200">
            <span>Compra: {new Date(order.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>Total: <span className="text-white font-medium">{order.total}</span></span>
            {order.estimatedDelivery && (
              <span>Entrega estimada: <span className="text-white font-medium">{new Date(order.estimatedDelivery).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</span></span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 pb-16">

        {/* Logistics info */}
        {(order.guide || order.carrier) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#1E3A8A]" /> Información de envío
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {order.carrier && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Paquetería</p>
                  <p className="font-medium text-gray-700">{order.carrier}</p>
                </div>
              )}
              {order.guide && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Número de guía</p>
                  <p className="font-mono font-medium text-gray-700">{order.guide}</p>
                </div>
              )}
            </div>
            {order.trackingUrl && (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
              >
                <ExternalLink className="w-4 h-4" /> Rastrear envío en {order.carrier}
              </a>
            )}
          </div>
        )}

        {/* Timeline */}
        {order.status !== 'dividido' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-6">Estado del pedido</h2>
            <Timeline status={order.status} flow={flow} />
          </div>
        )}

        {/* Divided packages */}
        {order.status === 'dividido' && order.packages && (
          <div>
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-violet-600" /> Tus paquetes
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Tu pedido fue dividido. Cada paquete se enviará de forma independiente.
            </p>
            <div className="space-y-4">
              {order.packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        )}

        {/* Help */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-medium text-gray-800">¿Necesitas ayuda con tu pedido?</p>
            <p className="text-sm text-gray-500">Nuestro equipo puede asistirte de lunes a viernes de 9:00 a 18:00 hrs.</p>
          </div>
          <a
            href="https://wa.me/523332084440"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Contactar soporte
          </a>
        </div>

        <div className="text-center">
          <Link to="/mis-pedidos" className="text-sm text-blue-600 hover:underline">
            ← Volver a mis pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}
