import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { FooterProvider } from './context/FooterContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <FooterProvider>
            <RouterProvider router={router} />
          </FooterProvider>
        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}
