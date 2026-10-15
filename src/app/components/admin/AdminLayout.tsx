import { Outlet, Link, useLocation, Navigate } from 'react-router';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminHeader } from './AdminHeader';
import { Users, FileText, Image, Settings, Home, Tag, BookOpen } from 'lucide-react';

export function AdminLayout() {
  const { isAdminLoggedIn, hasPermission } = useAdminAuth();
  const location = useLocation();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const menuItems = [
    { path: '/admin/bienvenida', icon: Home, label: 'Bienvenida', module: '' },
    { path: '/admin/usuarios', icon: Users, label: 'Usuarios', module: 'usuarios' },
    // { path: '/admin/landings', icon: FileText, label: 'Landings', module: 'landings' },
    { path: '/admin/banners', icon: Image, label: 'Banners', module: 'banners' },
    { path: '/admin/cupones', icon: Tag, label: 'Cupones', module: 'cupones' },
    { path: '/admin/footer', icon: Settings, label: 'Footer', module: 'footer' },
    { path: '/admin/catalogo-extendido', icon: BookOpen, label: 'Catálogo Extendido', module: 'catalogo' },
  ];

  const visibleMenuItems = menuItems.filter(item =>
    item.module === '' || hasPermission(item.module)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
