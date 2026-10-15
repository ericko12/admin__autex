import { Menu, Search, User, Bell, ShoppingCart, MapPin, Phone, HelpCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import autexLogo from 'figma:asset/88db2cd614f25c1010860e731d4ca247a78d19c2.png';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isLoggedIn, userName, login, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      login();
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#1E3A8A] text-white text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            ENVÍO GRATIS A TODO MÉXICO | COMPRAS MAYORES A $1,500 MXN
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-gray-200">
              <HelpCircle className="w-4 h-4" />
              AYUDA
            </button>

            <button className="flex items-center gap-1 hover:text-gray-200">
              <Phone className="w-4 h-4" />
              33 1602 5603
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Hamburger menu */}
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={autexLogo} alt="AUTEX" className="h-8 md:h-10" />
            </Link>

            {/* Vehicle selector - hidden on mobile */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 17L17 17M7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17M7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17M17 17C17 18.1046 17.8954 19 19 19C20.1046 19 21 18.1046 21 17M17 17C17 15.8954 17.8954 15 19 15C20.1046 15 21 15.8954 21 17M3 17H3.01M21 17H21.01M8 7H16L18 11H6L8 7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm">Mis vehículos</span>
            </button>

            {/* Search bar - simplified on mobile */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="flex gap-2">
                <select className="border rounded-lg px-3 py-2 text-sm bg-gray-50">
                  <option>Todas las especialidades</option>
                  <option>ELÉCTRICOS</option>
                  <option>CARGA Y ARRANQUE</option>
                  <option>FUEL INJECTION</option>
                  <option>HERRAMIENTAS</option>
                  <option>HEAVY DUTY</option>
                  <option>ILUMINACIÓN Y CABLES</option>
                  <option>MOTOPARTES</option>
                  <option>RETAIL</option>
                  <option>SUSPENSIÓN Y SISTEMA DE FRENOS</option>
                  <option>SAFETY</option>
                </select>
                <div className="flex-1 flex items-center border rounded-lg px-3 py-2">
                  <input
                    type="text"
                    placeholder="Buscar año, marca, modelo, tipo de producto..."
                    className="flex-1 outline-none text-sm"
                  />
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Mobile search icon */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5" />
            </button>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-1 text-sm hover:text-blue-600">
                <MapPin className="w-5 h-5" />
                <span>Sucursales</span>
              </button>

              <div className="relative">
                <button
                  onClick={handleAuthClick}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <User className="w-5 h-5" />
                  <div className="hidden md:block text-left">
                    <div className="text-xs text-gray-500">Hola</div>
                    <div className="text-sm font-medium">
                      {isLoggedIn ? userName : 'Iniciar sesión'}
                    </div>
                  </div>
                </button>

                {/* User dropdown menu */}
                {isLoggedIn && showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mi perfil
                    </Link>
                    <Link
                      to="/mis-pedidos"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mis pedidos
                    </Link>
                    <div className="border-t my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-500"
                    >
                      Salir
                    </button>
                  </div>
                )}
              </div>

              <button className="relative hover:text-blue-600">
                <Bell className="w-5 h-5" />
              </button>

              <button
                onClick={openCart}
                aria-label="Abrir carrito"
                className="relative hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation tabs - scrollable on mobile */}
        <nav className="border-t overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 py-3 min-w-max md:min-w-0">
              <Link
                to="/"
                className={`text-sm font-medium pb-3 whitespace-nowrap border-b-2 transition-all ${
                  location.pathname === '/'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/catalogo"
                className={`text-sm font-medium pb-3 whitespace-nowrap border-b-2 transition-all ${
                  location.pathname === '/catalogo'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                Catálogo
              </Link>
              <Link
                to="/marcas"
                className={`text-sm font-medium pb-3 whitespace-nowrap border-b-2 transition-all ${
                  location.pathname === '/marcas'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                Marcas
              </Link>
              <Link
                to="/promociones"
                className={`text-sm font-medium pb-3 whitespace-nowrap border-b-2 transition-all ${
                  location.pathname === '/promociones'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                Promociones
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}