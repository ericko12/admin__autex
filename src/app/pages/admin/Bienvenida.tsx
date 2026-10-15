import { useAdminAuth, formatDisplayName } from '../../context/AdminAuthContext';
import { Users, Image, Tag, Settings, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router';

export function Bienvenida() {
  const { adminUser } = useAdminAuth();

  const modulos = [
    {
      icon: Users,
      titulo: 'Usuarios',
      descripcion: 'Gestiona los usuarios del panel de administración',
      link: '/admin/usuarios',
      color: 'bg-blue-500',
      colorLight: 'bg-blue-50',
      colorText: 'text-blue-600',
    },
    {
      icon: Image,
      titulo: 'Banners',
      descripcion: 'Administra los banners por sección y posición',
      link: '/admin/banners',
      color: 'bg-purple-500',
      colorLight: 'bg-purple-50',
      colorText: 'text-purple-600',
    },
    {
      icon: Tag,
      titulo: 'Cupones',
      descripcion: 'Crea y administra cupones de descuento',
      link: '/admin/cupones',
      color: 'bg-green-500',
      colorLight: 'bg-green-50',
      colorText: 'text-green-600',
    },
    {
      icon: Settings,
      titulo: 'Footer',
      descripcion: 'Configura el contenido del pie de página',
      link: '/admin/footer',
      color: 'bg-orange-500',
      colorLight: 'bg-orange-50',
      colorText: 'text-orange-600',
    },
    {
      icon: BookOpen,
      titulo: 'Catálogo Extendido',
      descripcion: 'Gestiona la publicación de productos del catálogo extendido',
      link: '/admin/catalogo-extendido',
      color: 'bg-indigo-500',
      colorLight: 'bg-indigo-50',
      colorText: 'text-indigo-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header de bienvenida */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido al Panel de Administración
        </h1>
        <p className="text-xl text-gray-600">
          Hola, {adminUser ? formatDisplayName(adminUser.name) : ''}
        </p>
      </div>

      {/* Tarjeta de información */}
     {/* <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-12 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Sistema de Gestión AUTEX</h2>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Desde este panel puedes administrar todos los aspectos de la plataforma:
              usuarios, banners promocionales, cupones de descuento y configuración del sitio.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <p className="text-xs text-blue-100">Versión</p>
                <p className="font-semibold">1.0.0</p>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <p className="text-xs text-blue-100">Última actualización</p>
                <p className="font-semibold">Junio 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>*/}

      {/* Módulos principales */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-6">Accesos Rápidos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modulos.map((modulo) => {
            const Icon = modulo.icon;
            return (
              <Link
                key={modulo.link}
                to={modulo.link}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`${modulo.colorLight} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${modulo.colorText}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold">{modulo.titulo}</h4>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-600">{modulo.descripcion}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Información del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Plataforma</p>
            <p className="font-medium">AUTEX E-commerce</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Soporte técnico</p>
            <p className="font-medium">soporte@autex.com.mx</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Documentación</p>
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Ver guía de usuario
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
