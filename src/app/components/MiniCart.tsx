import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { BadgeBajoPedido } from './BadgeBajoPedido';
import miniCartIcon from '../../imports/Autex_Mini_carrito.svg';

function fmt(n: number) {
  return `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
}

function MiniItem({ item, onRemove, onQty }: { item: CartItem; onRemove: () => void; onQty: (q: number) => void }) {
  return (
    <li className={`flex gap-3 py-3 border-b last:border-0 ${item.backorder ? 'bg-orange-50/50 -mx-1 px-1 rounded-lg' : ''}`}>
      <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
        {item.image
          ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
          : <span className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-mono">{item.sku.split('-')[0]}</span>
        }
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 font-mono">SKU #{item.sku}</p>
            <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">{item.name}</p>
            {item.backorder && <span className="mt-1.5 block"><BadgeBajoPedido /></span>}
          </div>
          <button
            onClick={onRemove}
            aria-label={`Eliminar ${item.name}`}
            className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-lg overflow-hidden bg-white">
            <button onClick={() => onQty(item.qty - 1)} aria-label="Disminuir" className="px-2 py-1 hover:bg-gray-100 transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 text-sm font-medium min-w-[28px] text-center">{item.qty}</span>
            <button onClick={() => onQty(item.qty + 1)} aria-label="Aumentar" className="px-2 py-1 hover:bg-gray-100 transition-colors">
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm font-semibold text-gray-800">{fmt(item.price * item.qty)}</p>
        </div>
      </div>
    </li>
  );
}

export function MiniCart() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, totalItems } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  const available = items.filter((i) => !i.backorder);
  const backorder = items.filter((i) => i.backorder);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" aria-hidden="true" onClick={closeCart} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mini carrito"
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <img src={miniCartIcon} alt="" className="w-6 h-6" />
            <h2 className="font-semibold text-gray-800">Mi carrito</h2>
            {totalItems > 0 && (
              <span className="bg-[#1E3A8A] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} aria-label="Cerrar carrito" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
              <h3 className="font-semibold text-gray-700 mb-1">Tu carrito está vacío</h3>
              <p className="text-sm text-gray-400 mb-6">Agrega productos para comenzar tu compra.</p>
              <Link to="/catalogo" onClick={closeCart} className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                Explorar productos
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Disponibles */}
              {available.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <h3 className="text-sm font-semibold text-green-600">
                      Productos disponibles <span className="font-normal text-green-500">({available.reduce((s, i) => s + i.qty, 0)})</span>
                    </h3>
                  </div>
                  <ul>
                    {available.map((item) => (
                      <MiniItem key={item.sku} item={item} onRemove={() => removeItem(item.sku)} onQty={(q) => updateQty(item.sku, q)} />
                    ))}
                  </ul>
                </div>
              )}

              {/* Bajo pedido */}
              {backorder.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="16" viewBox="0 0 12 14" fill="none" className="shrink-0" aria-hidden="true">
                      <path d="M1 1h10M1 13h10M2 1v2.5C2 6 6 7 6 7S2 8 2 10.5V13M10 1v2.5C10 6 6 7 6 7s4 1 4 3.5V13" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="text-sm font-semibold text-orange-500">
                      Productos bajo pedido <span className="font-normal">({backorder.reduce((s, i) => s + i.qty, 0)})</span>
                    </h3>
                  </div>
                  <ul>
                    {backorder.map((item) => (
                      <MiniItem key={item.sku} item={item} onRemove={() => removeItem(item.sku)} onQty={(q) => updateQty(item.sku, q)} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-5 py-4 space-y-3 bg-gray-50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-800">{fmt(subtotal)}</span>
            </div>
            <Link
              to="/mi-carrito"
              onClick={closeCart}
              className="block w-full bg-[#1E3A8A] text-white py-3 rounded-xl text-sm font-semibold text-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
