import { useState } from 'react';
import { Plus, Edit, Eye, ToggleLeft, ToggleRight, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';
import { Modal } from '../../components/admin/Modal';

interface Landing {
  id: string;
  nombreInterno: string;
  url: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  productosAsociados: string;
  codigoSalesforce: string;
  activa: boolean;
  fechaCreacion: string;
}

const mockLandings: Landing[] = [
  {
    id: '1',
    nombreInterno: 'Promo Primavera 2026',
    url: '/landing/primavera-2026',
    titulo: 'Promoción Especial de Primavera',
    descripcion: 'Descuentos increíbles en toda la tienda',
    imagenUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800',
    productosAsociados: 'PROD-001, PROD-002, PROD-003',
    codigoSalesforce: '<div>Formulario Salesforce</div>',
    activa: true,
    fechaCreacion: '2024-03-01',
  },
];

export function Landings() {
  const [landings, setLandings] = useState<Landing[]>(mockLandings);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPreviewInModal, setShowPreviewInModal] = useState(false);
  const [selectedLanding, setSelectedLanding] = useState<Landing | null>(null);
  const [formData, setFormData] = useState({
    nombreInterno: '',
    url: '',
    titulo: '',
    descripcion: '',
    imagenUrl: '',
    productosAsociados: '',
    codigoSalesforce: '',
    activa: true,
  });
  const [salesforceValid, setSalesforceValid] = useState<boolean | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    basica: true,
    contenido: true,
    productos: true,
    salesforce: true,
  });
  const [imagenPreview, setImagenPreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  const handleCreate = () => {
    setSelectedLanding(null);
    setFormData({
      nombreInterno: '',
      url: '',
      titulo: '',
      descripcion: '',
      imagenUrl: '',
      productosAsociados: '',
      codigoSalesforce: '',
      activa: true,
    });
    setSalesforceValid(null);
    setShowPreviewInModal(false);
    setImagenPreview('');
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (landing: Landing) => {
    setSelectedLanding(landing);
    setFormData({
      nombreInterno: landing.nombreInterno,
      url: landing.url,
      titulo: landing.titulo,
      descripcion: landing.descripcion,
      imagenUrl: landing.imagenUrl,
      productosAsociados: landing.productosAsociados,
      codigoSalesforce: landing.codigoSalesforce,
      activa: landing.activa,
    });
    setSalesforceValid(landing.codigoSalesforce ? true : null);
    setShowPreviewInModal(false);
    setImagenPreview(landing.imagenUrl);
    setErrors({});
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar formato
    const formatosValidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!formatosValidos.includes(file.type)) {
      setErrors({ ...errors, imagen: 'Formato no válido. Solo se aceptan JPG, JPEG, PNG o WEBP' });
      return;
    }

    // Validar peso (máximo 500KB)
    const pesoMaximo = 500 * 1024;
    if (file.size > pesoMaximo) {
      setErrors({ ...errors, imagen: `El archivo excede el límite de 500KB. Tamaño actual: ${(file.size / 1024).toFixed(0)}KB` });
      return;
    }

    // Limpiar errores previos
    setErrors({ ...errors, imagen: '' });

    // Convertir a base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, imagenUrl: base64String });
      setImagenPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imagenUrl: '' });
    setImagenPreview('');
    setErrors({ ...errors, imagen: '' });
  };

  const validateSalesforceCode = () => {
    // Validación básica de código HTML
    const isValid = formData.codigoSalesforce.trim().includes('<') &&
                    formData.codigoSalesforce.trim().includes('>');
    setSalesforceValid(isValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que la imagen esté cargada
    if (!formData.imagenUrl) {
      setErrors({ ...errors, imagen: 'La imagen principal es requerida' });
      return;
    }

    if (selectedLanding) {
      setLandings(landings.map(l =>
        l.id === selectedLanding.id ? { ...l, ...formData } : l
      ));
    } else {
      const newLanding: Landing = {
        id: String(Date.now()),
        ...formData,
        fechaCreacion: new Date().toISOString().split('T')[0],
      };
      setLandings([...landings, newLanding]);
    }

    setShowModal(false);
  };

  const toggleActive = (id: string) => {
    setLandings(landings.map(l =>
      l.id === id ? { ...l, activa: !l.activa } : l
    ));
  };

  const handlePreview = (landing: Landing) => {
    setSelectedLanding(landing);
    setShowPreview(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Gestión de Landings</h1>
          <p className="text-gray-600">Crea y administra páginas de destino</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Crear landing
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Nombre</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">URL (slug)</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Estatus</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {landings.map((landing) => (
              <tr key={landing.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{landing.nombreInterno}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{landing.url}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    landing.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {landing.activa ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handlePreview(landing)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Vista previa"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(landing)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleActive(landing.id)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title={landing.activa ? 'Desactivar' : 'Activar'}
                    >
                      {landing.activa ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedLanding ? 'Editar landing' : 'Crear nueva landing'}
        maxWidth="4xl"
      >
        <div className="flex gap-6">
          {/* Formulario */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Información básica */}
              <div className="border rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('basica')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold">Información básica</h3>
                  {expandedSections.basica ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.basica && (
                  <div className="p-4 pt-0 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={formData.nombreInterno}
                        onChange={(e) => setFormData({ ...formData, nombreInterno: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL (slug) *
                      </label>
                      <input
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="/landing/nombre-landing"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="activa"
                        checked={formData.activa}
                        onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="activa" className="text-sm font-medium text-gray-700">
                        Landing activa
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="border rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('contenido')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold">Contenido</h3>
                  {expandedSections.contenido ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.contenido && (
                  <div className="p-4 pt-0 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                      </label>
                      <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imagen principal *
                      </label>

                      {!imagenPreview ? (
                        <div>
                          <label
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                              errors.imagen ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center py-4">
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium text-blue-600">Seleccionar imagen</span> o arrastrar aquí
                              </p>
                              <p className="text-xs text-gray-500">JPG, PNG o WEBP • Máximo 500KB</p>
                            </div>
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                          {errors.imagen && (
                            <p className="text-xs text-red-600 mt-1">{errors.imagen}</p>
                          )}
                        </div>
                      ) : (
                        <div className="relative inline-block">
                          <img
                            src={imagenPreview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                            title="Eliminar imagen"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Productos asociados */}
              <div className="border rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('productos')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold">Productos asociados</h3>
                  {expandedSections.productos ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.productos && (
                  <div className="p-4 pt-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Códigos de producto (separados por coma)
                    </label>
                    <textarea
                      value={formData.productosAsociados}
                      onChange={(e) => setFormData({ ...formData, productosAsociados: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={2}
                      placeholder="PROD-001, PROD-002, PROD-003"
                    />
                  </div>
                )}
              </div>

              {/* Formulario Salesforce */}
              <div className="border rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('salesforce')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold">Formulario Salesforce</h3>
                  {expandedSections.salesforce ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.salesforce && (
                  <div className="p-4 pt-0 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código HTML del formulario
                      </label>
                      <textarea
                        value={formData.codigoSalesforce}
                        onChange={(e) => setFormData({ ...formData, codigoSalesforce: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                        rows={4}
                        placeholder="<div>Pega aquí el código HTML de Salesforce</div>"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={validateSalesforceCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Validar código
                    </button>

                    {salesforceValid !== null && (
                      <div className={`p-3 rounded-lg text-sm ${
                        salesforceValid ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {salesforceValid ? '✓ Código válido' : '✗ Código inválido - verifica el formato HTML'}
                      </div>
                    )}

                    {formData.codigoSalesforce && salesforceValid && (
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <p className="text-xs text-gray-600 mb-2">Vista previa del formulario:</p>
                        <div dangerouslySetInnerHTML={{ __html: formData.codigoSalesforce }} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowPreviewInModal(!showPreviewInModal)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {showPreviewInModal ? 'Ocultar' : 'Mostrar'} vista previa
                </button>
                <div className="flex-1" />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedLanding ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          {/* Vista previa en modal */}
          {showPreviewInModal && (
            <div className="w-96 border-l pl-6">
              <h3 className="font-semibold mb-4 text-gray-700">Vista previa</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-4 max-h-[600px] overflow-y-auto">
                {formData.imagenUrl && (
                  <img
                    src={formData.imagenUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                {formData.titulo && (
                  <h2 className="text-lg font-bold">{formData.titulo}</h2>
                )}
                {formData.descripcion && (
                  <p className="text-sm text-gray-600">{formData.descripcion}</p>
                )}
                {formData.productosAsociados && (
                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Productos:</p>
                    <p className="text-xs text-gray-600">{formData.productosAsociados}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Preview Modal Externo */}
      {selectedLanding && (
        <Modal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title={`Vista previa: ${selectedLanding.nombreInterno}`}
          maxWidth="4xl"
        >
          <div>
            {selectedLanding.imagenUrl && (
              <img
                src={selectedLanding.imagenUrl}
                alt={selectedLanding.titulo}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="text-3xl font-bold mb-4">{selectedLanding.titulo}</h1>
            <p className="text-gray-600 text-lg mb-8">{selectedLanding.descripcion}</p>

            {selectedLanding.productosAsociados && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Productos asociados:</h3>
                <p className="text-gray-600">{selectedLanding.productosAsociados}</p>
              </div>
            )}

            {selectedLanding.codigoSalesforce && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-3">Formulario Salesforce:</h3>
                <div dangerouslySetInnerHTML={{ __html: selectedLanding.codigoSalesforce }} />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
