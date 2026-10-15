import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import productImg1 from '../../imports/image-9.png';
import productImg2 from '../../imports/image-10.png';
import productImg3 from '../../imports/image-11.png';
import productImg4 from '../../imports/image-12.png';

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  backorder?: boolean;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (sku: string) => void;
  updateQty: (sku: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { sku: 'FIL-001', name: 'Filtro de aceite BOSCH Premium', price: 189, qty: 2, image: productImg3, backorder: false },
    { sku: 'FRE-044', name: 'Pastillas de freno Brembo Sport', price: 420, qty: 1, image: productImg2, backorder: false },
    { sku: 'ELE-209', name: 'Bujías NGK Iridium x4', price: 310, qty: 1, image: productImg4, backorder: true },
    { sku: 'SUS-312', name: 'Amortiguador trasero Monroe OESpectrum', price: 580, qty: 1, image: productImg1, backorder: true },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === item.sku);
      if (existing) {
        return prev.map((i) => i.sku === item.sku ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }, []);

  const updateQty = useCallback((sku: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => i.sku === sku ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
