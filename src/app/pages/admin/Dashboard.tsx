import { useAdminAuth } from '../../context/AdminAuthContext';
import { Users, FileText, Image, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const { adminUser } = useAdminAuth();

  const stats = [
    { icon: Users, label: 'Usuarios activos', value: '12', color: 'bg-blue-500' },
    { icon: FileText, label: 'Landings publicadas', value: '8', color: 'bg-green-500' },
    { icon: Image, label: 'Banners activos', value: '15', color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Visitas este mes', value: '24.5K', color: 'bg-orange-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Bienvenido, {adminUser?.name} ({adminUser?.role})
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Actividad reciente</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Nueva landing creada</p>
              <p className="text-xs text-gray-500">Promoción de Primavera • Hace 2 horas</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Image className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Banner actualizado</p>
              <p className="text-xs text-gray-500">Banner Principal Home • Hace 5 horas</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Nuevo usuario registrado</p>
              <p className="text-xs text-gray-500">Marketing Team • Hace 1 día</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
