import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Plus, Minus, Trash2, CheckCircle, AlertTriangle, XCircle, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { BadgeBajoPedido } from '../components/BadgeBajoPedido';
import cartIcon from '../../imports/Autex_Carrito-_1.svg';

function fmt(n: number) {
  return `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
}

// ── Validation modal ───────────────────────────────────────────────────────────

type ValidationState = 'stock' | 'payment' | 'channel' | 'success';

interface ModalConfig {
  type: 'error' | 'warning' | 'success';
  title: string;
  message: string;
  items?: string[];
  primary: { label: string; action: 'close' | 'checkout' };
  secondary?: { label: string; action: 'close' | 'explore' };
}

const VALIDATION_SEQUENCE: ValidationState[] = ['stock', 'payment', 'channel', 'success'];

const MODAL_CONFIG: Record<ValidationState, ModalConfig> = {
  stock: {
    type: 'error',
    title: 'Algunos productos ya no están disponibles',
    message: 'Mientras preparabas tu compra, uno o más productos agotaron su inventario. Revisa tu carrito antes de continuar.',
    primary: { label: 'Revisar carrito', action: 'close' },
    secondary: { label: 'Seguir comprando', action: 'explore' },
  },
  payment: {
    type: 'warning',
    title: 'Método de pago no disponible',
    message: 'El método de pago seleccionado no puede utilizarse para esta compra. Selecciona otro método para continuar.',
    primary: { label: 'Aceptar', action: 'close' },
  },
  channel: {
    type: 'warning',
    title: 'No es posible continuar con este pedido',
    message: 'Algunos productos presentan restricciones para la configuración actual del pedido. Revisa tu carrito o modifica la información de entrega.',
    primary: { label: 'Aceptar', action: 'close' },
  },
  success: {
    type: 'success',
    title: 'Todo está listo para continuar',
    message: 'El pedido cumple con las validaciones de inventario, método de pago y reglas comerciales.',
    items: ['Disponibilidad de inventario ✓', 'Método de pago ✓', 'Reglas del canal ✓'],
    primary: { label: 'Continuar al Checkout', action: 'checkout' },
  },
};

function typeStyles(type: ModalConfig['type']) {
  if (type === 'error')   return { bg: 'bg-red-50', border: 'border-red-200', icon: XCircle, iconColor: 'text-red-500', btnPrimary: 'bg-red-600 hover:bg-red-700' };
  if (type === 'warning') return { bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-500', btnPrimary: 'bg-[#1E3A8A] hover:bg-blue-700' };
  return { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, iconColor: 'text-green-500', btnPrimary: 'bg-green-600 hover:bg-green-700' };
}

interface ValidationModalProps {
  state: ValidationState;
  onClose: () => void;
  onCheckout: () => void;
  onExplore: () => void;
}

function ValidationModal({ state, onClose, onCheckout, onExplore }: ValidationModalProps) {
  const cfg = MODAL_CONFIG[state];
  const styles = typeStyles(cfg.type);
  const Icon = styles.icon;

  const handlePrimary = () => {
    if (cfg.primary.action === 'checkout') onCheckout();
    else onClose();
  };

  const handleSecondary = () => {
    if (cfg.secondary?.action === 'explore') onExplore();
    else onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border ${styles.border}`}>
        {/* Color strip */}
        <div className={`${styles.bg} px-6 pt-6 pb-5`}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full ${styles.bg} border ${styles.border} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${styles.iconColor}`} />
            </div>
            <div>
              <h3 id="modal-title" className="font-semibold text-gray-800 text-base leading-snug">{cfg.title}</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{cfg.message}</p>
              {cfg.items && (
                <ul className="mt-3 space-y-1">
                  {cfg.items.map((it) => (
                    <li key={it} className="text-sm text-green-700 font-medium">{it}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end bg-white">
          {cfg.secondary && (
            <button
              onClick={handleSecondary}
              className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {cfg.secondary.label}
            </button>
          )}
          <button
            onClick={handlePrimary}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${styles.btnPrimary}`}
          >
            {cfg.primary.label}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CartCard ──────────────────────────────────────────────────────────────────

function CartCard({ item, onRemove, onQty }: { item: CartItem; onRemove: () => void; onQty: (q: number) => void }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 ${item.backorder ? 'border-orange-100 bg-orange-50/30' : 'border-gray-100'}`}>
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0">
          {item.image
            ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            : <span className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-mono">{item.sku.split('-')[0]}</span>
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-[10px] text-gray-400 font-mono mb-0.5">SKU #{item.sku}</p>
              <p className="font-medium text-gray-800 leading-snug">{item.name}</p>
              {item.backorder && (
                <>
                  <span className="mt-2 block"><BadgeBajoPedido /></span>
                  <p className="text-xs text-orange-500 mt-1">Entrega estimada de 2 a 4 días hábiles</p>
                </>
              )}
              {!item.backorder && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Disponible
                </p>
              )}
            </div>
            <button
              onClick={onRemove}
              aria-label={`Eliminar ${item.name}`}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center border rounded-xl overflow-hidden bg-white">
              <button onClick={() => onQty(item.qty - 1)} aria-label="Disminuir" className="px-3 py-2 hover:bg-gray-100 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center border-x">{item.qty}</span>
              <button onClick={() => onQty(item.qty + 1)} aria-label="Aumentar" className="px-3 py-2 hover:bg-gray-100 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{fmt(item.price)} c/u</p>
              <p className="font-semibold text-gray-800 text-base">{fmt(item.price * item.qty)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function MiCarrito() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const navigate = useNavigate();
  const available = items.filter((i) => !i.backorder);
  const backorder = items.filter((i) => i.backorder);
  const [validationIdx, setValidationIdx] = useState(0);
  const [activeModal, setActiveModal] = useState<ValidationState | null>(null);

  const shipping = subtotal >= 499 ? 0 : 99;
  const total = subtotal + shipping;

  const handleProceed = () => {
    const state = VALIDATION_SEQUENCE[validationIdx % VALIDATION_SEQUENCE.length];
    setActiveModal(state);
    setValidationIdx((i) => i + 1);
  };

  const handleClose = () => setActiveModal(null);
  const handleCheckout = () => { setActiveModal(null); navigate('/checkout'); };
  const handleExplore = () => { setActiveModal(null); navigate('/catalogo'); };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Mi carrito</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-gray-700" />
          <h1 className="text-2xl font-semibold text-gray-800">Mi carrito</h1>
          {items.length > 0 && (
            <span className="text-sm text-gray-400">({items.reduce((s, i) => s + i.qty, 0)} productos)</span>
          )}
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="max-w-lg mx-auto px-4 py-32 text-center">
          <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-5" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-400 mb-8">Agrega productos desde el catálogo para comenzar tu compra.</p>
          <Link
            to="/catalogo"
            className="inline-block bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Product list */}
            <div className="flex-1 space-y-8">

              {/* Disponibles */}
              {available.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-4 h-4 rounded-full bg-green-500 shrink-0" />
                    <h2 className="text-base font-semibold text-green-600">
                      Productos disponibles{' '}
                      <span className="font-normal text-green-500">({available.reduce((s, i) => s + i.qty, 0)})</span>
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {available.map((item) => (
                      <CartCard key={item.sku} item={item} onRemove={() => removeItem(item.sku)} onQty={(q) => updateQty(item.sku, q)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Bajo pedido */}
              {backorder.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="18" viewBox="0 0 12 14" fill="none" className="shrink-0" aria-hidden="true">
                      <path d="M1 1h10M1 13h10M2 1v2.5C2 6 6 7 6 7S2 8 2 10.5V13M10 1v2.5C10 6 6 7 6 7s4 1 4 3.5V13" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2 className="text-base font-semibold text-orange-500">
                      Productos bajo pedido{' '}
                      <span className="font-normal">({backorder.reduce((s, i) => s + i.qty, 0)})</span>
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {backorder.map((item) => (
                      <CartCard key={item.sku} item={item} onRemove={() => removeItem(item.sku)} onQty={(q) => updateQty(item.sku, q)} />
                    ))}
                  </div>
                </div>
              )}

              <Link to="/catalogo" className="inline-flex text-sm text-blue-600 hover:underline pt-2">
                ← Seguir comprando
              </Link>
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-80 shrink-0 sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-gray-800 text-lg">Resumen de compra</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'Gratis' : fmt(shipping)}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-1.5">
                      ¡Tu compra califica para envío gratis!
                    </p>
                  )}
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span className="text-lg">{fmt(total)}</span>
                </div>

                <p className="text-xs text-gray-400 text-center">IVA incluido en el precio de cada producto.</p>

                <button
                  onClick={handleProceed}
                  className="w-full bg-[#1E3A8A] text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                >
                  Proceder al pago
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  Pago seguro y encriptado
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Validation modal */}
      {activeModal && (
        <ValidationModal
          state={activeModal}
          onClose={handleClose}
          onCheckout={handleCheckout}
          onExplore={handleExplore}
        />
      )}
    </div>
  );
}
