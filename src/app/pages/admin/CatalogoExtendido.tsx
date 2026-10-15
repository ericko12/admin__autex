import { useState, useMemo, useCallback } from 'react';
import { Search, Filter, BookOpen, ChevronDown, X, Clock } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AutopartIcon } from '../../components/admin/AutopartIcon';

interface Producto {
  sku: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  activo: boolean;
}

interface BitacoraEntry {
  id: string;
  sku: string;
  nombreProducto: string;
  estadoAnterior: boolean;
  estadoNuevo: boolean;
  usuario: string;
  timestamp: Date;
}

const mockProductos: Producto[] = [
  { sku: 'FIL-001', nombre: 'Filtro de Aceite Premium', descripcion: 'Filtro de aceite de alta eficiencia compatible con motores 1.6L a 2.4L. Marca Bosch.', categoria: 'Filtros', activo: true },
  { sku: 'FRE-045', nombre: 'Balata Delantera Cerámicas', descripcion: 'Juego de balatas delanteras cerámicas de alto rendimiento. Par delantero.', categoria: 'Frenos', activo: true },
  { sku: 'SUS-112', nombre: 'Amortiguador Trasero Gas', descripcion: 'Amortiguador trasero con tecnología de gas nitrógeno para mayor estabilidad.', categoria: 'Suspensión', activo: false },
  { sku: 'ELE-230', nombre: 'Batería 12V 70Ah AGM', descripcion: 'Batería de alta descarga AGM libre de mantenimiento. Garantía 18 meses.', categoria: 'Eléctrico', activo: true },
  { sku: 'MOT-088', nombre: 'Bujía Iridium Denso', descripcion: 'Bujía de encendido iridium para mayor duración y eficiencia de combustión.', categoria: 'Motor', activo: true },
  { sku: 'FIL-002', nombre: 'Filtro de Aire K&N', descripcion: 'Filtro de aire de alto flujo lavable y reutilizable. Aumenta potencia del motor.', categoria: 'Filtros', activo: true },
  { sku: 'COL-019', nombre: 'Termostato Motor 82°C', descripcion: 'Termostato de motor con sello de cobre. Temperatura de apertura 82°C.', categoria: 'Refrigeración', activo: false },
  { sku: 'TRA-067', nombre: 'Kit de Embrague Completo', descripcion: 'Kit completo de embrague: disco, plato, collarín. Para vehículos medianos.', categoria: 'Transmisión', activo: true },
  { sku: 'FRE-078', nombre: 'Disco de Freno Ventilado', descripcion: 'Disco de freno ventilado de 280mm. Mayor disipación de calor en frenadas.', categoria: 'Frenos', activo: false },
  { sku: 'ELE-101', nombre: 'Alternador 90A Remanufacturado', descripcion: 'Alternador de 90 amperes remanufacturado con garantía. Incluye polea.', categoria: 'Eléctrico', activo: true },
  { sku: 'SUS-200', nombre: 'Rotula Inferior Izquierda', descripcion: 'Rótula inferior de suspensión lado conductor. Compatible múltiples modelos.', categoria: 'Suspensión', activo: true },
  { sku: 'MOT-145', nombre: 'Empaque de Culata', descripcion: 'Empaque de culata en multicapa de acero. Incluye tornillos de culata.', categoria: 'Motor', activo: false },
  { sku: 'COL-055', nombre: 'Radiador Aluminio Universal', descripcion: 'Radiador de aluminio de 2 núcleos. Máxima eficiencia de enfriamiento.', categoria: 'Refrigeración', activo: true },
  { sku: 'TRA-033', nombre: 'Semieje Derecho con CV', descripcion: 'Semieje completo lado derecho con junta homocinética. Nuevo de origen.', categoria: 'Transmisión', activo: true },
  { sku: 'FIL-099', nombre: 'Filtro de Combustible Inline', descripcion: 'Filtro de combustible en línea para sistemas de inyección de gasolina.', categoria: 'Filtros', activo: false },
  { sku: 'ELE-305', nombre: 'Sensor de Oxígeno Bosch', descripcion: 'Sensor de oxígeno frontal tipo universal. Compatible OBD-II. 4 cables.', categoria: 'Eléctrico', activo: true },
];

type FiltroEstado = 'todos' | 'activos' | 'inactivos';

interface ToastMsg { id: string; message: string; type: 'success' | 'warning' }

export function CatalogoExtendido() {
  const { adminUser } = useAdminAuth();
  const [productos, setProductos] = useState<Producto[]>(mockProductos);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('todos');
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());
  const [bitacora, setBitacora] = useState<BitacoraEntry[]>([]);
  const [showBitacora, setShowBitacora] = useState(false);
  const [showConfirmMasivo, setShowConfirmMasivo] = useState(false);
  const [accionMasiva, setAccionMasiva] = useState<'activar' | 'desactivar' | null>(null);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [showFiltroMenu, setShowFiltroMenu] = useState(false);

  const addToast = useCallback((message: string, type: ToastMsg['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const registrarBitacora = useCallback((sku: string, nombre: string, anterior: boolean, nuevo: boolean) => {
    const entry: BitacoraEntry = {
      id: Date.now().toString() + Math.random(),
      sku,
      nombreProducto: nombre,
      estadoAnterior: anterior,
      estadoNuevo: nuevo,
      usuario: adminUser?.name || 'Admin',
      timestamp: new Date(),
    };
    setBitacora(prev => [entry, ...prev]);
  }, [adminUser]);

  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const matchBusqueda =
        busqueda === '' ||
        p.sku.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busqueda.toLowerCase());
      const matchEstado =
        filtroEstado === 'todos' ||
        (filtroEstado === 'activos' && p.activo) ||
        (filtroEstado === 'inactivos' && !p.activo);
      return matchBusqueda && matchEstado;
    });
  }, [productos, busqueda, filtroEstado]);

  const todosSeleccionados =
    productosFiltrados.length > 0 &&
    productosFiltrados.every(p => seleccionados.has(p.sku));

  const toggleSeleccionTodos = () => {
    if (todosSeleccionados) {
      setSeleccionados(prev => {
        const next = new Set(prev);
        productosFiltrados.forEach(p => next.delete(p.sku));
        return next;
      });
    } else {
      setSeleccionados(prev => {
        const next = new Set(prev);
        productosFiltrados.forEach(p => next.add(p.sku));
        return next;
      });
    }
  };

  const toggleSeleccion = (sku: string) => {
    setSeleccionados(prev => {
      const next = new Set(prev);
      if (next.has(sku)) next.delete(sku);
      else next.add(sku);
      return next;
    });
  };

  const cambiarEstado = (sku: string, nuevoEstado: boolean) => {
    const producto = productos.find(p => p.sku === sku);
    if (!producto) return;
    registrarBitacora(sku, producto.nombre, producto.activo, nuevoEstado);
    setProductos(prev => prev.map(p => p.sku === sku ? { ...p, activo: nuevoEstado } : p));
    addToast(
      nuevoEstado
        ? `Producto ${sku} activado correctamente`
        : `Producto ${sku} desactivado correctamente`,
      'success'
    );
  };

  const aplicarCambioMasivo = (accion: 'activar' | 'desactivar') => {
    const skusSeleccionados = Array.from(seleccionados);
    const nuevoEstado = accion === 'activar';

    skusSeleccionados.forEach(sku => {
      const producto = productos.find(p => p.sku === sku);
      if (producto && producto.activo !== nuevoEstado) {
        registrarBitacora(sku, producto.nombre, producto.activo, nuevoEstado);
      }
    });

    setProductos(prev =>
      prev.map(p => seleccionados.has(p.sku) ? { ...p, activo: nuevoEstado } : p)
    );

    addToast(
      `${skusSeleccionados.length} producto(s) ${nuevoEstado ? 'activados' : 'desactivados'} correctamente`,
      'success'
    );
    setSeleccionados(new Set());
    setShowConfirmMasivo(false);
    setAccionMasiva(null);
  };

  const solicitarCambioMasivo = (accion: 'activar' | 'desactivar') => {
    const skusSeleccionados = Array.from(seleccionados);
    if (accion === 'desactivar' && skusSeleccionados.length > 10) {
      setAccionMasiva(accion);
      setShowConfirmMasivo(true);
    } else {
      aplicarCambioMasivo(accion);
    }
  };

  const filtroLabel: Record<FiltroEstado, string> = {
    todos: 'Todos',
    activos: 'Activos',
    inactivos: 'Inactivos',
  };

  const activosCount = productos.filter(p => p.activo).length;
  const inactivosCount = productos.filter(p => !p.activo).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm flex items-center gap-2 pointer-events-auto transition-all ${
              t.type === 'success' ? 'bg-green-600' : 'bg-amber-500'
            }`}
          >
            <span className="text-base">✓</span>
            {t.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Catálogo Extendido</h1>
        </div>
        <p className="text-gray-500 text-sm ml-10">Gestión de publicación de productos del catálogo</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">{productos.length}</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total productos</p>
            <p className="font-semibold text-gray-800">Catálogo completo</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-sm">{activosCount}</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Publicados</p>
            <p className="font-semibold text-gray-800">Activos</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-bold text-sm">{inactivosCount}</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Despublicados</p>
            <p className="font-semibold text-gray-800">Inactivos</p>
          </div>
        </div>
      </div>

      {/* Barra de acciones */}
      <div className="bg-white rounded-xl border mb-4 p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por SKU, nombre o categoría…"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filtro estado */}
          <div className="relative">
            <button
              onClick={() => setShowFiltroMenu(!showFiltroMenu)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span>{filtroLabel[filtroEstado]}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {showFiltroMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10 w-36 overflow-hidden">
                {(['todos', 'activos', 'inactivos'] as FiltroEstado[]).map(f => (
                  <button
                    key={f}
                    onClick={() => { setFiltroEstado(f); setShowFiltroMenu(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      filtroEstado === f ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {filtroLabel[f]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bitácora */}
          <button
            onClick={() => setShowBitacora(true)}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Bitácora</span>
            {bitacora.length > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {bitacora.length}
              </span>
            )}
          </button>
        </div>

        {/* Acciones en lote */}
        {seleccionados.size > 0 && (
          <div className="mt-3 pt-3 border-t flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-600">
              <strong>{seleccionados.size}</strong> producto(s) seleccionado(s)
            </span>
            <button
              onClick={() => solicitarCambioMasivo('activar')}
              className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              Activar selección
            </button>
            <button
              onClick={() => solicitarCambioMasivo('desactivar')}
              className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Desactivar selección
            </button>
            <button
              onClick={() => setSeleccionados(new Set())}
              className="px-4 py-1.5 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Limpiar selección
            </button>
          </div>
        )}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {/* Encabezado de tabla */}
        <div className="grid grid-cols-[48px_80px_1fr_100px] items-center px-4 py-3 bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={todosSeleccionados}
              onChange={toggleSeleccionTodos}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
            />
          </div>
          <div className="text-center">Imagen</div>
          <div className="pl-2">Descripción del Producto</div>
          <div className="text-center">Estado</div>
        </div>

        {/* Filas */}
        {productosFiltrados.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No se encontraron productos con los filtros aplicados</p>
          </div>
        ) : (
          <div className="divide-y">
            {productosFiltrados.map(producto => (
              <div
                key={producto.sku}
                className={`grid grid-cols-[48px_80px_1fr_100px] items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
                  seleccionados.has(producto.sku) ? 'bg-blue-50' : ''
                }`}
              >
                {/* Checkbox */}
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={seleccionados.has(producto.sku)}
                    onChange={() => toggleSeleccion(producto.sku)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                </div>

                {/* Imagen */}
                <div className="flex items-center justify-center">
                  <AutopartIcon sku={producto.sku} size={60} />
                </div>

                {/* Descripción */}
                <div className="pl-2 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {producto.sku}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {producto.categoria}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 text-sm leading-tight">{producto.nombre}</p>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5 line-clamp-2">{producto.descripcion}</p>
                </div>

                {/* Switch */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => cambiarEstado(producto.sku, !producto.activo)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                      producto.activo ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={producto.activo}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        producto.activo ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-xs font-medium ${producto.activo ? 'text-green-600' : 'text-gray-400'}`}>
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer tabla */}
        <div className="px-4 py-3 border-t bg-gray-50 text-xs text-gray-500">
          Mostrando {productosFiltrados.length} de {productos.length} productos
        </div>
      </div>

      {/* Modal Confirmación Desactivación Masiva */}
      {showConfirmMasivo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-2xl">!</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Confirmación requerida</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Estás a punto de <strong>desactivar {seleccionados.size} productos</strong> simultáneamente. Esta acción afectará la visibilidad de estos productos en el catálogo de la tienda.
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 text-sm text-amber-800">
              ⚠️ Se desactivarán más de 10 productos al mismo tiempo. Esta acción quedará registrada en la bitácora de cambios.
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowConfirmMasivo(false); setAccionMasiva(null); }}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => aplicarCambioMasivo('desactivar')}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sí, desactivar todos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Bitácora */}
      {showBitacora && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Bitácora de Cambios</h3>
              </div>
              <button
                onClick={() => setShowBitacora(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              {bitacora.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-sm">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>No hay cambios registrados aún</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bitacora.map(entry => (
                    <div key={entry.id} className="border rounded-lg p-3 text-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono font-semibold text-blue-600 text-xs bg-blue-50 px-1.5 py-0.5 rounded">
                              {entry.sku}
                            </span>
                            <span className="text-gray-600 text-xs">{entry.nombreProducto}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className={`px-1.5 py-0.5 rounded font-medium ${entry.estadoAnterior ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {entry.estadoAnterior ? 'Activo' : 'Inactivo'}
                            </span>
                            <span>→</span>
                            <span className={`px-1.5 py-0.5 rounded font-medium ${entry.estadoNuevo ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                              {entry.estadoNuevo ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400 shrink-0">
                          <p className="font-medium text-gray-600">{entry.usuario}</p>
                          <p>{entry.timestamp.toLocaleDateString('es-MX')}</p>
                          <p>{entry.timestamp.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <p className="text-xs text-gray-400 text-center">{bitacora.length} registro(s) en esta sesión</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
