import { useState } from 'react';
import { Plus, Edit, Check, Search, ChevronDown } from 'lucide-react';
import { Modal } from '../../components/admin/Modal';

interface Colaborador {
  noEmpleado: string;
  nombre: string;
  correo: string;
  area: string;
}

interface Usuario {
  id: string;
  noEmpleado: string;
  nombre: string;
  correo: string;
  rol: 'administrador' | 'personalizado';
  area: string;
  estatus: 'activo' | 'inactivo';
  permisos: {
    usuarios: boolean;
    landing: boolean;
    banners: boolean;
    cupones: boolean;
    footer: boolean;
    catalogo: boolean;
  };
  fechaCreacion: string;
}

const mockColaboradores: Colaborador[] = [
  { noEmpleado: '001', nombre: 'Juan Pérez García', correo: 'juan.perez@autex.com.mx', area: 'Sistemas' },
  { noEmpleado: '002', nombre: 'María López Hernández', correo: 'maria.lopez@autex.com.mx', area: 'Marketing' },
  { noEmpleado: '003', nombre: 'Carlos Ramírez Torres', correo: 'carlos.ramirez@autex.com.mx', area: 'Ventas' },
  { noEmpleado: '004', nombre: 'Ana Martínez Silva', correo: 'ana.martinez@autex.com.mx', area: 'Recursos Humanos' },
  { noEmpleado: '005', nombre: 'Luis González Vargas', correo: 'luis.gonzalez@autex.com.mx', area: 'Sistemas' },
  { noEmpleado: '006', nombre: 'Patricia Sánchez Cruz', correo: 'patricia.sanchez@autex.com.mx', area: 'Marketing' },
  { noEmpleado: '007', nombre: 'Roberto Flores Mendoza', correo: 'roberto.flores@autex.com.mx', area: 'Almacén' },
  { noEmpleado: '008', nombre: 'Laura Díaz Morales', correo: 'laura.diaz@autex.com.mx', area: 'Finanzas' },
  { noEmpleado: '009', nombre: 'Fernando Ruiz Castro', correo: 'fernando.ruiz@autex.com.mx', area: 'Sistemas' },
  { noEmpleado: '010', nombre: 'Gabriela Torres Reyes', correo: 'gabriela.torres@autex.com.mx', area: 'Ventas' },
  { noEmpleado: '011', nombre: 'Ricardo Moreno Jiménez', correo: 'ricardo.moreno@autex.com.mx', area: 'Almacén' },
  { noEmpleado: '012', nombre: 'Sofía Herrera Ortiz', correo: 'sofia.herrera@autex.com.mx', area: 'Marketing' },
  { noEmpleado: '013', nombre: 'Miguel Ángel Vega', correo: 'miguel.vega@autex.com.mx', area: 'Recursos Humanos' },
  { noEmpleado: '014', nombre: 'Verónica Castillo Ramos', correo: 'veronica.castillo@autex.com.mx', area: 'Finanzas' },
  { noEmpleado: '015', nombre: 'Jorge Luis Medina', correo: 'jorge.medina@autex.com.mx', area: 'Sistemas' },
  { noEmpleado: '016', nombre: 'Elena Fernández Gómez', correo: 'elena.fernandez@autex.com.mx', area: 'Ventas' },
  { noEmpleado: '017', nombre: 'Alejandro Núñez Pérez', correo: 'alejandro.nunez@autex.com.mx', area: 'Marketing' },
  { noEmpleado: '018', nombre: 'Diana Guerrero Soto', correo: 'diana.guerrero@autex.com.mx', area: 'Almacén' },
];

const mockUsuarios: Usuario[] = [
  {
    id: '1',
    noEmpleado: '001',
    nombre: 'Juan Pérez García',
    correo: 'juan.perez@autex.com.mx',
    rol: 'administrador',
    area: 'Sistemas',
    estatus: 'activo',
    permisos: { usuarios: true, landing: true, banners: true, cupones: true, footer: true, catalogo: true },
    fechaCreacion: '2024-01-15'
  },
  {
    id: '2',
    noEmpleado: '002',
    nombre: 'María López Hernández',
    correo: 'maria.lopez@autex.com.mx',
    rol: 'personalizado',
    area: 'Marketing',
    estatus: 'activo',
    permisos: { usuarios: false, landing: true, banners: true, cupones: true, footer: false, catalogo: true },
    fechaCreacion: '2024-02-20'
  },
];

export function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);

  const [formData, setFormData] = useState({
    noEmpleado: '',
    nombre: '',
    correo: '',
    area: '',
    password: '',
    confirmPassword: '',
    rol: 'personalizado' as 'administrador' | 'personalizado',
    permisos: {
      usuarios: false,
      landing: false,
      banners: false,
      cupones: false,
      footer: false,
      catalogo: false,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCreate = () => {
    setEditingUser(null);
    setSearchTerm('');
    setSelectedColaborador(null);
    setFormData({
      noEmpleado: '',
      nombre: '',
      correo: '',
      area: '',
      password: '',
      confirmPassword: '',
      rol: 'personalizado',
      permisos: {
        usuarios: false,
        landing: false,
        banners: false,
        cupones: false,
        footer: false,
        catalogo: false,
      },
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setSearchTerm(usuario.nombre);
    setSelectedColaborador({
      noEmpleado: usuario.noEmpleado,
      nombre: usuario.nombre,
      correo: usuario.correo,
      area: usuario.area,
    });
    setFormData({
      noEmpleado: usuario.noEmpleado,
      nombre: usuario.nombre,
      correo: usuario.correo,
      area: usuario.area,
      password: '',
      confirmPassword: '',
      rol: usuario.rol,
      permisos: { ...usuario.permisos },
    });
    setErrors({});
    setShowModal(true);
  };

  const filteredColaboradores = mockColaboradores.filter((col) => {
    const term = searchTerm.toLowerCase();
    return (
      col.noEmpleado.includes(term) ||
      col.nombre.toLowerCase().includes(term)
    );
  });

  const handleSelectColaborador = (col: Colaborador) => {
    setSelectedColaborador(col);
    setSearchTerm(col.nombre);
    setFormData({
      ...formData,
      noEmpleado: col.noEmpleado,
      nombre: col.nombre,
      correo: col.correo,
      area: col.area,
    });
    setShowSuggestions(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.noEmpleado || !formData.nombre) {
      newErrors.colaborador = 'Debes seleccionar un colaborador';
    }

    // Validar contraseña al crear o si se está cambiando al editar
    if (!editingUser) {
      // Al crear, la contraseña es requerida
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    } else {
      // Al editar, solo validar si se ingresó una nueva contraseña
      if (formData.password || formData.confirmPassword) {
        if (formData.password.length > 0 && formData.password.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingUser) {
      setUsuarios(usuarios.map(u =>
        u.id === editingUser.id
          ? {
              ...u,
              noEmpleado: formData.noEmpleado,
              nombre: formData.nombre,
              correo: formData.correo,
              area: formData.area,
              rol: formData.rol,
              permisos: formData.permisos,
            }
          : u
      ));
    } else {
      const newUser: Usuario = {
        id: String(Date.now()),
        noEmpleado: formData.noEmpleado,
        nombre: formData.nombre,
        correo: formData.correo,
        area: formData.area,
        rol: formData.rol,
        permisos: formData.permisos,
        estatus: 'activo',
        fechaCreacion: new Date().toISOString().split('T')[0],
      };
      setUsuarios([...usuarios, newUser]);
    }

    setShowModal(false);
  };

  const toggleStatus = (id: string) => {
    setUsuarios(usuarios.map(u =>
      u.id === id ? { ...u, estatus: u.estatus === 'activo' ? 'inactivo' : 'activo' } : u
    ));
  };

  const getRolColor = (rol: 'administrador' | 'personalizado') => {
    return rol === 'administrador' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios del panel de administración</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Crear usuario
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">No empleado</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Nombre</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Correo</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Rol</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Área</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{usuario.noEmpleado}</td>
                <td className="px-6 py-4 text-sm">{usuario.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{usuario.correo}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getRolColor(usuario.rol)}`}>
                    {usuario.rol}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{usuario.area}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(usuario)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleStatus(usuario.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        usuario.estatus === 'activo' ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                      title={usuario.estatus === 'activo' ? 'Desactivar' : 'Activar'}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          usuario.estatus === 'activo' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? 'Editar usuario' : 'Crear nuevo usuario'}
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Colaborador con autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colaborador *
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                  if (!e.target.value) {
                    setSelectedColaborador(null);
                    setFormData({
                      ...formData,
                      noEmpleado: '',
                      nombre: '',
                      correo: '',
                      area: '',
                    });
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                onClick={() => setShowSuggestions(true)}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                  errors.colaborador ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Seleccionar colaborador"
              />
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              />
            </div>
            {errors.colaborador && <p className="text-xs text-red-600 mt-1">{errors.colaborador}</p>}

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {filteredColaboradores.slice(0, 10).length > 0 ? (
                  filteredColaboradores.slice(0, 10).map((col) => (
                    <button
                      key={col.noEmpleado}
                      type="button"
                      onClick={() => handleSelectColaborador(col)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {col.noEmpleado}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{col.nombre}</p>
                          <p className="text-xs text-gray-500">{col.area}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No se encontraron colaboradores
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Información del colaborador seleccionado */}
          {selectedColaborador && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Correo electrónico
                </label>
                <p className="text-sm text-gray-900">{selectedColaborador.correo}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Área
                </label>
                <p className="text-sm text-gray-900">{selectedColaborador.area}</p>
              </div>
            </div>
          )}

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña {!editingUser && '*'}
              </label>
              <input
                type="text"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={editingUser ? 'Dejar vacío para mantener actual' : ''}
              />
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña {!editingUser && '*'}
              </label>
              <input
                type="text"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={editingUser ? 'Dejar vacío para mantener actual' : ''}
              />
              {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol *
            </label>
            <select
              value={formData.rol}
              onChange={(e) => {
                const nuevoRol = e.target.value as 'administrador' | 'personalizado';
                setFormData({
                  ...formData,
                  rol: nuevoRol,
                  permisos: nuevoRol === 'administrador'
                    ? { usuarios: true, landing: true, banners: true, cupones: true, footer: true, catalogo: true }
                    : formData.permisos
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="administrador">Administrador</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>

          {/* Módulos de acceso */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Módulos de acceso</h3>
            <div className="space-y-3">
              {[
                { key: 'usuarios', label: 'Usuarios' },
                { key: 'landing', label: 'Landing' },
                { key: 'banners', label: 'Banners' },
                { key: 'cupones', label: 'Cupones' },
                { key: 'footer', label: 'Footer' },
                { key: 'catalogo', label: 'Catálogo Extendido' },
              ].map((modulo) => (
                <label key={modulo.key} className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  formData.rol === 'administrador' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-gray-50'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.rol === 'administrador' ? true : formData.permisos[modulo.key as keyof typeof formData.permisos]}
                    onChange={(e) => {
                      if (formData.rol !== 'administrador') {
                        setFormData({
                          ...formData,
                          permisos: {
                            ...formData.permisos,
                            [modulo.key]: e.target.checked,
                          },
                        });
                      }
                    }}
                    disabled={formData.rol === 'administrador'}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{modulo.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              {editingUser ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
