import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}
