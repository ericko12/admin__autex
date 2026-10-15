import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { BadgeBajoPedido } from '../components/BadgeBajoPedido';
import {
  Check, ChevronRight, Truck, CreditCard, User,
  Plus, Tag, CheckCircle, X, ChevronDown,
  Landmark, Wallet, Globe, Lock, AlertCircle,
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

interface ToastMsg { id: string; message: string; }

// ─── Utilities ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const STEPS = [
  { n: 1 as Step, label: 'Datos del usuario' },
  { n: 2 as Step, label: 'Método de envío' },
  { n: 3 as Step, label: 'Método de pago' },
  { n: 4 as Step, label: 'Confirmación' },
];

const ADDRESSES = [
  { id: 0, label: 'Dirección 1', street: 'Av. Vallarta 3233', area: 'Col. Vallartita, Guadalajara, JAL 44690', contact: 'Taller El Rápido S.A. de C.V.' },
  { id: 1, label: 'Dirección 2', street: 'Calle Independencia 45', area: 'Col. Centro, Zapopan, JAL 45100', contact: 'Repuestos Veloz' },
];

const SHIPPING_OPTIONS = [
  { id: 0, title: 'Envío a domicilio', time: 'De 3 a 5 días hábiles', cost: 0, badge: null },
  { id: 1, title: 'Envío Express', time: 'De 1 a 2 días hábiles', cost: 150, badge: null },
  { id: 2, title: 'Entrega bajo pedido', time: 'De 7 a 10 días hábiles', cost: 0, badge: 'Productos bajo pedido' },
];

const SAVED_CARDS = [
  { id: 0, brand: 'Visa', last4: '4242', type: 'Débito', color: 'bg-blue-700' },
  { id: 1, brand: 'Mastercard', last4: '1234', type: 'Crédito', color: 'bg-red-600' },
];

const OTHER_PAYMENT = [
  { id: 0, title: 'OXXO Pay', desc: 'Paga en efectivo en cualquier OXXO', Icon: Landmark },
  { id: 1, title: 'Transferencia bancaria', desc: 'Pago mediante SPEI', Icon: Wallet },
];

// allProducts: true → applies to every item; false → excludes backorder items
type CouponType = { allProducts: boolean } & (
  | { type: 'percent'; rate: number }
  | { type: 'fixed'; amount: number }
);

const VALID_COUPONS: Record<string, CouponType> = {
  VERANO2026: { type: 'percent', rate: 0.20, allProducts: true  },
  FRENOS20:   { type: 'fixed',   amount: 150, allProducts: false },
};

interface CouponPromoInfo {
  name: string;
  description: string;
  validity: string;
  products: string;
  conditions: string;
}

const COUPON_INFO: Record<string, CouponPromoInfo> = {
  VERANO2026: {
    name: 'Verano 2026',
    description: 'Descuento especial del 20% para la temporada de verano en toda la línea de productos AUTEX.',
    validity: 'Válido hasta el 31 de agosto de 2026.',
    products: 'Aplica a todos los productos del catálogo AUTEX disponibles en línea.',
    conditions: 'No acumulable con otras promociones o cupones. Válido únicamente en compras realizadas a través de autex.com.mx. Un uso por cliente.',
  },
  FRENOS20: {
    name: 'Frenos 20',
    description: 'Descuento de $150 MXN en productos seleccionados de frenos y suspensión.',
    validity: 'Válido hasta el 31 de diciembre de 2026.',
    products: 'Aplica exclusivamente a productos de la categoría Frenos y Suspensión con disponibilidad inmediata. No aplica en productos bajo pedido.',
    conditions: 'No acumulable con otras promociones. Descuento aplicado al total de los productos elegibles. Sujeto a disponibilidad de inventario.',
  },
};

const STEP_TITLES: Record<Step, string> = {
  1: 'Datos del usuario',
  2: 'Método de envío',
  3: 'Método de pago',
  4: 'Confirmación',
};

// ─── Reusable sub-components ──────────────────────────────────────────────────

function Stepper({ current }: { current: Step }) {
  return (
    <div className="flex items-start">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex-1 flex flex-col items-center relative">
          {i > 0 && (
            <div className={`absolute top-4 left-0 w-1/2 h-0.5 ${current >= s.n ? 'bg-[#1E3A8A]' : 'bg-gray-200'}`} />
          )}
          {i < 3 && (
            <div className={`absolute top-4 right-0 w-1/2 h-0.5 ${current > s.n ? 'bg-[#1E3A8A]' : 'bg-gray-200'}`} />
          )}
          <div className={`relative w-8 h-8 rounded-full flex items-center justify-center z-10 text-sm font-semibold border-2 transition-colors
            ${current > s.n
              ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
              : current === s.n
                ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                : 'bg-white border-gray-300 text-gray-400'}`}
          >
            {current > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
          </div>
          <span className={`mt-2 text-xs font-medium text-center hidden sm:block leading-tight max-w-[80px] ${current >= s.n ? 'text-[#1E3A8A]' : 'text-gray-400'}`}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CardHeader({ title }: { title: string }) {
  return (
    <div className="bg-[#1E3A8A] rounded-t-xl px-6 py-4 flex items-center gap-2.5">
      <div className="flex items-center shrink-0">
        <div className="w-1.5 h-6 bg-red-500" />
        <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[8px] border-l-red-500" />
      </div>
      <h2 className="text-white font-semibold text-base">{title}</h2>
    </div>
  );
}

function SelectableCard({ selected, onSelect, children }: {
  selected: boolean; onSelect: () => void; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-colors
        ${selected ? 'border-[#1E3A8A] bg-blue-50/40' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
          ${selected ? 'border-[#1E3A8A]' : 'border-gray-400'}`}>
          {selected && <div className="w-2 h-2 rounded-full bg-[#1E3A8A]" />}
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </button>
  );
}

function StepButtons({ onBack, onNext, nextLabel = 'Continuar', backLabel = 'Regresar' }: {
  onBack: () => void; onNext?: () => void; nextLabel?: string; backLabel?: string;
}) {
  return (
    <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
      <button
        onClick={onBack}
        className="px-7 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {backLabel}
      </button>
      {onNext && (
        <button
          onClick={onNext}
          className="px-7 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-sm font-semibold hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [paymentTab, setPaymentTab] = useState<'cards' | 'other'>('cards');
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedOther, setSelectedOther] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponType | null>(null);
  const [appliedCode, setAppliedCode] = useState('');
  const [showCouponInfo, setShowCouponInfo] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const addToast = useCallback((message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  // Eligibility: which items receive the coupon discount
  const eligibleSkus: Set<string> = appliedCoupon
    ? new Set(items.filter(i => appliedCoupon.allProducts || !i.backorder).map(i => i.sku))
    : new Set();
  const someExcluded = appliedCoupon !== null && eligibleSkus.size < items.length;

  // Derived pricing
  const shippingCost = SHIPPING_OPTIONS[selectedShipping]?.cost ?? 0;
  const eligibleSubtotal = items
    .filter(i => eligibleSkus.has(i.sku))
    .reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = appliedCoupon
    ? appliedCoupon.type === 'percent'
      ? Math.round(eligibleSubtotal * appliedCoupon.rate)
      : Math.min(appliedCoupon.amount, eligibleSubtotal)
    : 0;
  const total = subtotal + shippingCost - discount;

  const next = () => { if (step < 4) setStep((s) => (s + 1) as Step); };
  const back = () => { if (step > 1) setStep((s) => (s - 1) as Step); };
  const goTo = (s: Step) => setStep(s);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const coupon = VALID_COUPONS[code];
    if (coupon) {
      setCouponStatus('valid');
      setAppliedCoupon(coupon);
      setAppliedCode(code);
      addToast('Cupón aplicado correctamente');
    } else {
      setCouponStatus('invalid');
    }
  };

  const removeCoupon = () => {
    setCouponStatus('idle');
    setAppliedCoupon(null);
    setCouponInput('');
    setAppliedCode('');
  };

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const sidebar = (
    <div className="space-y-4">

      {/* Order detail */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm">Detalle de pedido</h3>
        </div>
        <div className="px-5 py-4 space-y-2.5 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Costo de Envío</span>
            <span>{shippingCost === 0
              ? <span className="text-green-600 font-medium">Sin costo</span>
              : fmt(shippingCost)}
            </span>
          </div>
          <div className={`flex justify-between font-medium ${discount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
            <span>Descuentos aplicados</span>
            <span>{discount > 0 ? `−${fmt(discount)}` : fmt(0)}</span>
          </div>
          <div className="border-t pt-2.5 flex justify-between font-bold text-[#1E3A8A] text-base">
            <span>Total (IVA incluido)</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Coupon */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative group shrink-0">
            <Tag className="w-4 h-4 text-gray-500 cursor-default" />
            <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-44 bg-gray-900 text-white text-[10px] px-2.5 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 leading-snug">
              <p className="font-semibold mb-1 text-gray-300">Promociones disponibles:</p>
              <p className="font-mono">verano2026</p>
              <p className="font-mono">Frenos20</p>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700">¿Tienes un cupón de descuento?</span>
        </div>

        {couponStatus === 'valid' ? (
          <>
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">{appliedCode}</span>
              </div>
              <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500 transition-colors ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">Este cupón puede tener restricciones y condiciones</p>
            <button
              onClick={() => setShowCouponInfo(true)}
              className="mt-1 text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
            >
              Ver información del cupón
            </button>
            {someExcluded && (
              <div className="mt-2 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">Algunos productos no recibieron descuento</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  if (couponStatus === 'invalid') setCouponStatus('idle');
                }}
                placeholder="Ingresa el código"
                className={`flex-1 px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  couponStatus === 'invalid' ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
                }`}
              />
              <button
                onClick={applyCoupon}
                disabled={!couponInput.trim()}
                className="px-4 py-2 bg-[#1E3A8A] text-white text-sm font-semibold rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Aplicar
              </button>
            </div>
            {couponStatus === 'invalid' && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">Cupón inválido</p>
            )}
          </>
        )}
      </div>

      {/* Products summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm">Resumen de productos</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {items.map((item, idx) => (
            <div key={item.sku} className="px-5 py-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                {item.image
                  ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  : <span className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-mono">{item.sku}</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-800 font-medium truncate">{item.name}</p>
                {item.backorder && <span className="mt-0.5 inline-block"><BadgeBajoPedido /></span>}
                <p className="text-xs text-gray-500 mt-0.5">x{item.qty}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {eligibleSkus.has(item.sku) && idx < 2 && (
                  <div className="relative group">
                    <Tag className="w-3.5 h-3.5 text-green-600" />
                    <div className="pointer-events-none absolute bottom-full right-0 mb-1.5 whitespace-nowrap bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      Cupón aplicado
                    </div>
                  </div>
                )}
                <p className="text-xs font-semibold text-gray-800">{fmt(item.price * item.qty)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm CTA — step 4 only */}
      {step === 4 && (
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#1E3A8A] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Confirmar el pedido
        </button>
      )}
    </div>
  );

  // ── Step 1: Address ────────────────────────────────────────────────────────
  const step1 = (
    <>
      <p className="text-sm text-gray-600 mb-4">Selecciona una dirección</p>
      <div className="space-y-3">
        {ADDRESSES.map((addr) => (
          <SelectableCard key={addr.id} selected={selectedAddress === addr.id} onSelect={() => setSelectedAddress(addr.id)}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{addr.label}</p>
                <p className="text-sm text-gray-700 mt-0.5">{addr.street}</p>
                <p className="text-xs text-gray-500">{addr.area}</p>
                <p className="text-xs text-gray-500">{addr.contact}</p>
              </div>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-blue-600 hover:underline shrink-0"
              >
                Editar dirección
              </button>
            </div>
          </SelectableCard>
        ))}
      </div>
      <button className="mt-4 flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Añadir dirección
      </button>
      <StepButtons onBack={() => navigate('/mi-carrito')} onNext={next} />
    </>
  );

  // ── Step 2: Shipping ────────────────────────────────────────────────────────
  const step2 = (
    <>
      <p className="text-sm text-gray-600 mb-4">Verifica el envío</p>
      <div className="space-y-3">
        {SHIPPING_OPTIONS.map((opt) => (
          <SelectableCard key={opt.id} selected={selectedShipping === opt.id} onSelect={() => setSelectedShipping(opt.id)}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800 text-sm">{opt.title}</p>
                    {opt.badge && (
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.time}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold shrink-0 ${opt.cost === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                {opt.cost === 0 ? 'Sin costo de envío' : fmt(opt.cost)}
              </p>
            </div>
          </SelectableCard>
        ))}
      </div>
      <StepButtons onBack={back} onNext={next} />
    </>
  );

  // ── Step 3: Payment ─────────────────────────────────────────────────────────
  const step3 = (
    <>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5 -mx-1">
        {(['cards', 'other'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setPaymentTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              paymentTab === tab
                ? 'border-[#1E3A8A] text-[#1E3A8A]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'cards' ? 'Tarjetas' : 'Otras formas de pago'}
          </button>
        ))}
      </div>

      {paymentTab === 'cards' ? (
        <>
          {/* Card brand logos */}
          <div className="flex items-center gap-2.5 mb-5 flex-wrap">
            {['VISA', 'Mastercard', 'AMEX'].map((brand) => (
              <span key={brand} className="border border-gray-200 rounded-md px-3 py-1.5 text-xs font-bold text-gray-500 tracking-wide">
                {brand}
              </span>
            ))}
          </div>

          {/* Saved cards */}
          <div className="space-y-3">
            {SAVED_CARDS.map((card) => (
              <SelectableCard key={card.id} selected={selectedCard === card.id} onSelect={() => setSelectedCard(card.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-6 rounded ${card.color} flex items-center justify-center`}>
                      <CreditCard className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{card.brand} con terminación {card.last4}</p>
                      <p className="text-xs text-gray-500">{card.type}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setExpandedCard(expandedCard === card.id ? null : card.id); }}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCard === card.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {expandedCard === card.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    Titular: Taller El Rápido S.A. de C.V.
                  </div>
                )}
              </SelectableCard>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Añadir tarjeta
          </button>
        </>
      ) : (
        <div className="space-y-3">
          {OTHER_PAYMENT.map((opt) => (
            <SelectableCard key={opt.id} selected={selectedOther === opt.id} onSelect={() => setSelectedOther(opt.id)}>
              <div className="flex items-center gap-3">
                <opt.Icon className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{opt.title}</p>
                  <p className="text-xs text-gray-500">{opt.desc}</p>
                </div>
              </div>
            </SelectableCard>
          ))}
        </div>
      )}

      <StepButtons onBack={back} onNext={next} />
    </>
  );

  // ── Step 4: Confirmation ────────────────────────────────────────────────────
  const addr = ADDRESSES[selectedAddress];
  const ship = SHIPPING_OPTIONS[selectedShipping];
  const paymentSummary = paymentTab === 'cards'
    ? `${SAVED_CARDS[selectedCard].brand} con terminación ${SAVED_CARDS[selectedCard].last4} · ${SAVED_CARDS[selectedCard].type}`
    : OTHER_PAYMENT[selectedOther].title;

  const step4 = (
    <>
      {/* User info */}
      <div className="flex items-center gap-3 mb-6 px-4 py-3.5 bg-blue-50 rounded-xl border border-blue-100">
        <div className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">Taller El Rápido S.A. de C.V.</p>
          <p className="text-xs text-gray-500">admin@tallererapido.com.mx</p>
        </div>
      </div>

      {/* Confirmation blocks */}
      <div className="space-y-4">

        {[
          {
            title: 'Acerca del pedido',
            goStep: 1 as Step,
            content: (
              <div className="text-sm space-y-1">
                <p className="text-gray-600">Número de pedido: <span className="font-medium text-gray-800">#AUT-2026-00190</span></p>
                <p className="text-gray-600">Fecha de solicitud: <span className="font-medium text-gray-800">
                  {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span></p>
                <p className="text-gray-600 mt-1">Dirección: <span className="font-medium text-gray-800">{addr.street}, {addr.area}</span></p>
              </div>
            ),
          },
          {
            title: 'Método de envío',
            goStep: 2 as Step,
            content: (
              <div className="text-sm">
                <p className="font-medium text-gray-800">{ship.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ship.time} · {ship.cost === 0 ? 'Sin costo de envío' : fmt(ship.cost)}</p>
              </div>
            ),
          },
          {
            title: 'Método de pago',
            goStep: 3 as Step,
            content: (
              <p className="text-sm font-medium text-gray-800">{paymentSummary}</p>
            ),
          },
        ].map(({ title, goStep, content }) => (
          <div key={title} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">{title}</p>
              <button
                onClick={() => goTo(goStep)}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Cambiar
              </button>
            </div>
            <div className="px-5 py-4">{content}</div>
          </div>
        ))}

      </div>

      <StepButtons onBack={back} />
    </>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/mi-carrito" className="hover:text-blue-600 transition-colors">Mi carrito</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">Pago del pedido</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Page heading */}
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Pago del pedido <span className="text-[#1E3A8A]">#AUT-2026-00190</span>
        </h1>

        {/* Stepper */}
        <div className="max-w-2xl mx-auto mb-10">
          <Stepper current={step} />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left — step content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <CardHeader title={STEP_TITLES[step]} />
              <div className="p-6">
                {step === 1 && step1}
                {step === 2 && step2}
                {step === 3 && step3}
                {step === 4 && step4}
              </div>
            </div>
          </div>

          {/* Right — persistent sidebar */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-4">
            {sidebar}
          </div>

        </div>
      </div>

      {/* ── Browser-window modal: coupon info ─────────────────────────────── */}
      {showCouponInfo && (() => {
        const info = appliedCode ? COUPON_INFO[appliedCode] : null;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowCouponInfo(false)}
          >
            <div
              className="w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-gray-300"
              style={{ background: '#DEE1E6' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Chrome tab bar */}
              <div className="flex items-end gap-0 px-3 pt-2.5" style={{ background: '#DEE1E6' }}>
                {/* Tab */}
                <div className="flex items-center gap-2 bg-white rounded-t-lg px-4 py-2 min-w-0 max-w-xs">
                  <Globe className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-xs text-gray-800 font-medium truncate">
                    {info ? info.name : 'Información del cupón'} — AUTEX
                  </span>
                  <button
                    onClick={() => setShowCouponInfo(false)}
                    className="ml-1 shrink-0 rounded-full w-4 h-4 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                {/* Spacer + window controls (right side) */}
                <div className="flex-1" />
                <div className="flex items-center gap-1.5 pb-2 pr-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <button
                    onClick={() => setShowCouponInfo(false)}
                    className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
                    aria-label="Cerrar"
                  />
                </div>
              </div>

              {/* Chrome address bar */}
              <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#F1F3F4', borderTop: '1px solid #C9CDD4' }}>
                <div className="flex-1 bg-white rounded-full px-4 py-1.5 flex items-center gap-2 border border-gray-300 shadow-inner text-xs">
                  <Lock className="w-3 h-3 text-gray-500 shrink-0" />
                  <span className="text-gray-500">
                    autex.com.mx/promociones/{appliedCode.toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="bg-white max-h-[65vh] overflow-y-auto">
                {info ? (
                  <div className="px-10 py-8 max-w-2xl mx-auto">
                    {/* Hero */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                          <Tag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h1 className="text-xl font-bold text-gray-900">{info.name}</h1>
                          <span className="inline-block mt-0.5 text-xs font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-0.5">
                            {appliedCode}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
                    </div>

                    {/* Details grid */}
                    <div className="space-y-5 text-sm">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Vigencia</h3>
                        <p className="text-gray-600">{info.validity}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Productos y categorías participantes</h3>
                        <p className="text-gray-600">{info.products}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Restricciones y condiciones de uso</h3>
                        <p className="text-gray-600">{info.conditions}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-xs text-gray-400">autex.com.mx · Información sujeta a cambios sin previo aviso</p>
                      <button
                        onClick={() => setShowCouponInfo(false)}
                        className="px-5 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-10 py-12 text-center text-sm text-gray-500">
                    No hay información disponible para este cupón.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Success toasts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="flex items-center gap-3 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 min-w-[260px] pointer-events-auto"
          >
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            <span className="text-sm font-medium text-gray-800">{t.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
