import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ChevronRight, Package } from 'lucide-react';

type OrderStatus =
  | 'pendiente-pago'
  | 'pagado'
  | 'en-surtido'
  | 'dividido'
  | 'bajo-pedido'
  | 'facturado'
  | 'cancelado';

interface Order {
  id: string;
  date: string;
  total: string;
  status: OrderStatus;
  estimatedDelivery?: string;
  items: number;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  'pendiente-pago': { label: 'Pendiente de pago', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  pagado:           { label: 'Pagado',             color: 'text-blue-700',  bg: 'bg-blue-50 border-blue-200' },
  'en-surtido':     { label: 'En surtido',         color: 'text-indigo-700',bg: 'bg-indigo-50 border-indigo-200' },
  dividido:         { label: 'Dividido',            color: 'text-violet-700',bg: 'bg-violet-50 border-violet-200' },
  'bajo-pedido':    { label: 'Bajo pedido',         color: 'text-orange-700',bg: 'bg-orange-50 border-orange-200' },
  facturado:        { label: 'Facturado',           color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  cancelado:        { label: 'Cancelado',           color: 'text-red-700',   bg: 'bg-red-50 border-red-200' },
};

const mockOrders: Order[] = [
  { id: 'AUT-2026-00189', date: '2026-07-28', total: '$1,850.00', status: 'facturado',       estimatedDelivery: '2026-08-02', items: 3 },
  { id: 'AUT-2026-00172', date: '2026-07-20', total: '$640.00',  status: 'dividido',         estimatedDelivery: '2026-08-05', items: 5 },
  { id: 'AUT-2026-00155', date: '2026-07-10', total: '$320.00',  status: 'en-surtido',       estimatedDelivery: '2026-08-01', items: 2 },
  { id: 'AUT-2026-00140', date: '2026-06-28', total: '$2,100.00', status: 'bajo-pedido',     items: 1 },
  { id: 'AUT-2026-00121', date: '2026-06-15', total: '$490.00',  status: 'cancelado',        items: 2 },
  { id: 'AUT-2026-00108', date: '2026-06-01', total: '$875.00',  status: 'facturado',        estimatedDelivery: '2026-06-06', items: 4 },
];

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

export function MisPedidos() {
  const [search, setSearch] = useState('');

  const filtered = mockOrders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Mis pedidos</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#1E3A8A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-1">Mis pedidos</h1>
          <p className="text-blue-200">Historial y seguimiento de tus compras recientes.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por número de pedido"
            className="w-full md:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package className="w-14 h-14 text-gray-200 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No encontramos ese pedido.</p>
            <p className="text-gray-400 text-sm mt-1">Verifica el número e inténtalo nuevamente.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-semibold text-gray-800 text-sm">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                      <span>Fecha: {new Date(order.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span>Total: <span className="font-medium text-gray-700">{order.total}</span></span>
                      <span>{order.items} {order.items === 1 ? 'producto' : 'productos'}</span>
                    </div>
                    {order.estimatedDelivery && (
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        Entrega estimada: {new Date(order.estimatedDelivery).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/pedido/${order.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 shrink-0 focus:outline-none focus:underline"
                  >
                    Ver seguimiento
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/rastreo-pedido" className="text-sm text-blue-600 hover:underline">
            ¿Buscas un pedido que hiciste como invitado? Rastrear por número de pedido →
          </Link>
        </div>
      </div>
    </div>
  );
}
