import { Link, useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router';
import { ChevronRight } from 'lucide-react';

interface PromoData {
  title: string;
  description: string;
  terms: string[];
  category: string;
}

const promoBases: Record<number, PromoData> = {
  1: {
    title: 'Promoción Tecnofuel — Sistema de Combustible',
    description:
      'Aprovecha descuentos especiales en toda la línea de productos Tecnofuel. Obtén hasta un 25% de descuento en bombas de gasolina, inyectores y filtros de combustible. Válido del 1 al 30 de abril de 2026.',
    terms: [
      'Descuento aplicable en productos seleccionados.',
      'No acumulable con otras promociones.',
      'Stock limitado.',
      'Válido hasta agotar existencias.',
    ],
    category: 'fuel-injection',
  },
  2: {
    title: 'Promoción Carfan — Refrigeración',
    description:
      'Equipa tu taller con lo mejor en sistemas de refrigeración. Descuentos del 20% en ventiladores, radiadores y termostatos Carfan. Promoción exclusiva para profesionales del sector automotriz.',
    terms: [
      'Válido para compras mayores a $1,000 MXN.',
      'Envío gratis en pedidos superiores a $2,500 MXN.',
      'Promoción válida por tiempo limitado.',
      'Consulta disponibilidad por sucursal.',
    ],
    category: 'fuel-injection',
  },
  3: {
    title: 'Promoción Juls Carman — Herramientas',
    description:
      'Renueva tu equipo de trabajo con las mejores herramientas profesionales. Hasta 30% de descuento en kits de herramientas, llaves, dados y equipos especializados Juls Carman.',
    terms: [
      'Descuentos en productos seleccionados.',
      'Garantía extendida en herramientas eléctricas.',
      'Financiamiento disponible.',
      'Válido en compras de contado y crédito.',
    ],
    category: 'fuel-injection',
  },
  4: {
    title: 'Promoción Reiden — Sistema Eléctrico',
    description:
      'Oferta especial en componentes eléctricos automotrices. 20% de descuento en alternadores, arrancadores, baterías y cables Reiden. Instalación gratuita en sucursales seleccionadas.',
    terms: [
      'Instalación gratuita en sucursales participantes.',
      'Descuento no aplicable a productos en oferta previa.',
      'Consulta modelos compatibles.',
      'Válido durante todo el mes.',
    ],
    category: 'fuel-injection',
  },
  5: {
    title: 'Promoción Juls Carman — Herramientas Profesionales',
    description:
      'Gran venta de herramientas profesionales para talleres automotrices. Descuentos de hasta 35% en sets completos, herramientas neumáticas y equipos de diagnóstico Juls Carman.',
    terms: [
      'Descuentos en compras al mayoreo.',
      'Financiamiento a 6 meses sin intereses.',
      'Garantía de satisfacción o devolución.',
      'Capacitación gratuita en uso de herramientas especializadas.',
    ],
    category: 'fuel-injection',
  },
  6: {
    title: 'Promoción Bresser — Iluminación',
    description:
      'Ilumina el camino con tecnología LED de última generación. 15% de descuento en faros, luces auxiliares y sistemas de iluminación Bresser. Mejora la visibilidad y seguridad de tu vehículo.',
    terms: [
      'Promoción aplicable en toda la gama LED.',
      'Instalación por técnicos certificados disponible.',
      'Garantía de 2 años en productos LED.',
      'Consulta compatibilidad vehicular.',
    ],
    category: 'fuel-injection',
  },
  7: {
    title: 'Promoción Acosa — Suspensión y Frenos',
    description:
      'Seguridad garantizada con componentes de primera calidad. 25% de descuento en amortiguadores, balatas, discos y pastillas de freno Acosa. Instalación profesional disponible.',
    terms: [
      'Válido en compras de sistemas completos.',
      'Inspección gratuita de suspensión.',
      'Envío gratis en pedidos mayores a $3,000 MXN.',
      'Stock limitado según modelo.',
    ],
    category: 'fuel-injection',
  },
  8: {
    title: 'Promoción Star — Filtros y Lubricantes',
    description:
      'Mantenimiento premium para tu vehículo. 20% de descuento en filtros de aire, aceite, combustible y línea completa de lubricantes Star. Servicio de cambio de aceite express disponible.',
    terms: [
      'Promoción en productos de línea premium.',
      'Servicio express sin cita previa.',
      'Acumula puntos de lealtad.',
      'Válido en todas las sucursales.',
    ],
    category: 'fuel-injection',
  },
  9: {
    title: 'Apymsa Mega Sale — Promociones Activas',
    description:
      '¡Aprovecha nuestro mega evento de promociones! Descuentos de hasta 40% en miles de productos de todas las categorías: eléctricos, suspensión, frenos, herramientas y más. La mejor oportunidad del año para equipar tu taller.',
    terms: [
      'Válido en compras online y en sucursales.',
      'Descuentos aplicables a productos participantes.',
      'Envío gratis en compras mayores a $1,500 MXN.',
      'Promoción válida del 1 al 30 de abril 2026.',
      'Consulta el catálogo completo en tienda.',
    ],
    category: 'fuel-injection',
  },
};

export function PromocionDetalle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const promoId = Number(id);
  const { image, alt } = (location.state as { image?: string; alt?: string }) || {};
  const promoData = promoBases[promoId] || promoBases[1];

  if (!image) {
    navigate('/promociones');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500" aria-label="Ruta de navegación">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link to="/promociones" className="hover:text-blue-600 transition-colors">Promociones</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-gray-800 font-medium truncate max-w-[200px] md:max-w-none">
              Detalle de promoción
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-4 py-8 space-y-8">

        {/* Banner principal */}
        <div className="w-full overflow-hidden rounded-xl shadow-md">
          <img
            src={image}
            alt={alt || 'Banner de promoción'}
            className="w-full h-auto max-h-[480px] object-cover"
          />
        </div>

        {/* Información de la promoción */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
            {promoData.title}
          </h1>

          <p className="text-gray-700 leading-relaxed mb-8">
            {promoData.description}
          </p>

          {/* Bases y condiciones */}
          <div className="border-t pt-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bases y condiciones</h2>
            <ul className="space-y-2.5">
              {promoData.terms.map((term, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A8A] flex-shrink-0" />
                  {term}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="border-t pt-6 flex justify-end">
            <button
              onClick={() => navigate(`/busqueda/${promoData.category}`)}
              className="bg-[#1E3A8A] hover:bg-blue-900 active:bg-blue-950 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ver productos en promoción
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
