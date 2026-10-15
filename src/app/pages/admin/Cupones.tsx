import { useState, useMemo } from 'react';
import { Plus, Edit, ToggleLeft, ToggleRight, Trash2, X, AlertTriangle } from 'lucide-react';
import { Modal } from '../../components/admin/Modal';

// ── Catálogo de relaciones Marca × Categoría × Familia ──────────────────────
// Cada fila es una combinación válida. La selección cruzada filtra sobre este catálogo.
interface Relacion { marca: string; categoria: string; familia: string }

const CATALOGO: Relacion[] = [
  // BOSCH
  { marca: 'Bosch', categoria: 'Filtros',        familia: 'Filtros de Aceite' },
  { marca: 'Bosch', categoria: 'Filtros',        familia: 'Filtros de Aire' },
  { marca: 'Bosch', categoria: 'Filtros',        familia: 'Filtros de Combustible' },
  { marca: 'Bosch', categoria: 'Eléctrico',      familia: 'Sensores de Oxígeno' },
  { marca: 'Bosch', categoria: 'Eléctrico',      familia: 'Alternadores' },
  { marca: 'Bosch', categoria: 'Frenos',         familia: 'Balatas' },
  { marca: 'Bosch', categoria: 'Frenos',         familia: 'Discos de Freno' },
  // MOOG
  { marca: 'Moog',  categoria: 'Suspensión',     familia: 'Rótulas' },
  { marca: 'Moog',  categoria: 'Suspensión',     familia: 'Terminales' },
  { marca: 'Moog',  categoria: 'Suspensión',     familia: 'Bases de Amortiguador' },
  { marca: 'Moog',  categoria: 'Frenos',         familia: 'Balatas' },
  // KYB
  { marca: 'KYB',   categoria: 'Suspensión',     familia: 'Amortiguadores' },
  { marca: 'KYB',   categoria: 'Suspensión',     familia: 'Bases de Amortiguador' },
  // DENSO
  { marca: 'Denso', categoria: 'Eléctrico',      familia: 'Bujías' },
  { marca: 'Denso', categoria: 'Eléctrico',      familia: 'Sensores de Oxígeno' },
  { marca: 'Denso', categoria: 'Filtros',        familia: 'Filtros de Aceite' },
  { marca: 'Denso', categoria: 'Refrigeración',  familia: 'Termostatos' },
  // ACDELCO
  { marca: 'ACDelco', categoria: 'Frenos',       familia: 'Balatas' },
  { marca: 'ACDelco', categoria: 'Frenos',       familia: 'Discos de Freno' },
  { marca: 'ACDelco', categoria: 'Frenos',       familia: 'Cilindros de Freno' },
  { marca: 'ACDelco', categoria: 'Eléctrico',    familia: 'Baterías' },
  { marca: 'ACDelco', categoria: 'Motor',        familia: 'Empaques de Motor' },
  // NGK
  { marca: 'NGK',   categoria: 'Eléctrico',      familia: 'Bujías' },
  { marca: 'NGK',   categoria: 'Eléctrico',      familia: 'Cables de Bujía' },
  // MONROE
  { marca: 'Monroe', categoria: 'Suspensión',    familia: 'Amortiguadores' },
  { marca: 'Monroe', categoria: 'Suspensión',    familia: 'Bases de Amortiguador' },
  // GATES
  { marca: 'Gates',  categoria: 'Motor',         familia: 'Bandas de Distribución' },
  { marca: 'Gates',  categoria: 'Motor',         familia: 'Cadenas de Distribución' },
  { marca: 'Gates',  categoria: 'Refrigeración', familia: 'Mangueras de Radiador' },
  // VALEO
  { marca: 'Valeo',  categoria: 'Transmisión',   familia: 'Kits de Embrague' },
  { marca: 'Valeo',  categoria: 'Transmisión',   familia: 'Discos de Embrague' },
  { marca: 'Valeo',  categoria: 'Eléctrico',     familia: 'Alternadores' },
  // SKF
  { marca: 'SKF',    categoria: 'Transmisión',   familia: 'Semiejes' },
  { marca: 'SKF',    categoria: 'Suspensión',    familia: 'Rótulas' },
  { marca: 'SKF',    categoria: 'Motor',         familia: 'Rines y Baleros' },
];

function unique(arr: string[]): string[] {
  return Array.from(new Set(arr)).sort();
}

// ── Interfaces ───────────────────────────────────────────────────────────────
interface Cupon {
  id: string;
  codigo: string;
  tipo: 'porcentaje' | 'monto_fijo';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usoMaximoGlobal: number;
  usoMaximoPorUsuario: number | null;
  montoMinimo: number | null;
  aplicabilidad: 'todos' | 'cruzada';
  aplicabilidadMarca: string;
  aplicabilidadCategoria: string;
  aplicabilidadFamilia: string;
  clienteTipo: 'sin_registrar' | 'registrado' | 'todos';
  activo: boolean;
  usosActuales: number;
  fechaCreacion: string;
}

type FormData = {
  codigo: string;
  tipo: 'porcentaje' | 'monto_fijo';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usoMaximoGlobal: number;
  usoMaximoPorUsuario: number | null;
  montoMinimo: number | null;
  aplicabilidad: 'todos' | 'cruzada';
  aplicabilidadMarca: string;
  aplicabilidadCategoria: string;
  aplicabilidadFamilia: string;
  clienteTipo: 'sin_registrar' | 'registrado' | 'todos';
  activo: boolean;
};

const emptyForm: FormData = {
  codigo: '',
  tipo: 'porcentaje',
  valor: 0,
  fechaInicio: '',
  fechaFin: '',
  usoMaximoGlobal: 0,
  usoMaximoPorUsuario: null,
  montoMinimo: null,
  aplicabilidad: 'todos',
  aplicabilidadMarca: '',
  aplicabilidadCategoria: '',
  aplicabilidadFamilia: '',
  clienteTipo: 'todos',
  activo: true,
};

const mockCupones: Cupon[] = [
  {
    id: '1', codigo: 'VERANO2026', tipo: 'porcentaje', valor: 15,
    fechaInicio: '2026-06-01', fechaFin: '2026-08-31',
    usoMaximoGlobal: 1000, usoMaximoPorUsuario: 1, montoMinimo: 500,
    aplicabilidad: 'todos', aplicabilidadMarca: '', aplicabilidadCategoria: '', aplicabilidadFamilia: '',
    clienteTipo: 'todos', activo: true, usosActuales: 245, fechaCreacion: '2026-05-01',
  },
  {
    id: '2', codigo: 'FRENOS20', tipo: 'monto_fijo', valor: 150,
    fechaInicio: '2026-06-01', fechaFin: '2026-07-31',
    usoMaximoGlobal: 500, usoMaximoPorUsuario: 1, montoMinimo: 300,
    aplicabilidad: 'cruzada', aplicabilidadMarca: 'Bosch', aplicabilidadCategoria: 'Frenos', aplicabilidadFamilia: 'Balatas',
    clienteTipo: 'registrado', activo: true, usosActuales: 68, fechaCreacion: '2026-06-01',
  },
];

// ── Componente de selección cruzada ─────────────────────────────────────────
interface CrossFilterProps {
  marca: string;
  categoria: string;
  familia: string;
  onChange: (field: 'aplicabilidadMarca' | 'aplicabilidadCategoria' | 'aplicabilidadFamilia', value: string) => void;
  error?: string;
}

function CrossFilter({ marca, categoria, familia, onChange, error }: CrossFilterProps) {
  // Filtrar el catálogo según las selecciones activas
  const filtered = useMemo(() => {
    return CATALOGO.filter(r =>
      (marca === '' || r.marca === marca) &&
      (categoria === '' || r.categoria === categoria) &&
      (familia === '' || r.familia === familia)
    );
  }, [marca, categoria, familia]);

  // Opciones disponibles: todas si no hay nada seleccionado en esa dimensión;
  // si hay algo seleccionado en otra dimensión, restringir.
  const marcasDisponibles = useMemo(() => {
    const base = (categoria === '' && familia === '')
      ? CATALOGO
      : CATALOGO.filter(r =>
          (categoria === '' || r.categoria === categoria) &&
          (familia === '' || r.familia === familia)
        );
    return unique(base.map(r => r.marca));
  }, [categoria, familia]);

  const categoriasDisponibles = useMemo(() => {
    const base = (marca === '' && familia === '')
      ? CATALOGO
      : CATALOGO.filter(r =>
          (marca === '' || r.marca === marca) &&
          (familia === '' || r.familia === familia)
        );
    return unique(base.map(r => r.categoria));
  }, [marca, familia]);

  const familiasDisponibles = useMemo(() => {
    const base = (marca === '' && categoria === '')
      ? CATALOGO
      : CATALOGO.filter(r =>
          (marca === '' || r.marca === marca) &&
          (categoria === '' || r.categoria === categoria)
        );
    return unique(base.map(r => r.familia));
  }, [marca, categoria]);

  const hasSelection = marca !== '' || categoria !== '' || familia !== '';

  const chipClass = (active: boolean, disabled: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs border cursor-pointer transition-all select-none ${
      active
        ? 'bg-blue-600 text-white border-blue-600 font-medium'
        : disabled
        ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
    }`;

  const handleSelect = (field: 'aplicabilidadMarca' | 'aplicabilidadCategoria' | 'aplicabilidadFamilia', current: string, value: string) => {
    onChange(field, current === value ? '' : value);
  };

  return (
    <div className="mt-3 border rounded-xl overflow-hidden">
      {/* Resumen de selección */}
      {hasSelection && (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-b flex-wrap">
          <span className="text-xs text-blue-700 font-medium">Aplica a:</span>
          {marca && (
            <span className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              Marca: <strong>{marca}</strong>
              <button onClick={() => onChange('aplicabilidadMarca', '')} className="ml-1 hover:text-blue-900"><X className="w-3 h-3" /></button>
            </span>
          )}
          {categoria && (
            <span className="flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
              Categoría: <strong>{categoria}</strong>
              <button onClick={() => onChange('aplicabilidadCategoria', '')} className="ml-1 hover:text-purple-900"><X className="w-3 h-3" /></button>
            </span>
          )}
          {familia && (
            <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              Familia: <strong>{familia}</strong>
              <button onClick={() => onChange('aplicabilidadFamilia', '')} className="ml-1 hover:text-green-900"><X className="w-3 h-3" /></button>
            </span>
          )}
          {hasSelection && (
            <button
              type="button"
              onClick={() => { onChange('aplicabilidadMarca', ''); onChange('aplicabilidadCategoria', ''); onChange('aplicabilidadFamilia', ''); }}
              className="ml-auto text-xs text-blue-600 hover:underline"
            >
              Limpiar todo
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 divide-x">
        {/* Columna Marca */}
        <div className="p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Marca</p>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
            {unique(CATALOGO.map(r => r.marca)).map(m => {
              const disabled = !marcasDisponibles.includes(m) && (categoria !== '' || familia !== '');
              return (
                <button
                  key={m} type="button"
                  disabled={disabled}
                  onClick={() => !disabled && handleSelect('aplicabilidadMarca', marca, m)}
                  className={chipClass(marca === m, disabled)}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Columna Categoría */}
        <div className="p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categoría</p>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
            {unique(CATALOGO.map(r => r.categoria)).map(c => {
              const disabled = !categoriasDisponibles.includes(c) && (marca !== '' || familia !== '');
              return (
                <button
                  key={c} type="button"
                  disabled={disabled}
                  onClick={() => !disabled && handleSelect('aplicabilidadCategoria', categoria, c)}
                  className={chipClass(categoria === c, disabled)}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Columna Familia */}
        <div className="p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Familia</p>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
            {unique(CATALOGO.map(r => r.familia)).map(f => {
              const disabled = !familiasDisponibles.includes(f) && (marca !== '' || categoria !== '');
              return (
                <button
                  key={f} type="button"
                  disabled={disabled}
                  onClick={() => !disabled && handleSelect('aplicabilidadFamilia', familia, f)}
                  className={chipClass(familia === f, disabled)}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resultado de combinación */}
      {hasSelection && (
        <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-500">
          {filtered.length > 0
            ? `${filtered.length} combinación(es) válida(s) en el catálogo`
            : <span className="text-amber-600">⚠ Sin coincidencias para esta combinación</span>}
        </div>
      )}

      {error && <p className="px-4 pb-3 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Helper: etiqueta de aplicabilidad para la tabla ─────────────────────────
function etiquetaAplicabilidad(c: Cupon): string {
  if (c.aplicabilidad === 'todos') return 'Todos';
  const parts = [c.aplicabilidadMarca, c.aplicabilidadCategoria, c.aplicabilidadFamilia].filter(Boolean);
  return parts.join(' / ') || 'Sin definir';
}

// ── Componente principal ─────────────────────────────────────────────────────
export function Cupones() {
  const [cupones, setCupones] = useState<Cupon[]>(mockCupones);
  const [showModal, setShowModal] = useState(false);
  const [selectedCupon, setSelectedCupon] = useState<Cupon | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<Cupon | null>(null);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const handleCreate = () => {
    setSelectedCupon(null);
    setFormData(emptyForm);
    setErrors({});
    setSubmitError('');
    setShowModal(true);
  };

  const handleEdit = (cupon: Cupon) => {
    setSelectedCupon(cupon);
    setFormData({
      codigo: cupon.codigo,
      tipo: cupon.tipo,
      valor: cupon.valor,
      fechaInicio: cupon.fechaInicio,
      fechaFin: cupon.fechaFin,
      usoMaximoGlobal: cupon.usoMaximoGlobal,
      usoMaximoPorUsuario: cupon.usoMaximoPorUsuario,
      montoMinimo: cupon.montoMinimo,
      aplicabilidad: cupon.aplicabilidad,
      aplicabilidadMarca: cupon.aplicabilidadMarca,
      aplicabilidadCategoria: cupon.aplicabilidadCategoria,
      aplicabilidadFamilia: cupon.aplicabilidadFamilia,
      clienteTipo: cupon.clienteTipo,
      activo: cupon.activo,
    });
    setErrors({});
    setSubmitError('');
    setShowModal(true);
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.codigo.trim()) e.codigo = 'El código es requerido';
    else if (!/^[A-Z0-9]+$/.test(formData.codigo)) e.codigo = 'Solo letras mayúsculas y números';
    if (formData.valor <= 0) e.valor = 'El valor debe ser mayor a 0';
    if (formData.tipo === 'porcentaje' && formData.valor > 100) e.valor = 'El porcentaje no puede ser mayor a 100';
    if (!formData.fechaInicio) e.fechaInicio = 'La fecha de inicio es requerida';
    if (!formData.fechaFin) e.fechaFin = 'La fecha de fin es requerida';
    if (formData.fechaInicio && formData.fechaFin && formData.fechaInicio > formData.fechaFin)
      e.fechaFin = 'La fecha de fin debe ser posterior a la de inicio';
    if (formData.usoMaximoGlobal <= 0) e.usoMaximoGlobal = 'El uso máximo global debe ser mayor a 0';
    if (formData.aplicabilidad === 'cruzada' && !formData.aplicabilidadMarca && !formData.aplicabilidadCategoria && !formData.aplicabilidadFamilia)
      e.aplicabilidad = 'Selecciona al menos una opción (marca, categoría o familia)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCupon && (!selectedCupon.activo || !isVigente(selectedCupon))) {
      setSubmitError('Este cupón está inactivo o ya no está vigente. No es posible editarlo.');
      return;
    }
    setSubmitError('');
    if (!validate()) return;
    if (selectedCupon) {
      setCupones(prev => prev.map(c => c.id === selectedCupon.id ? { ...c, ...formData } : c));
    } else {
      setCupones(prev => [...prev, {
        id: String(Date.now()),
        ...formData,
        usosActuales: 0,
        fechaCreacion: new Date().toISOString().split('T')[0],
      }]);
    }
    setShowModal(false);
  };

  const toggleActive = (id: string) =>
    setCupones(prev => prev.map(c => c.id === id ? { ...c, activo: !c.activo } : c));

  const deleteCupon = (cupon: Cupon) => setConfirmDelete(cupon);

  const handleConfirmDelete = () => {
    if (confirmDelete) setCupones(prev => prev.filter(c => c.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  const isVigente = (c: Cupon) => {
    const now = new Date(); return now >= new Date(c.fechaInicio) && now <= new Date(c.fechaFin);
  };

  const handleCrossChange = (field: 'aplicabilidadMarca' | 'aplicabilidadCategoria' | 'aplicabilidadFamilia', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Gestión de Cupones</h1>
          <p className="text-gray-600">Administra los cupones de descuento</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Crear cupón
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Código</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Tipo</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Valor</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Vigencia</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Aplica a</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Usos</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Estatus</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {cupones.map((cupon) => (
              <tr key={cupon.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-mono font-semibold text-blue-600">{cupon.codigo}</div>
                </td>
                <td className="px-6 py-4 text-sm">{cupon.tipo === 'porcentaje' ? 'Porcentaje' : 'Monto fijo'}</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `$${cupon.valor}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(cupon.fechaInicio).toLocaleDateString('es-MX')} – {new Date(cupon.fechaFin).toLocaleDateString('es-MX')}
                  {isVigente(cupon) && <span className="ml-2 text-xs text-green-600 font-medium">(Vigente)</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-[160px]">
                  <span className="line-clamp-2">{etiquetaAplicabilidad(cupon)}</span>
                </td>
                <td className="px-6 py-4 text-sm">{cupon.usosActuales} / {cupon.usoMaximoGlobal}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cupon.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {cupon.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(cupon)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => toggleActive(cupon.id)} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title={cupon.activo ? 'Desactivar' : 'Activar'}>
                      {cupon.activo ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button onClick={() => deleteCupon(cupon)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Eliminar cupón"
        maxWidth="sm"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                ¿Eliminar el cupón <span className="font-mono text-blue-600">{confirmDelete?.codigo}</span>?
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Esta acción eliminará permanentemente el cupón y no podrá deshacerse.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setConfirmDelete(null)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal crear / editar */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCupon ? 'Editar cupón' : 'Crear nuevo cupón'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Código */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código del cupón *</label>
            <input
              type="text"
              value={formData.codigo}
              onChange={e => setField('codigo', e.target.value.toUpperCase())}
              className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono ${errors.codigo ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="VERANO2026"
            />
            {errors.codigo && <p className="text-xs text-red-600 mt-1">{errors.codigo}</p>}
          </div>

          {/* Tipo + Valor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de descuento *</label>
              <div className="flex gap-4">
                {(['porcentaje', 'monto_fijo'] as const).map(t => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={t} checked={formData.tipo === t} onChange={() => setField('tipo', t)} className="text-blue-600" />
                    <span className="text-sm">{t === 'porcentaje' ? 'Porcentaje (%)' : 'Monto fijo ($)'}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor *</label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.valor || ''}
                  onChange={e => setField('valor', Number(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${errors.valor ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="0" min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {formData.tipo === 'porcentaje' ? '%' : '$'}
                </span>
              </div>
              {errors.valor && <p className="text-xs text-red-600 mt-1">{errors.valor}</p>}
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio *</label>
              <input type="date" value={formData.fechaInicio} onChange={e => setField('fechaInicio', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${errors.fechaInicio ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.fechaInicio && <p className="text-xs text-red-600 mt-1">{errors.fechaInicio}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin *</label>
              <input type="date" value={formData.fechaFin} onChange={e => setField('fechaFin', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${errors.fechaFin ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.fechaFin && <p className="text-xs text-red-600 mt-1">{errors.fechaFin}</p>}
            </div>
          </div>

          {/* Usos */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uso máximo global *</label>
              <input type="number" value={formData.usoMaximoGlobal || ''} onChange={e => setField('usoMaximoGlobal', Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${errors.usoMaximoGlobal ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="1000" min="1" />
              {errors.usoMaximoGlobal && <p className="text-xs text-red-600 mt-1">{errors.usoMaximoGlobal}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uso máximo por usuario (opcional)</label>
              <input type="number" value={formData.usoMaximoPorUsuario || ''} onChange={e => setField('usoMaximoPorUsuario', e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sin límite" min="1" />
            </div>
          </div>

          {/* Monto mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto mínimo de compra (opcional)</label>
            <input type="number" value={formData.montoMinimo || ''} onChange={e => setField('montoMinimo', e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sin mínimo" min="0" />
          </div>

          {/* Tipo de cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aplica para *</label>
            <select
              value={formData.clienteTipo}
              onChange={e => setField('clienteTipo', e.target.value as FormData['clienteTipo'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="sin_registrar">Cliente sin registrar</option>
              <option value="registrado">Cliente registrado</option>
              <option value="todos">Todos los clientes</option>
            </select>
          </div>

          {/* ── Aplicabilidad ─────────────────────────────────────────────── */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aplicabilidad *</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.aplicabilidad === 'todos'}
                  onChange={() => {
                    setFormData(prev => ({ ...prev, aplicabilidad: 'todos', aplicabilidadMarca: '', aplicabilidadCategoria: '', aplicabilidadFamilia: '' }));
                  }}
                  className="text-blue-600" />
                <span className="text-sm">Todos los productos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.aplicabilidad === 'cruzada'}
                  onChange={() => setField('aplicabilidad', 'cruzada')}
                  className="text-blue-600" />
                <span className="text-sm">Por Marca / Categoría / Familia</span>
              </label>
            </div>

            {formData.aplicabilidad === 'cruzada' && (
              <CrossFilter
                marca={formData.aplicabilidadMarca}
                categoria={formData.aplicabilidadCategoria}
                familia={formData.aplicabilidadFamilia}
                onChange={handleCrossChange}
                error={errors.aplicabilidad}
              />
            )}
            {formData.aplicabilidad !== 'cruzada' && errors.aplicabilidad && (
              <p className="text-xs text-red-600 mt-1">{errors.aplicabilidad}</p>
            )}
          </div>

          {/* Activo */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="activo" checked={formData.activo} onChange={e => setField('activo', e.target.checked)} className="rounded" />
            <label htmlFor="activo" className="text-sm font-medium text-gray-700">Cupón activo</label>
          </div>

          {/* Error de edición de cupón inactivo/vencido */}
          {submitError && (
            <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-sm">{submitError}</p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t">
            <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {selectedCupon ? 'Actualizar' : 'Crear'}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
