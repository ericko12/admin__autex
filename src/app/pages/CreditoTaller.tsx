import { Link } from 'react-router';
import { TrendingUp, Tag, HeadphonesIcon, ShieldCheck } from 'lucide-react';
import tallerBanner from 'figma:asset/799830fd75f488532097c750c3552f4d4472422e.png';

export function CreditoTaller() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Línea de crédito',
      description: 'Tu límite de crédito va creciendo con tu historial',
    },
    {
      icon: Tag,
      title: 'Descuentos',
      description: 'Promociones y descuentos exclusivos para tu negocio',
    },
    {
      icon: HeadphonesIcon,
      title: 'Atención personalizada',
      description: 'Asesores expertos y visitas directas para resolver tus dudas',
    },
    {
      icon: ShieldCheck,
      title: 'Garantía',
      description: 'Respaldamos tu trabajo con productos de marcas confiables',
    },
  ];

  const requirements = [
    'Identificación oficial vigente',
    'Comprobante de domicilio no mayor a 3 meses',
    'RFC activo',
    'Acta constitutiva de la empresa o alta en Hacienda',
    'Estados de cuenta bancarios de los últimos 3 meses',
    'Referencias comerciales',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">← Volver</Link>
            <span>|</span>
            <span className="text-blue-600">Crédito para tu taller</span>
          </div>
        </div>
      </div>

      {/* Hero section with banner */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <img
          src={tallerBanner}
          alt="Taller automotriz"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">
              ¡CONVIÉRTETE EN CLIENTE Y APROVECHA BENEFICIOS EXCLUSIVOS!
            </h1>
            {/*<p className="text-xl text-white mb-8">
              Ofrecemos soluciones para tu negocio. Contamos con presencia y asesoramiento especializado en todo el país, además de un portafolio de más de 20,000 productos que cubren las necesidades del parque vehicular.
            </p>
            <button className="bg-red-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg">
              Comunicate con un asesor
            </button>*/}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">
              Beneficios de ser cliente AUTEX
            </h2>
            {/*<p className="text-gray-600 max-w-2xl mx-auto">
              Tu límite de crédito va creciendo con tu historial
            </p>*/}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

 
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-medium text-white mb-4">
            Comunicate con un asesor
          </h2>
          <p className="text-xl text-white mb-8">
            Ofrecemos soluciones para tu negocio. Contamos con presencia y asesoramiento especializado en todo el país, además de un portafolio de más de 20,000 productos que cubren las necesidades del parque vehicular.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Contactanos
            </button>
            <a
              href="tel:3332084440"
              className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              WhatsApp: 33 1602 5603
            </a>
          </div>
        </div>
      </section>

     
    </div>
  );
}