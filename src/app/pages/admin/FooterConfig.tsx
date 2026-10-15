import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface FooterLink {
  id: string;
  nombre: string;
  url: string;
}

interface FooterColumn {
  id: string;
  titulo: string;
  enlaces: FooterLink[];
}

interface RedSocial {
  id: string;
  nombre: string;
  url: string;
}

const mockFooterData = {
  columnas: [
    {
      id: '1',
      titulo: 'Acerca de Autex',
      enlaces: [
        { id: '1-1', nombre: 'Términos y condiciones', url: '/terminos-condiciones' },
        { id: '1-2', nombre: '¿Quiénes somos?', url: '/quienes-somos' },
        { id: '1-3', nombre: 'Bolsa de trabajo', url: 'https://empleos.apymsa.com.mx/' },
      ],
    },
    {
      id: '2',
      titulo: 'Ayuda',
      enlaces: [
        { id: '2-1', nombre: 'Preguntas frecuentes', url: '/preguntas-frecuentes' },
        { id: '2-2', nombre: 'Facturación', url: '/facturacion' },
        { id: '2-3', nombre: 'Garantías y devoluciones', url: '/garantias-devoluciones' },
      ],
    },
  ],
  contacto: {
    telefono1: '33 3208 4440',
    telefono2: '33 1602 5603',
    email: 'contacto@autex.com.mx',
  },
  redes: [
    { id: 'r-1', nombre: 'Facebook', url: '#' },
    { id: 'r-2', nombre: 'Instagram', url: '#' },
    { id: 'r-3', nombre: 'WhatsApp', url: '#' },
  ],
};

export function FooterConfig() {
  const [columnas, setColumnas] = useState<FooterColumn[]>(mockFooterData.columnas);
  const [contacto, setContacto] = useState(mockFooterData.contacto);
  const [redes, setRedes] = useState<RedSocial[]>(mockFooterData.redes);
  const [mensaje, setMensaje] = useState('');

  const agregarEnlace = (columnId: string) => {
    setColumnas(columnas.map(col =>
      col.id === columnId
        ? {
            ...col,
            enlaces: [...col.enlaces, { id: `${columnId}-${Date.now()}`, nombre: '', url: '' }],
          }
        : col
    ));
  };

  const eliminarEnlace = (columnId: string, linkId: string) => {
    setColumnas(columnas.map(col =>
      col.id === columnId
        ? { ...col, enlaces: col.enlaces.filter(link => link.id !== linkId) }
        : col
    ));
  };

  const actualizarEnlace = (columnId: string, linkId: string, field: 'nombre' | 'url', value: string) => {
    setColumnas(columnas.map(col =>
      col.id === columnId
        ? {
            ...col,
            enlaces: col.enlaces.map(link =>
              link.id === linkId ? { ...link, [field]: value } : link
            ),
          }
        : col
    ));
  };

  const agregarRed = () => {
    setRedes([...redes, { id: `r-${Date.now()}`, nombre: '', url: '' }]);
  };

  const eliminarRed = (redId: string) => {
    setRedes(redes.filter(red => red.id !== redId));
  };

  const actualizarRed = (redId: string, field: 'nombre' | 'url', value: string) => {
    setRedes(redes.map(red =>
      red.id === redId ? { ...red, [field]: value } : red
    ));
  };

  const handleGuardar = () => {
    setMensaje('Configuración guardada exitosamente');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Configuración de Footer</h1>
          <p className="text-gray-600">Administra los enlaces y contenido del footer</p>
        </div>
        <button
          onClick={handleGuardar}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          Guardar cambios
        </button>
      </div>

      {mensaje && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {mensaje}
        </div>
      )}

      {/* Columnas de enlaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {columnas.map((columna) => (
          <div key={columna.id} className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">{columna.titulo}</h3>

            <div className="space-y-3">
              {columna.enlaces.map((enlace) => (
                <div key={enlace.id} className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={enlace.nombre}
                      onChange={(e) => actualizarEnlace(columna.id, enlace.id, 'nombre', e.target.value)}
                      placeholder="Nombre del enlace"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                      <input
                        type="text"
                        value={enlace.url}
                        onChange={(e) => actualizarEnlace(columna.id, enlace.id, 'url', e.target.value)}
                        placeholder="/nombre-seccion"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Formato: <span className="font-medium">/nombre-seccion</span> (ej: /terminos-condiciones, /preguntas-frecuentes) o URL completa (ej: https://...)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarEnlace(columna.id, enlace.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors h-fit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => agregarEnlace(columna.id)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar enlace
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Información de contacto */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono 1
            </label>
            <input
              type="text"
              value={contacto.telefono1}
              onChange={(e) => setContacto({ ...contacto, telefono1: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono 2
            </label>
            <input
              type="text"
              value={contacto.telefono2}
              onChange={(e) => setContacto({ ...contacto, telefono2: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={contacto.email}
              onChange={(e) => setContacto({ ...contacto, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Redes sociales</h3>

        <div className="space-y-3">
          {redes.map((red) => (
            <div key={red.id} className="flex gap-2">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={red.nombre}
                  onChange={(e) => actualizarRed(red.id, 'nombre', e.target.value)}
                  placeholder="Nombre de la red social (ej: Facebook, Instagram)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  value={red.url}
                  onChange={(e) => actualizarRed(red.id, 'url', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => eliminarRed(red.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors h-fit"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={agregarRed}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar red social
          </button>
        </div>
      </div>
    </div>
  );
}
