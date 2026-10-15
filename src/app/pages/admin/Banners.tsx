import { useState } from 'react';
import { Plus, Edit, ToggleLeft, ToggleRight, Trash2, Eye, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Modal } from '../../components/admin/Modal';

interface Banner {
  id: string;
  seccion: string;
  posicion: string;
  fechaInicio: string;
  fechaFin: string;
  tipoDestino: 'cta' | 'detalle-promocion';
  urlDestino: string;
  abrirEnNuevaPestana: boolean;
  imagenDesktop: string;
  imagenMobile: string;
  activo: boolean;
  detallePromocion?: {
    titulo: string;
    descripcion: string;
    urlResultadoBusqueda: string;
    productosAsociados: string;
    codigoSalesforce: string;
    imagenDesktop: string;
    imagenMobile: string;
    activo: boolean;
  };
}

interface Seccion {
  nombre: string;
  posiciones: {
    nombre: string;
    descripcion: string;
  }[];
}

interface DetallePromocion {
  id: string;
  titulo: string;
  descripcion: string;
  urlResultadoBusqueda: string;
  productosAsociados: string;
  codigoSalesforce: string;
  imagenDesktop: string;
  imagenMobile: string;
  activo: boolean;
  fechaCreacion: string;
}

const secciones: Seccion[] = [
  {
    nombre: 'Home',
    posiciones: [
      { nombre: 'Banner Principal', descripcion: 'Banner hero en la parte superior de la página' },
    ]
  },
  {
    nombre: 'Promociones',
    posiciones: [
      { nombre: 'Banner Superior', descripcion: 'Banner principal de la página de promociones' },
      { nombre: 'Banner Grid 1', descripcion: 'Primer banner del grid de promociones' },
      { nombre: 'Banner Grid 2', descripcion: 'Segundo banner del grid de promociones' },
    ]
  },
];

const mockBanners: Banner[] = [
  {
    id: '1',
    seccion: 'Home',
    posicion: 'Banner Principal',
    fechaInicio: '2026-04-01',
    fechaFin: '2026-04-30',
    tipoDestino: 'cta',
    urlDestino: '/promociones',
    abrirEnNuevaPestana: false,
    imagenDesktop: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    imagenMobile: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    activo: true,
  },
];

export function Banners() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [detallesPromocion, setDetallesPromocion] = useState<DetallePromocion[]>([]);
  const [activeTab, setActiveTab] = useState('Home');
  const [showModal, setShowModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [selectedDetallePromocion, setSelectedDetallePromocion] = useState<DetallePromocion | null>(null);
  const [selectedPosicion, setSelectedPosicion] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isCreatingDetalleOnly, setIsCreatingDetalleOnly] = useState(false);
  const [formData, setFormData] = useState({
    posicion: '',
    fechaInicio: '',
    fechaFin: '',
    tipoDestino: 'cta' as 'cta' | 'detalle-promocion',
    urlDestino: '',
    abrirEnNuevaPestana: false,
    imagenDesktop: '',
    imagenMobile: '',
    activo: true,
  });
  const [detallePromocionData, setDetallePromocionData] = useState({
    titulo: '',
    descripcion: '',
    urlResultadoBusqueda: '',
    productosAsociados: '',
    codigoSalesforce: '',
    imagenDesktop: '',
    imagenMobile: '',
    activo: true,
  });
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<Banner | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    contenido: true,
    productos: true,
    imagenes: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmModal, setConfirmModal] = useState<{ type: 'banner' | 'detalle-delete' | 'detalle-inactivar'; id: string } | null>(null);
  const [notifModal, setNotifModal] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, tipo: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar formato
    const formatosPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!formatosPermitidos.includes(file.type)) {
      setErrors({ ...errors, [`imagen${tipo === 'desktop' ? 'Desktop' : 'Mobile'}`]: 'Formato no válido. Solo se permiten JPG, PNG y WEBP' });
      return;
    }

    // Validar peso (500KB = 500 * 1024 bytes)
    const pesoMaximo = 500 * 1024;
    if (file.size > pesoMaximo) {
      setErrors({ ...errors, [`imagen${tipo === 'desktop' ? 'Desktop' : 'Mobile'}`]: `El archivo excede el límite de 500KB. Tamaño actual: ${(file.size / 1024).toFixed(0)}KB` });
      return;
    }

    // Limpiar error si existe
    const newErrors = { ...errors };
    delete newErrors[`imagen${tipo === 'desktop' ? 'Desktop' : 'Mobile'}`];
    setErrors(newErrors);

    // Convertir a base64 para preview y almacenamiento
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (tipo === 'desktop') {
        setFormData({ ...formData, imagenDesktop: base64String });
      } else {
        setFormData({ ...formData, imagenMobile: base64String });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = (posicion: string) => {
    setSelectedBanner(null);
    setSelectedPosicion(posicion);
    setCurrentStep(1);
    setFormData({
      posicion,
      fechaInicio: '',
      fechaFin: '',
      tipoDestino: 'cta',
      urlDestino: '',
      abrirEnNuevaPestana: false,
      imagenDesktop: '',
      imagenMobile: '',
      activo: true,
    });
    setDetallePromocionData({
      titulo: '',
      descripcion: '',
      urlResultadoBusqueda: '',
      productosAsociados: '',
      codigoSalesforce: '',
      imagenDesktop: '',
      imagenMobile: '',
      activo: true,
    });
    setExpandedSections({
      contenido: true,
      productos: true,
      imagenes: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setSelectedPosicion(banner.posicion);
    setCurrentStep(1);
    setIsCreatingDetalleOnly(false);
    setFormData({
      posicion: banner.posicion,
      fechaInicio: banner.fechaInicio,
      fechaFin: banner.fechaFin,
      tipoDestino: banner.tipoDestino,
      urlDestino: banner.urlDestino,
      abrirEnNuevaPestana: banner.abrirEnNuevaPestana,
      imagenDesktop: banner.imagenDesktop,
      imagenMobile: banner.imagenMobile,
      activo: banner.activo,
    });
    setDetallePromocionData(banner.detallePromocion || {
      titulo: '',
      descripcion: '',
      urlResultadoBusqueda: '',
      productosAsociados: '',
      codigoSalesforce: '',
      imagenDesktop: '',
      imagenMobile: '',
      activo: true,
    });
    setExpandedSections({
      contenido: true,
      productos: true,
      imagenes: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleCreateDetallePromocion = () => {
    setIsCreatingDetalleOnly(true);
    setSelectedDetallePromocion(null);
    setSelectedBanner(null);
    setCurrentStep(2);
    setDetallePromocionData({
      titulo: '',
      descripcion: '',
      urlResultadoBusqueda: '',
      productosAsociados: '',
      codigoSalesforce: '',
      imagenDesktop: '',
      imagenMobile: '',
      activo: true,
    });
    setExpandedSections({
      contenido: true,
      productos: true,
      imagenes: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEditDetallePromocion = (detalle: DetallePromocion) => {
    setIsCreatingDetalleOnly(true);
    setSelectedDetallePromocion(detalle);
    setSelectedBanner(null);
    setCurrentStep(2);
    setDetallePromocionData({
      titulo: detalle.titulo,
      descripcion: detalle.descripcion,
      urlResultadoBusqueda: detalle.urlResultadoBusqueda,
      productosAsociados: detalle.productosAsociados,
      codigoSalesforce: detalle.codigoSalesforce,
      imagenDesktop: detalle.imagenDesktop,
      imagenMobile: detalle.imagenMobile,
      activo: detalle.activo,
    });
    setExpandedSections({
      contenido: true,
      productos: true,
      imagenes: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const toggleDetallePromocionActive = (id: string) => {
    const detalle = detallesPromocion.find(d => d.id === id);
    if (detalle?.activo) {
      // Active → Inactive: requires confirmation
      setConfirmModal({ type: 'detalle-inactivar', id });
    } else {
      // Inactive → Active: toggle directly
      setDetallesPromocion(detallesPromocion.map(d =>
        d.id === id ? { ...d, activo: true } : d
      ));
    }
  };

  const deleteDetallePromocion = (id: string) => {
    setConfirmModal({ type: 'detalle-delete', id });
  };

  const handleConfirmDelete = () => {
    if (!confirmModal) return;
    if (confirmModal.type === 'detalle-delete') {
      setDetallesPromocion(detallesPromocion.filter(d => d.id !== confirmModal.id));
      setBanners(banners.map(b =>
        b.id === confirmModal.id ? { ...b, activo: false } : b
      ));
      setConfirmModal(null);
      setNotifModal(true);
    } else if (confirmModal.type === 'detalle-inactivar') {
      setDetallesPromocion(detallesPromocion.map(d =>
        d.id === confirmModal.id ? { ...d, activo: false } : d
      ));
      setBanners(banners.map(b =>
        b.id === confirmModal.id ? { ...b, activo: false } : b
      ));
      setConfirmModal(null);
      setNotifModal(true);
    } else {
      setBanners(banners.filter(b => b.id !== confirmModal.id));
      setConfirmModal(null);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las imágenes estén cargadas
    const newErrors: Record<string, string> = {};
    if (!formData.imagenDesktop) {
      newErrors.imagenDesktop = 'La imagen desktop es requerida';
    }
    if (!formData.imagenMobile) {
      newErrors.imagenMobile = 'La imagen mobile es requerida';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si es CTA, crear/actualizar directamente
    if (formData.tipoDestino === 'cta') {
      handleFinalSubmit();
    } else {
      // Si es detalle de promoción, ir al paso 2
      setCurrentStep(2);
      setErrors({});
    }
  };

  const handleFinalSubmit = () => {
    // Si solo estamos creando un detalle de promoción sin banner
    if (isCreatingDetalleOnly) {
      const detalleId = selectedDetallePromocion?.id || String(Date.now());
      const nuevoDetalle: DetallePromocion = {
        id: detalleId,
        ...detallePromocionData,
        fechaCreacion: selectedDetallePromocion?.fechaCreacion || new Date().toISOString().split('T')[0],
      };

      if (selectedDetallePromocion) {
        setDetallesPromocion(detallesPromocion.map(d =>
          d.id === selectedDetallePromocion.id ? nuevoDetalle : d
        ));
      } else {
        setDetallesPromocion([...detallesPromocion, nuevoDetalle]);
      }

      setShowModal(false);
      setCurrentStep(1);
      setIsCreatingDetalleOnly(false);
      return;
    }

    // Si es un banner con detalle de promoción
    const bannerId = selectedBanner?.id || String(Date.now());
    const bannerData: Banner = {
      id: bannerId,
      seccion: activeTab,
      ...formData,
      detallePromocion: formData.tipoDestino === 'detalle-promocion' ? detallePromocionData : undefined,
    };

    if (selectedBanner) {
      setBanners(banners.map(b =>
        b.id === selectedBanner.id ? bannerData : b
      ));

      // Si tiene detalle de promoción, actualizar también en la lista de detalles
      if (formData.tipoDestino === 'detalle-promocion' && bannerData.detallePromocion) {
        const detalleExistente = detallesPromocion.find(d => d.id === bannerId);
        const nuevoDetalle: DetallePromocion = {
          id: bannerId,
          ...bannerData.detallePromocion,
          fechaCreacion: detalleExistente?.fechaCreacion || new Date().toISOString().split('T')[0],
        };

        if (detalleExistente) {
          setDetallesPromocion(detallesPromocion.map(d =>
            d.id === bannerId ? nuevoDetalle : d
          ));
        } else {
          setDetallesPromocion([...detallesPromocion, nuevoDetalle]);
        }
      }
    } else {
      setBanners([...banners, bannerData]);

      // Si es un nuevo banner con detalle de promoción, agregarlo también a detalles
      if (formData.tipoDestino === 'detalle-promocion' && bannerData.detallePromocion) {
        const nuevoDetalle: DetallePromocion = {
          id: bannerId,
          ...bannerData.detallePromocion,
          fechaCreacion: new Date().toISOString().split('T')[0],
        };
        setDetallesPromocion([...detallesPromocion, nuevoDetalle]);
      }
    }

    setShowModal(false);
    setCurrentStep(1);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos del detalle de promoción
    const newErrors: Record<string, string> = {};
    if (!detallePromocionData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    }
    if (!detallePromocionData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    if (!detallePromocionData.imagenDesktop) {
      newErrors.imagenDesktopDetalle = 'La imagen desktop es requerida';
    }
    if (!detallePromocionData.imagenMobile) {
      newErrors.imagenMobileDetalle = 'La imagen mobile es requerida';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    handleFinalSubmit();
  };

  const handleShowPreview = () => {
    const previewBanner: Banner = {
      id: selectedBanner?.id || 'preview',
      seccion: activeTab,
      ...formData,
      detallePromocion: formData.tipoDestino === 'detalle-promocion' ? detallePromocionData : undefined,
    };
    setPreviewData(previewBanner);
    setShowPreview(true);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  const toggleActive = (id: string) => {
    setBanners(banners.map(b =>
      b.id === id ? { ...b, activo: !b.activo } : b
    ));
  };

  const deleteBanner = (id: string) => {
    setConfirmModal({ type: 'banner', id });
  };

  const isVigente = (banner: Banner) => {
    const now = new Date();
    const inicio = new Date(banner.fechaInicio);
    const fin = new Date(banner.fechaFin);
    return now >= inicio && now <= fin;
  };

  const getBannersBySeccionAndPosicion = (seccion: string, posicion: string) => {
    return banners.filter(b => b.seccion === seccion && b.posicion === posicion);
  };

  const currentSeccion = secciones.find(s => s.nombre === activeTab);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Gestión de Banners</h1>
        <p className="text-gray-600">Administra los banners por sección y posición</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex gap-4 overflow-x-auto">
          {secciones.map((seccion) => (
            <button
              key={seccion.nombre}
              onClick={() => setActiveTab(seccion.nombre)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === seccion.nombre
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {seccion.nombre}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('Detalle Promoción')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'Detalle Promoción'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Detalle Promoción
          </button>
        </div>
      </div>

      {/* Contenido del tab Detalle Promoción */}
      {activeTab === 'Detalle Promoción' ? (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Páginas de detalle de promoción</h3>
              <p className="text-sm text-gray-600 mt-1">Crea y administra páginas de destino</p>
            </div>
            {/*<button
              onClick={handleCreateDetallePromocion}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Crear detalle
            </button>*/}
          </div>

          {detallesPromocion.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm bg-gray-50 rounded-lg">
              No hay detalles de promoción configurados
            </div>
          ) : (
            <div className="overflow-hidden border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Nombre</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Estatus</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Fecha</th>
                    <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {detallesPromocion.map((detalle) => (
                    <tr key={detalle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={detalle.imagenDesktop}
                            alt={detalle.titulo}
                            className="w-16 h-10 object-cover rounded"
                          />
                          <span className="text-sm font-medium">{detalle.titulo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          detalle.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {detalle.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(detalle.fechaCreacion).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              const previewBanner: Banner = {
                                id: detalle.id,
                                seccion: 'Detalle Promoción',
                                posicion: '',
                                fechaInicio: '',
                                fechaFin: '',
                                tipoDestino: 'detalle-promocion',
                                urlDestino: '',
                                imagenDesktop: '',
                                imagenMobile: '',
                                activo: detalle.activo,
                                detallePromocion: detalle,
                              };
                              setPreviewData(previewBanner);
                              setShowPreview(true);
                            }}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                            title="Previsualizar"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditDetallePromocion(detalle)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {detalle.urlResultadoBusqueda && (
                            <button
                              onClick={() => window.open(detalle.urlResultadoBusqueda, '_blank')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Abrir URL"
                            >
                              <LinkIcon className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => toggleDetallePromocionActive(detalle.id)}
                            className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                            title={detalle.activo ? 'Desactivar' : 'Activar'}
                          >
                            {detalle.activo ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => deleteDetallePromocion(detalle.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Posiciones de la sección activa */
        <div className="space-y-6">
          {currentSeccion?.posiciones.map((posicion) => {
          const bannersEnPosicion = getBannersBySeccionAndPosicion(activeTab, posicion.nombre);

         return (
            <div key={posicion.nombre} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{posicion.nombre}</h3>
                  <p className="text-sm text-gray-600 mt-1">{posicion.descripcion}</p>
                </div>
                <button
                  onClick={() => handleCreate(posicion.nombre)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Agregar banner
                </button>
              </div>

              {bannersEnPosicion.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm bg-gray-50 rounded-lg">
                  No hay banners configurados para esta posición
                </div>
              ) : (
                <div className="space-y-3">
                  {bannersEnPosicion.map((banner) => (
                    <div
                      key={banner.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex gap-4">
                        {/* Preview */}
                        <div className="flex-shrink-0">
                          <img
                            src={banner.imagenDesktop}
                            alt="Preview"
                            className="w-32 h-20 object-cover rounded"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium text-sm mb-1">
                                {banner.tipoDestino === 'detalle-promocion' && banner.detallePromocion?.titulo
                                  ? banner.detallePromocion.titulo
                                  : banner.urlDestino}
                              </div>
                              <div className="text-xs text-gray-600">
                                Vigencia: {new Date(banner.fechaInicio).toLocaleDateString('es-MX')} - {new Date(banner.fechaFin).toLocaleDateString('es-MX')}
                                {isVigente(banner) && (
                                  <span className="ml-2 text-green-600 font-medium">(Vigente)</span>
                                )}
                              </div>
                              {banner.tipoDestino === 'cta' && (
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {banner.abrirEnNuevaPestana ? 'Abre en nueva pestaña' : 'Resultado de búsqueda'}
                                </div>
                              )}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              banner.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {banner.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-3">
                            {banner.tipoDestino === 'detalle-promocion' && (
                              <button
                                onClick={() => {
                                  setPreviewData(banner);
                                  setShowPreview(true);
                                }}
                                className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                                title="Previsualizar"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleEdit(banner)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {banner.tipoDestino === 'detalle-promocion' && banner.detallePromocion?.urlResultadoBusqueda && (
                              <button
                                onClick={() => window.open(banner.detallePromocion!.urlResultadoBusqueda, '_blank')}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Abrir URL"
                              >
                                <LinkIcon className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => toggleActive(banner.id)}
                              className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                              title={banner.activo ? 'Desactivar' : 'Activar'}
                            >
                              {banner.activo ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => deleteBanner(banner.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div> 
          );
        })}
        </div>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentStep(1);
          setIsCreatingDetalleOnly(false);
        }}
        title={
          isCreatingDetalleOnly
            ? (selectedDetallePromocion ? 'Editar Detalle de Promoción' : 'Crear Detalle de Promoción')
            : (currentStep === 1
                ? (selectedBanner ? 'Editar banner' : `Crear banner - ${selectedPosicion}`)
                : 'Paso 2: Detalle de promoción')
        }
        maxWidth="2xl"
      >
        {!isCreatingDetalleOnly && currentStep === 1 ? (
          <form onSubmit={handleStep1Submit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <strong>Sección:</strong> {activeTab} - <strong>Posición:</strong> {selectedPosicion}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha inicio *
              </label>
              <input
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha fin *
              </label>
              <input
                type="date"
                value={formData.fechaFin}
                onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de destino *
            </label>
            <select
              value={formData.tipoDestino}
              onChange={(e) => setFormData({ ...formData, tipoDestino: e.target.value as 'cta' | 'detalle-promocion', urlDestino: '' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cta">CTA de redireccionamiento</option>
              <option value="detalle-promocion">Detalle de promoción</option>
            </select>
          </div>

          {formData.tipoDestino === 'cta' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL destino *
                </label>
                <input
                  type="text"
                  value={formData.urlDestino}
                  onChange={(e) => setFormData({ ...formData, urlDestino: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/promociones"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen desktop *
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
              errors.imagenDesktop ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => handleFileChange(e, 'desktop')}
                className="hidden"
                id="imageDesktop"
              />
              <label
                htmlFor="imageDesktop"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Seleccionar imagen
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG o WEBP • Máximo 500KB
              </p>
            </div>
            {errors.imagenDesktop && (
              <p className="text-xs text-red-600 mt-1">{errors.imagenDesktop}</p>
            )}
            {formData.imagenDesktop && (
              <div className="mt-3 relative">
                <img src={formData.imagenDesktop} alt="Preview desktop" className="w-full h-32 object-cover rounded border" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imagenDesktop: '' })}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen mobile *
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
              errors.imagenMobile ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => handleFileChange(e, 'mobile')}
                className="hidden"
                id="imageMobile"
              />
              <label
                htmlFor="imageMobile"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Seleccionar imagen
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG o WEBP • Máximo 500KB
              </p>
            </div>
            {errors.imagenMobile && (
              <p className="text-xs text-red-600 mt-1">{errors.imagenMobile}</p>
            )}
            {formData.imagenMobile && (
              <div className="mt-3 relative inline-block">
                <img src={formData.imagenMobile} alt="Preview mobile" className="w-48 h-32 object-cover rounded border" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imagenMobile: '' })}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activo"
              checked={formData.activo}
              onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="activo" className="text-sm font-medium text-gray-700">
              Banner activo
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {formData.tipoDestino === 'detalle-promocion' ? 'Continuar' : (selectedBanner ? 'Actualizar' : 'Crear')}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setCurrentStep(1);
              }}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
        ) : (isCreatingDetalleOnly || currentStep === 2) ? (
          <form onSubmit={handleStep2Submit} className="space-y-4">
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
                      value={detallePromocionData.titulo}
                      onChange={(e) => setDetallePromocionData({ ...detallePromocionData, titulo: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                        errors.titulo ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ingresa título"
                    />
                    {errors.titulo && <p className="text-xs text-red-600 mt-1">{errors.titulo}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      value={detallePromocionData.descripcion}
                      onChange={(e) => setDetallePromocionData({ ...detallePromocionData, descripcion: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                        errors.descripcion ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={3}
                      placeholder="Ingresa descripción"
                    />
                    {errors.descripcion && <p className="text-xs text-red-600 mt-1">{errors.descripcion}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL resultado de búsqueda
                    </label>
                    <input
                      type="text"
                      value={detallePromocionData.urlResultadoBusqueda}
                      onChange={(e) => setDetallePromocionData({ ...detallePromocionData, urlResultadoBusqueda: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="https://www.autex.com.mx"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Al ingresar url se activará un botón CTA para re direccionar al usuario a los productos filtrados
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Imágenes */}
            <div className="border rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection('imagenes')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold">Imágenes</h3>
                {expandedSections.imagenes ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSections.imagenes && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen Desktop *
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.imagenDesktopDetalle ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const formatosPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                          if (!formatosPermitidos.includes(file.type)) {
                            setErrors({ ...errors, imagenDesktopDetalle: 'Formato no válido. Solo se permiten JPG, PNG y WEBP' });
                            return;
                          }

                          const pesoMaximo = 500 * 1024;
                          if (file.size > pesoMaximo) {
                            setErrors({ ...errors, imagenDesktopDetalle: `El archivo excede el límite de 500KB. Tamaño actual: ${(file.size / 1024).toFixed(0)}KB` });
                            return;
                          }

                          const newErrors = { ...errors };
                          delete newErrors.imagenDesktopDetalle;
                          setErrors(newErrors);

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            setDetallePromocionData({ ...detallePromocionData, imagenDesktop: base64String });
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="hidden"
                        id="imagenDesktopDetalle"
                      />
                      <label
                        htmlFor="imagenDesktopDetalle"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Seleccionar imagen
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        JPG, PNG o WEBP • Máximo 500KB
                      </p>
                    </div>
                    {errors.imagenDesktopDetalle && (
                      <p className="text-xs text-red-600 mt-1">{errors.imagenDesktopDetalle}</p>
                    )}
                    {detallePromocionData.imagenDesktop && (
                      <div className="mt-3 relative">
                        <img src={detallePromocionData.imagenDesktop} alt="Preview desktop" className="w-full h-32 object-cover rounded border" />
                        <button
                          type="button"
                          onClick={() => setDetallePromocionData({ ...detallePromocionData, imagenDesktop: '' })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen mobile *
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.imagenMobileDetalle ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const formatosPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                          if (!formatosPermitidos.includes(file.type)) {
                            setErrors({ ...errors, imagenMobileDetalle: 'Formato no válido. Solo se permiten JPG, PNG y WEBP' });
                            return;
                          }

                          const pesoMaximo = 500 * 1024;
                          if (file.size > pesoMaximo) {
                            setErrors({ ...errors, imagenMobileDetalle: `El archivo excede el límite de 500KB. Tamaño actual: ${(file.size / 1024).toFixed(0)}KB` });
                            return;
                          }

                          const newErrors = { ...errors };
                          delete newErrors.imagenMobileDetalle;
                          setErrors(newErrors);

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            setDetallePromocionData({ ...detallePromocionData, imagenMobile: base64String });
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="hidden"
                        id="imagenMobileDetalle"
                      />
                      <label
                        htmlFor="imagenMobileDetalle"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Seleccionar imagen
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        JPG, PNG o WEBP • Máximo 500KB
                      </p>
                    </div>
                    {errors.imagenMobileDetalle && (
                      <p className="text-xs text-red-600 mt-1">{errors.imagenMobileDetalle}</p>
                    )}
                    {detallePromocionData.imagenMobile && (
                      <div className="mt-3 relative inline-block">
                        <img src={detallePromocionData.imagenMobile} alt="Preview mobile" className="w-48 h-32 object-cover rounded border" />
                        <button
                          type="button"
                          onClick={() => setDetallePromocionData({ ...detallePromocionData, imagenMobile: '' })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Checkbox activo */}
            <div className="flex items-center justify-end gap-2">
              <input
                type="checkbox"
                id="detalleActivo"
                checked={detallePromocionData.activo}
                onChange={(e) => setDetallePromocionData({ ...detallePromocionData, activo: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="detalleActivo" className="text-sm font-medium text-gray-700">
                Detalle promoción activo
              </label>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleShowPreview}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Mostrar vista previa
              </button>
              <div className="flex-1" />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {selectedBanner || selectedDetallePromocion ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setCurrentStep(1);
                  setIsCreatingDetalleOnly(false);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : null}
      </Modal>

      {/* Modal de Confirmación de Eliminación / Inactivación */}
      <Modal
        isOpen={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title={
          confirmModal?.type === 'detalle-delete'
            ? 'Eliminar detalle de promoción'
            : confirmModal?.type === 'detalle-inactivar'
            ? 'Inactivar detalle de promoción'
            : 'Eliminar banner'
        }
        maxWidth="sm"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {confirmModal?.type === 'detalle-delete'
                  ? 'Esta acción eliminará permanentemente el detalle de promoción. El banner asociado quedará deshabilitado. No podrás deshacer esta acción.'
                  : confirmModal?.type === 'detalle-inactivar'
                  ? 'Esta acción inactivará el detalle de promoción, deshabilitará el banner asociado y ya no se vera publicado.'
                  : 'Esta acción eliminará permanentemente el banner seleccionado. No podrás deshacer esta acción.'}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setConfirmModal(null)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              {confirmModal?.type === 'detalle-inactivar' ? 'Confirmar' : 'Eliminar'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Notificación — banner deshabilitado */}
      <Modal
        isOpen={notifModal}
        onClose={() => setNotifModal(false)}
        title="Banner deshabilitado"
        maxWidth="sm"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <ToggleLeft className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                el banner del home /Promoción ha quedado deshabilitado
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setNotifModal(false)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Aceptar
            </button>
          </div>
        </div>
      </Modal>

      {previewData && (
        <Modal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title="Previsualización detalle de promoción"
          maxWidth="3xl"
        >
          <div className="space-y-6">
            {/* Banner */}
            {previewData.detallePromocion?.imagenDesktop && (
              <div className="relative w-full">
                <img
                  src={previewData.detallePromocion.imagenDesktop}
                  alt="Banner promoción"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Título y Descripción */}
            {previewData.detallePromocion?.titulo && (
              <div>
                <h2 className="text-2xl font-bold mb-2">{previewData.detallePromocion.titulo}</h2>
                {previewData.detallePromocion.descripcion && (
                  <p className="text-gray-700">{previewData.detallePromocion.descripcion}</p>
                )}
              </div>
            )}

            {/* Productos en promoción */}
            {previewData.detallePromocion?.productosAsociados && (
              <div>
                <h3 className="font-semibold mb-2">Productos en promoción</h3>
                <p className="text-sm text-gray-600">{previewData.detallePromocion.productosAsociados}</p>
              </div>
            )}

            {/* Botón CTA si hay URL */}
            {previewData.detallePromocion?.urlResultadoBusqueda && (
              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Ver Productos en Promoción
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
