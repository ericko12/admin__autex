import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Filter, Grid, List, X, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import productImg0 from '../../imports/image-8.png';
import productImg1 from '../../imports/image-9.png';
import productImg2 from '../../imports/image-10.png';
import productImg3 from '../../imports/image-11.png';
import productImg4 from '../../imports/image-12.png';

const productImages = [productImg0, productImg1, productImg2, productImg3, productImg4];

// ── Tipos ────────────────────────────────────────────────────────────────────
type Disponibilidad = 'disponible' | 'no_disponible' | 'bajo_pedido';

interface Sucursal {
  id: string;
  nombre: string;
  ciudad: string;
  estado: string;
  cantidad: number;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  sku: string;
  disponibilidad: Disponibilidad;
  stockTotal: number;
  sucursales: Sucursal[];
}

// ── Mock sucursales nacionales ───────────────────────────────────────────────
const sucursalesNacionales: Omit<Sucursal, 'cantidad'>[] = [
  { id: 's01', nombre: 'AUTEX Insurgentes', ciudad: 'Ciudad de México', estado: 'CDMX' },
  { id: 's02', nombre: 'AUTEX Vallejo', ciudad: 'Ciudad de México', estado: 'CDMX' },
  { id: 's03', nombre: 'AUTEX Ecatepec', ciudad: 'Ecatepec', estado: 'Estado de México' },
  { id: 's04', nombre: 'AUTEX Toluca', ciudad: 'Toluca', estado: 'Estado de México' },
  { id: 's05', nombre: 'AUTEX Monterrey Centro', ciudad: 'Monterrey', estado: 'Nuevo León' },
  { id: 's06', nombre: 'AUTEX San Nicolás', ciudad: 'San Nicolás de los Garza', estado: 'Nuevo León' },
  { id: 's07', nombre: 'AUTEX Guadalajara', ciudad: 'Guadalajara', estado: 'Jalisco' },
  { id: 's08', nombre: 'AUTEX Zapopan', ciudad: 'Zapopan', estado: 'Jalisco' },
  { id: 's09', nombre: 'AUTEX Puebla', ciudad: 'Puebla', estado: 'Puebla' },
  { id: 's10', nombre: 'AUTEX Querétaro', ciudad: 'Querétaro', estado: 'Querétaro' },
  { id: 's11', nombre: 'AUTEX León', ciudad: 'León', estado: 'Guanajuato' },
  { id: 's12', nombre: 'AUTEX Tijuana', ciudad: 'Tijuana', estado: 'Baja California' },
  { id: 's13', nombre: 'AUTEX Chihuahua', ciudad: 'Chihuahua', estado: 'Chihuahua' },
  { id: 's14', nombre: 'AUTEX Hermosillo', ciudad: 'Hermosillo', estado: 'Sonora' },
  { id: 's15', nombre: 'AUTEX Veracruz', ciudad: 'Veracruz', estado: 'Veracruz' },
  { id: 's16', nombre: 'AUTEX Mérida', ciudad: 'Mérida', estado: 'Yucatán' },
  { id: 's17', nombre: 'AUTEX Cancún', ciudad: 'Cancún', estado: 'Quintana Roo' },
  { id: 's18', nombre: 'AUTEX Saltillo', ciudad: 'Saltillo', estado: 'Coahuila' },
  { id: 's19', nombre: 'AUTEX Aguascalientes', ciudad: 'Aguascalientes', estado: 'Aguascalientes' },
  { id: 's20', nombre: 'AUTEX San Luis Potosí', ciudad: 'San Luis Potosí', estado: 'San Luis Potosí' },
];

function generarSucursales(disponibilidad: Disponibilidad): Sucursal[] {
  if (disponibilidad === 'no_disponible') return sucursalesNacionales.map(s => ({ ...s, cantidad: 0 }));
  return sucursalesNacionales.map(s => {
    const tieneStock = disponibilidad === 'bajo_pedido' ? Math.random() > 0.7 : Math.random() > 0.3;
    return { ...s, cantidad: tieneStock ? Math.floor(Math.random() * 12) + 1 : 0 };
  });
}

// ── Datos mock de productos ───────────────────────────────────────────────────
const fuelInjectionProducts = [
  'Bomba de Gasolina Eléctrica', 'Inyector de Combustible', 'Bobina de Encendido',
  'Sensor de Oxígeno', 'Filtro de Combustible', 'Regulador de Presión',
  'Sensor MAP', 'Sensor TPS', 'Válvula IAC', 'Módulo de Encendido',
  'Cuerpo de Aceleración', 'Sensor de Temperatura', 'Bomba de Alta Presión',
  'Kit de Inyectores', 'Bujía de Encendido', 'Cable de Bujías',
  'Sensor CKP', 'Sensor CMP', 'Válvula EGR', 'Bomba de Combustible Mecánica',
];

const brands = ['BOSCH', 'DENSO', 'ACOSA', 'DELPHI', 'TECNOFUEL', 'STANDARD', 'NGK'];

function pickDisponibilidad(i: number): Disponibilidad {
  // Distribución: ~60% disponible, ~25% no disponible, ~15% bajo pedido
  const v = i % 10;
  if (v < 6) return 'disponible';
  if (v < 8) return 'no_disponible';
  return 'bajo_pedido';
}

function generateProducts(category: string, count: number = 20): Product[] {
  return Array.from({ length: count }, (_, i) => {
    const disp = pickDisponibilidad(i);
    const sucursales = generarSucursales(disp);
    const stockTotal = sucursales.reduce((a, s) => a + s.cantidad, 0);
    return {
      id: `${category}-${i + 1}`,
      name: category === 'fuel-injection'
        ? fuelInjectionProducts[i % fuelInjectionProducts.length]
        : `Producto ${category} ${i + 1}`,
      brand: brands[i % brands.length],
      price: Math.floor(Math.random() * 2500) + 450,
      oldPrice: Math.random() > 0.4 ? Math.floor(Math.random() * 3500) + 1200 : undefined,
      image: '',
      sku: `SKU #${String(512000 + i * 100).padStart(7, '0')}`,
      disponibilidad: disp,
      stockTotal,
      sucursales,
    };
  });
}

// ── Componente Modal Sucursales ───────────────────────────────────────────────
interface SucursalesModalProps {
  product: Product;
  onClose: () => void;
}

function SucursalesModal({ product, onClose }: SucursalesModalProps) {
  const [search, setSearch] = useState('');
  const sucursalesConStock = product.sucursales.filter(s => s.cantidad > 0);
  const filtered = useMemo(
    () => product.sucursales.filter(s =>
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.ciudad.toLowerCase().includes(search.toLowerCase()) ||
      s.estado.toLowerCase().includes(search.toLowerCase())
    ),
    [product.sucursales, search]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b">
          <div>
            <h3 className="font-bold text-gray-900">Disponibilidad por sucursal</h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.name}</p>
            <p className="text-xs text-blue-600 font-mono mt-0.5">{product.sku}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumen */}
        <div className="px-5 py-3 bg-blue-50 border-b flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-blue-800">
            <strong>{sucursalesConStock.length}</strong> de {product.sucursales.length} sucursales tienen stock —
            <strong className="ml-1">{product.stockTotal} unidades</strong> en total
          </span>
        </div>

        {/* Búsqueda */}
        <div className="px-5 py-3 border-b">
          <input
            type="text"
            placeholder="Buscar sucursal o ciudad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lista */}
        <div className="overflow-y-auto flex-1 divide-y">
          {filtered.map(s => (
            <div key={s.id} className={`flex items-center justify-between px-5 py-3 ${s.cantidad > 0 ? '' : 'opacity-40'}`}>
              <div>
                <p className="text-sm font-medium text-gray-800">{s.nombre}</p>
                <p className="text-xs text-gray-500">{s.ciudad}, {s.estado}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                {s.cantidad > 0 ? (
                  <span className="text-sm font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                    {s.cantidad} pza{s.cantidad !== 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">Sin stock</span>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-10 text-center text-gray-400 text-sm">Sin resultados</div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} className="w-full py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Componente ProductCard ────────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  isLoggedIn: boolean;
}

function ProductCard({ product, isLoggedIn }: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const [showSucursales, setShowSucursales] = useState(false);

  const statusConfig = {
    disponible: {
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      label: 'Disponible',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    no_disponible: {
      icon: <XCircle className="w-3.5 h-3.5" />,
      label: 'No disponible',
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    bajo_pedido: {
      icon: <Clock className="w-3.5 h-3.5" />,
      label: 'Disponible bajo pedido',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  };

  const status = statusConfig[product.disponibilidad];
  const isBajoPedido = product.disponibilidad === 'bajo_pedido';
  const isDisponible = product.disponibilidad === 'disponible';

  return (
    <>
      <div className="bg-white rounded-lg hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
        {/* Imagen */}
        <div className="relative aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
          <img
            src={productImages.slice(1)[parseInt(product.id.split('-').pop() || '0') % (productImages.length - 1)]}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
          {/* Chip "Bajo pedido" — esquina superior izquierda */}
          {isBajoPedido && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
              <Clock className="w-3 h-3" />
              Bajo pedido
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col flex-1">
          {/* SKU + Marca */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-400 font-mono">{product.sku}</span>
            <span className="text-[10px] font-bold text-gray-500">{product.brand}</span>
          </div>

          {/* Nombre */}
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 flex-1">
            {product.name}
          </h3>

          {/* Precio */}
          <div className="mb-2">
            {product.oldPrice && (
              <div className="text-xs text-gray-400 line-through">
                ${product.oldPrice.toLocaleString('es-MX')}
              </div>
            )}
            <div className="text-lg font-bold text-blue-600">
              ${product.price.toLocaleString('es-MX')}
              <span className="text-xs font-normal text-gray-400 ml-1">MXN</span>
            </div>
          </div>

          {/* ── Estado de disponibilidad ────────────────────────────────── */}
          <div className="mb-3">
            <div className="relative group inline-flex">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                {status.icon}
                <span>{status.label}</span>
                {/* Cantidad: solo logueado + disponible (nunca en bajo pedido) */}
                {isLoggedIn && product.disponibilidad === 'disponible' && (
                  <button
                    onClick={() => setShowSucursales(true)}
                    className="ml-1 flex items-center gap-0.5 bg-white border border-current rounded-full px-1.5 py-0.5 text-[10px] font-bold hover:opacity-75 transition-opacity"
                    title="Ver disponibilidad por sucursal"
                  >
                    {product.stockTotal} pzs
                  </button>
                )}
              </div>
              {/* Tooltip para usuarios no logueados */}
              {!isLoggedIn && product.disponibilidad !== 'no_disponible' && (
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg bg-gray-900 px-3 py-2 text-[11px] leading-snug text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[9999] whitespace-normal">
                  Regístrate para ver disponibilidad exacta y sucursales cercanas
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              )}
            </div>

            {/* Leyenda entrega bajo pedido */}
            {isBajoPedido && (
              <p className="text-[11px] text-amber-700 mt-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                Entrega estimada de 2 – 4 días hábiles
              </p>
            )}
          </div>

          {/* Acciones */}
          {isDisponible || isBajoPedido ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="border rounded w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="border rounded w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors font-medium">
                Añadir al carrito
              </button>
            </div>
          ) : (
            <button className="w-full border border-orange-400 text-orange-500 py-2 rounded text-sm hover:bg-orange-50 transition-colors font-medium">
              Avisar disponibilidad
            </button>
          )}
        </div>
      </div>

      {/* Modal de sucursales */}
      {showSucursales && (
        <SucursalesModal product={product} onClose={() => setShowSucursales(false)} />
      )}
    </>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export function SearchResults() {
  const { category, brand } = useParams();
  const { isLoggedIn } = useAuth();
  const products = useMemo(
    () => generateProducts(category || brand || 'general', 20),
    [category, brand]
  );

  const getCategoryTitle = (cat: string) => {
    if (cat === 'fuel-injection') return 'FUEL INJECTION — Sistema de Combustible';
    return cat.replace(/-/g, ' ').toUpperCase();
  };

  const title = category
    ? getCategoryTitle(category)
    : brand
    ? `Productos ${brand.toUpperCase()}`
    : 'Resultados de búsqueda';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">← Volver</a>
            <span>|</span>
            <span className="text-blue-600">{title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-6">{title}</h1>

        <div className="flex gap-8">
          {/* Sidebar filtros */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Especialidad</h3>
                  <span className="text-gray-400 text-xs">▼</span>
                </div>
                <div className="space-y-2">
                  {['Automotriz', 'Ferretería', 'Herramientas y Equipos', 'Motocicletas', 'Suspensión, dirección y frenos'].map(item => (
                    <label key={item} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {[{ label: 'VEHÍCULO' }, { label: 'Categoría' }, { label: 'Familias' }].map(f => (
                <div key={f.label} className="border-t pt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{f.label}</h3>
                    <span className="text-gray-400 text-xs">▼</span>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mb-6">
                <h3 className="font-semibold mb-4">Precio</h3>
                <div className="flex gap-2 items-center">
                  <input type="number" placeholder="$0" className="w-full border rounded px-3 py-2 text-sm" />
                  <span>-</span>
                  <input type="number" placeholder="$9,999" className="w-full border rounded px-3 py-2 text-sm" />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Marcas</h3>
                <div className="space-y-2">
                  {['Autolite', 'Bosch', 'Beru', 'Denso', 'Federal'].map(marca => (
                    <label key={marca} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{marca}</span>
                    </label>
                  ))}
                </div>
                <button className="mt-4 text-white bg-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-700">
                  Limpiar filtros
                </button>
              </div>
            </div>
          </aside>

          {/* Grid productos */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Mostrando {products.length} productos</span>
                <button className="md:hidden flex items-center gap-2 text-sm text-blue-600">
                  <Filter className="w-4 h-4" /> Filtros
                </button>
              </div>
              <div className="flex items-center gap-4">
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Relevancia</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                  <option>Más vendidos</option>
                </select>
                <div className="hidden md:flex gap-2">
                  <button className="p-2 border rounded hover:bg-gray-50"><Grid className="w-5 h-5" /></button>
                  <button className="p-2 border rounded hover:bg-gray-50"><List className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} isLoggedIn={isLoggedIn} />
              ))}
            </div>

            {/* Paginación */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 border rounded hover:bg-gray-50">Anterior</button>
                {[1, 2, 3, 4, 5].map(page => (
                  <button key={page} className={`w-10 h-10 rounded ${page === 1 ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'}`}>
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border rounded hover:bg-gray-50">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

