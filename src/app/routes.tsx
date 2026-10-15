import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { TermsConditions } from './pages/TermsConditions';
import { HowToBuy } from './pages/HowToBuy';
import { CreditoTaller } from './pages/CreditoTaller';
import { Promociones } from './pages/Promociones';
import { PromocionDetalle } from './pages/PromocionDetalle';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { Bienvenida } from './pages/admin/Bienvenida';
import { Usuarios } from './pages/admin/Usuarios';
import { Landings } from './pages/admin/Landings';
import { Banners } from './pages/admin/Banners';
import { FooterConfig } from './pages/admin/FooterConfig';
import { Cupones } from './pages/admin/Cupones';
import { CatalogoExtendido } from './pages/admin/CatalogoExtendido';
import { Categorias } from './pages/Categorias';
import { Marcas } from './pages/Marcas';
import { RastreoPedido } from './pages/RastreoPedido';
import { MisPedidos } from './pages/MisPedidos';
import { DetallePedido } from './pages/DetallePedido';
import { MiCarrito } from './pages/MiCarrito';
import { Checkout } from './pages/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'busqueda/:category',
        element: <SearchResults />,
      },
      {
        path: 'marca/:brand',
        element: <SearchResults />,
      },
      {
        path: 'catalogo',
        element: <Categorias />,
      },
      {
        path: 'marcas',
        element: <Marcas />,
      },
      {
        path: 'promociones',
        element: <Promociones />,
      },
      {
        path: 'promocion/:id',
        element: <PromocionDetalle />,
      },
      {
        path: 'terminos-condiciones',
        element: <TermsConditions />,
      },
      {
        path: 'avisos-privacidad',
        element: <TermsConditions />,
      },
      {
        path: 'garantias-devoluciones',
        element: <TermsConditions />,
      },
      {
        path: 'preguntas-frecuentes',
        element: <HowToBuy />,
      },
      {
        path: 'como-comprar',
        element: <HowToBuy />,
      },
      {
        path: 'credito-taller',
        element: <CreditoTaller />,
      },
      {
        path: 'mi-carrito',
        element: <MiCarrito />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'rastreo-pedido',
        element: <RastreoPedido />,
      },
      {
        path: 'mis-pedidos',
        element: <MisPedidos />,
      },
      {
        path: 'pedido/:id',
        element: <DetallePedido />,
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: 'bienvenida',
            element: <Bienvenida />,
          },
          {
            path: 'dashboard',
            element: <Navigate to="/admin/bienvenida" replace />,
          },
          {
            path: 'usuarios',
            element: <Usuarios />,
          },
          {
            path: 'landings',
            element: <Landings />,
          },
          {
            path: 'banners',
            element: <Banners />,
          },
          {
            path: 'footer',
            element: <FooterConfig />,
          },
          {
            path: 'cupones',
            element: <Cupones />,
          },
          {
            path: 'catalogo-extendido',
            element: <CatalogoExtendido />,
          },
        ],
      },
    ],
  },
]);