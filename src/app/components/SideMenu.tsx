import { X } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import autexLogo from 'figma:asset/e51ce0bba30ef75d930ab6ce0dc1930feb09b2f6.png';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { isLoggedIn, userName, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Side menu */}
      <div className={`fixed top-0 left-0 h-full w-full sm:w-80 max-w-sm bg-white shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="bg-[#1E3A8A] text-white p-4 flex items-center justify-between">
          <img src={autexLogo} alt="AUTEX" className="h-8" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User info */}
        {isLoggedIn && (
          <div className="bg-blue-50 p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              {userName.charAt(0)}
            </div>
            <div>
              <div className="text-sm text-gray-500">Hola</div>
              <div className="font-medium">{userName}</div>
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
            Productos
          </div>
          <Link
            to="/catalogo"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            Catálogo
          </Link>
          <Link
            to="/mis-listas"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            Mis listas
          </Link>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-4">
            Especialidades
          </div>
          <button className="block w-full text-left px-4 py-3 hover:bg-gray-100">
            Mostrar más
          </button>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-4">
            Mis Pedidos
          </div>
          <Link
            to="/historial-pedidos"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            Historial de pedidos
          </Link>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-4">
            Empresa
          </div>
          <Link
            to="/quienes-somos"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            ¿Quiénes somos?
          </Link>
          <Link
            to="/sucursales"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            Sucursales
          </Link>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-4">
            Ayuda
          </div>
          <Link
            to="/preguntas-frecuentes"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            Preguntas frecuentes
          </Link>
          <Link
            to="/facturacion"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            Facturación
          </Link>
          <Link
            to="/garantias-devoluciones"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            Garantías y devoluciones
          </Link>
          <Link
            to="/como-comprar"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={onClose}
          >
            ¿Cómo comprar en Autex?
          </Link>

          {isLoggedIn && (
            <>
              <div className="border-t my-2"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}