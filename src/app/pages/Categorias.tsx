import { useState } from 'react';
import { Link } from 'react-router';

type Family = { id: string; name: string; icon: string };
type Category = { id: string; name: string; families: Family[] };

const categories: Category[] = [
  {
    id: 'carga-arranque',
    name: 'Carga y Arranque',
    families: [
      { id: 'baterias', name: 'Baterías', icon: '🔋' },
      { id: 'alternadores', name: 'Alternadores', icon: '⚙️' },
      { id: 'motores-arranque', name: 'Motores de Arranque', icon: '🔩' },
      { id: 'reguladores', name: 'Reguladores de Voltaje', icon: '📟' },
      { id: 'cables-bateria', name: 'Cables de Batería', icon: '🔌' },
      { id: 'porta-fusibles', name: 'Porta Fusibles', icon: '🧩' },
      { id: 'rectificadores', name: 'Rectificadores', icon: '🔧' },
      { id: 'bobinas-carga', name: 'Bobinas de Carga', icon: '🌀' },
      { id: 'diodos', name: 'Diodos', icon: '💡' },
      { id: 'escobillas', name: 'Escobillas', icon: '🪝' },
    ],
  },
  {
    id: 'electricos',
    name: 'Eléctrico',
    families: [
      { id: 'bobinas-encendido', name: 'Bobinas de Encendido', icon: '⚡' },
      { id: 'sensores', name: 'Sensores', icon: '📡' },
      { id: 'interruptores', name: 'Interruptores', icon: '🔘' },
      { id: 'relevadores', name: 'Relevadores', icon: '🔲' },
      { id: 'fusibles', name: 'Fusibles', icon: '🔴' },
      { id: 'cables-bujias', name: 'Cables de Bujías', icon: '🔌' },
      { id: 'bujias', name: 'Bujías', icon: '🔥' },
      { id: 'modulos-encendido', name: 'Módulos de Encendido', icon: '📦' },
      { id: 'distribuidor', name: 'Distribuidor', icon: '🔄' },
      { id: 'motores-electricos', name: 'Motores Eléctricos', icon: '⚙️' },
    ],
  },
  {
    id: 'fuel-injection',
    name: 'Fuel Injection',
    families: [
      { id: 'inyectores', name: 'Inyectores', icon: '💉' },
      { id: 'bombas-gasolina', name: 'Bombas de Gasolina', icon: '⛽' },
      { id: 'reguladores-presion', name: 'Reguladores de Presión', icon: '🎛️' },
      { id: 'cuerpos-aceleracion', name: 'Cuerpos de Aceleración', icon: '🔧' },
      { id: 'filtros-gasolina', name: 'Filtros de Gasolina', icon: '🔲' },
      { id: 'sensores-oxigeno', name: 'Sensores de Oxígeno', icon: '📡' },
      { id: 'rail-combustible', name: 'Rail de Combustible', icon: '🔩' },
      { id: 'valvulas-egr', name: 'Válvulas EGR', icon: '🔄' },
      { id: 'maf', name: 'Sensores MAF/MAP', icon: '🌬️' },
      { id: 'modulos-ecu', name: 'Módulos ECU', icon: '💻' },
    ],
  },
  {
    id: 'iluminacion-cables',
    name: 'Iluminación y Cable',
    families: [
      { id: 'faros-delanteros', name: 'Faros Delanteros', icon: '💡' },
      { id: 'calaveras', name: 'Calaveras', icon: '🔴' },
      { id: 'luces-niebla', name: 'Luces de Niebla', icon: '🌫️' },
      { id: 'leds', name: 'LEDs Automotrices', icon: '✨' },
      { id: 'arneses', name: 'Arneses Eléctricos', icon: '🔌' },
      { id: 'focos', name: 'Focos', icon: '💡' },
      { id: 'luces-internas', name: 'Luces Internas', icon: '🏠' },
      { id: 'intermitentes', name: 'Intermitentes', icon: '🟡' },
      { id: 'tercera-luz', name: 'Tercera Luz de Freno', icon: '🛑' },
      { id: 'cables-tierra', name: 'Cables de Tierra', icon: '⚡' },
    ],
  },
  {
    id: 'herramientas',
    name: 'Herramientas',
    families: [
      { id: 'llaves', name: 'Llaves y Dados', icon: '🔑' },
      { id: 'destornilladores', name: 'Destornilladores', icon: '🪛' },
      { id: 'pinzas', name: 'Pinzas', icon: '🔧' },
      { id: 'gatos', name: 'Gatos Hidráulicos', icon: '⬆️' },
      { id: 'torquimetros', name: 'Torquímetros', icon: '📏' },
      { id: 'extractores', name: 'Extractores', icon: '🔩' },
      { id: 'estetoscopios', name: 'Estetoscopios Automotrices', icon: '👂' },
      { id: 'multimetros', name: 'Multímetros', icon: '📟' },
      { id: 'compresores', name: 'Compresores', icon: '💨' },
      { id: 'scanner', name: 'Escáneres OBD', icon: '📲' },
    ],
  },
  {
    id: 'motopartes',
    name: 'Motopartes',
    families: [
      { id: 'cadenas-moto', name: 'Cadenas', icon: '⛓️' },
      { id: 'pastillas-moto', name: 'Pastillas de Freno', icon: '🛑' },
      { id: 'filtros-moto', name: 'Filtros de Aire', icon: '🌬️' },
      { id: 'bujias-moto', name: 'Bujías de Moto', icon: '🔥' },
      { id: 'aceites-moto', name: 'Aceites de Motor', icon: '🛢️' },
      { id: 'llantas-moto', name: 'Llantas', icon: '⭕' },
      { id: 'carburadores', name: 'Carburadores', icon: '🔩' },
      { id: 'clutch-moto', name: 'Kit de Clutch', icon: '🔘' },
      { id: 'amortiguadores-moto', name: 'Amortiguadores', icon: '🔧' },
      { id: 'luces-moto', name: 'Luces de Moto', icon: '💡' },
    ],
  },
  {
    id: 'heavy-duty',
    name: 'Heavy Duty',
    families: [
      { id: 'frenos-hd', name: 'Balatas y Tambores', icon: '🛑' },
      { id: 'clutch-hd', name: 'Discos de Clutch', icon: '🔘' },
      { id: 'suspension-hd', name: 'Suspensión', icon: '🔩' },
      { id: 'turbo-hd', name: 'Turbos y Componentes', icon: '🌪️' },
      { id: 'filtros-hd', name: 'Filtros (aire/aceite/combustible)', icon: '🔲' },
      { id: 'correas-hd', name: 'Correas y Fajas', icon: '🔄' },
      { id: 'radiadores-hd', name: 'Radiadores', icon: '🌡️' },
      { id: 'bombas-agua-hd', name: 'Bombas de Agua', icon: '💧' },
      { id: 'diferenciales-hd', name: 'Diferenciales', icon: '⚙️' },
      { id: 'ejes-hd', name: 'Ejes y Flechas', icon: '📏' },
    ],
  },
];

export function Categorias() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todas');

  const filtered = categories.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.families.some((f) => f.name.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = activeFilter === 'Todas' || c.name === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const hasAnyResult = filtered.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Inicio</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Categorías</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1E3A8A] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3">Categorías</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Encuentra las refacciones que necesitas organizadas por tipo de componente.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar categoría o familia"
          className="w-full md:w-96 border border-gray-300 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 bg-white shadow-sm"
        />

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('Todas')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'Todas'
                ? 'bg-[#1E3A8A] text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveFilter(c.name)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === c.name
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Categories + Families */}
        {hasAnyResult ? (
          <div className="space-y-14 pb-16">
            {filtered.map((cat) => {
              const visibleFamilies = search
                ? cat.families.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
                : cat.families;

              if (visibleFamilies.length === 0) return null;

              return (
                <section key={cat.id}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">{cat.name}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {visibleFamilies.map((family) => (
                      <Link
                        key={family.id}
                        to={`/busqueda/${cat.id}`}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col items-center p-5 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-3xl group-hover:bg-blue-100 transition-colors">
                          {family.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors leading-snug">
                          {family.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl text-gray-300">
              🔍
            </div>
            <p className="text-gray-500 text-lg">No se encontraron categorías.</p>
            <p className="text-gray-400 text-sm mt-1">Intenta con otro término o filtro.</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl font-semibold mb-3">¿No encuentras la categoría que buscas?</h2>
          <p className="text-gray-500 mb-6">Nuestros asesores están listos para ayudarte a encontrar la refacción correcta.</p>
          <a
            href="https://wa.me/523332084440"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1E3A8A] text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Contactar asesor
          </a>
        </div>
      </div>
    </div>
  );
}
