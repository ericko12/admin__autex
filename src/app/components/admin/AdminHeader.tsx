import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAdminAuth, formatDisplayName } from '../../context/AdminAuthContext';
import { useNavigate } from 'react-router';
import autexLogo from 'figma:asset/88db2cd614f25c1010860e731d4ca247a78d19c2.png';

const ROLE_LABELS: Record<string, string> = {
  administrador: 'Administrador',
  marketing: 'Personalizado',
  visualizador: 'Visualizador',
};

export function AdminHeader() {
  const { adminUser, logout } = useAdminAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={autexLogo} alt="AUTEX" className="h-10" />

        </div>

        {/* User menu */}
        {adminUser && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium">{formatDisplayName(adminUser.name)}</div>
                <div className="text-xs text-gray-500">{ROLE_LABELS[adminUser.role] ?? adminUser.role}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                <div className="px-4 py-3 border-b">
                  <div className="text-sm font-medium">{formatDisplayName(adminUser.name)}</div>
                  <div className="text-xs text-gray-500">{adminUser.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
