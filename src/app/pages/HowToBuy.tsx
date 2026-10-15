import { Link } from 'react-router';
import { Search, ShoppingCart, CreditCard, PackageCheck } from 'lucide-react';
import img1 from '../../imports/1_busqueda.jpeg';
import img2 from '../../imports/2_carrito.jpeg';
import img3 from '../../imports/3_pago.jpeg';
import img4 from '../../imports/4_entrega.jpeg';

const steps = [
  {
    number: 1,
    title: 'Busca el producto que necesitas',
    description: 'Ingresa los detalles de tu vehículo o el nombre de la pieza. Nuestro buscador te ofrecerá resultados precisos según la compatibilidad.',
    icon: Search,
    image: img1,
  },
  {
    number: 2,
    title: 'Agrega productos a tu carrito',
    description: 'Agrega las piezas que necesitas y ajusta cantidades cuando quieras. Puedes seguir navegando el catálogo; tu carrito te espera.',
    icon: ShoppingCart,
    image: img2,
  },
  {
    number: 3,
    title: 'Paga con confianza',
    description: 'Proporciona tus datos de envío y selecciona el método de pago que prefieras. Tu compra se realiza de manera cifrada y siempre segura.',
    icon: CreditCard,
    image: img3,
  },
  {
    number: 4,
    title: 'Rastrea y recibe tu pedido',
    description: 'Verifica el estado de tu pedido en tiempo real. Recibe tu pedido de 3 a 5 días hábiles, o si lo prefieres, puedes recogerlo en cualquiera de nuestras sucursales.',
    icon: PackageCheck,
    image: img4,
  },
];

export function HowToBuy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">← Volver</Link>
            <span>|</span>
            <span className="text-blue-600">¿Cómo comprar en Autex?</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1E3A8A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-medium mb-4">Compra en Autex fácil y seguro</h1>
          <p className="text-xl text-blue-100">
            Sin adivinar compatibilidad, sin preocupaciones. Así funciona comprar refacciones originales en Autex, de principio a fin.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.number}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-semibold leading-tight">{step.title}</h2>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Beneficios */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Beneficios de comprar en AUTEX</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Productos originales y compatibles</h3>
              <p className="text-gray-600 text-sm">Todos nuestros artículos son originales y cuentan con garantía directa de fabricante.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Entrega rápida y rastreable</h3>
              <p className="text-gray-600 text-sm">Recibe tu pedido de 3 a 5 días hábiles o recoge en cualquiera de nuestras sucursales.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Pago 100% seguro</h3>
              <p className="text-gray-600 text-sm">Tus datos están protegidos con tecnología de encriptación de última generación.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block bg-[#1E3A8A] text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Comenzar a comprar
          </Link>
        </div>

        {/* FAQs */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Preguntas frecuentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">¿Puedo cancelar mi pedido?</h3>
              <p className="text-gray-700">Sí. Puedes cancelar tu pedido siempre que aún no haya sido preparado o enviado. Si necesitas hacerlo, comunícate con nuestro equipo de atención al cliente lo antes posible para revisar el estatus de tu compra.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">¿Cómo puedo obtener la factura de mi compra?</h3>
              <p className="text-gray-700">Es muy sencillo. Ingresa al módulo de Facturación desde tu cuenta, captura los datos fiscales solicitados y descarga tu factura electrónica en minutos.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">¿Qué hago si recibo un producto dañado o incorrecto?</h3>
              <p className="text-gray-700">Todos nuestros productos cuentan con 90 días de garantía. Si tu pedido llegó dañado, incompleto o recibiste una pieza diferente a la solicitada, contáctanos de inmediato para ayudarte con el proceso de cambio o devolución.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">¿Autex cuenta con sucursales físicas?</h3>
              <p className="text-gray-700">Sí. Contamos con más de 100 sucursales en todo México. Visita la sección{' '}
                <Link to="/sucursales" className="text-blue-600 hover:underline">Sucursales</Link>{' '}
                para encontrar la ubicación más cercana y consultar sus horarios de atención.
              </p>
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-4">¿Necesitas ayuda?</h3>
          <p className="text-gray-700 mb-6">Nuestro equipo está disponible para ayudarte de lunes a viernes de 9:00 a 18:00 hrs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:3332084440" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Llamar: 33 3208 4440
            </a>
            <a href="https://wa.me/523332084440" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
