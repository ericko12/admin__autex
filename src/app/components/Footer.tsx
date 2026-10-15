import { Link } from 'react-router';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import autexLogo from 'figma:asset/e4a51ee4a49c3f2fe023ab4e73b1a904ebde460b.png';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Logo separado */}
        <div className="mb-8">
          <img src={autexLogo} alt="AUTEX" className="h-8" />
        </div>

        {/* Columnas alineadas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Column 1: About */}
          <div>
            <h3 className="font-semibold mb-4">Acerca de Autex</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/terminos-condiciones" className="hover:text-blue-600">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="hover:text-blue-600">
                  ¿Quiénes somos?
                </Link>
              </li>
              <li>
                <a href="https://empleos.apymsa.com.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  Bolsa de trabajo
                </a>
              </li>
              <li>
                <Link to="/avisos-privacidad" className="hover:text-blue-600">
                  Avisos de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h3 className="font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/preguntas-frecuentes" className="hover:text-blue-600">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link to="/facturacion" className="hover:text-blue-600">
                  Facturación
                </Link>
              </li>
              <li>
                <Link to="/garantias-devoluciones" className="hover:text-blue-600">
                  Garantías y devoluciones
                </Link>
              </li>
              <li>
                <Link to="/como-comprar" className="hover:text-blue-600">
                  ¿Cómo comprar en Autex?
                </Link>
              </li>
              <li>
                <Link to="/rastreo-pedido" className="hover:text-blue-600">
                  Rastrea tu pedido
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contáctanos</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>33 3208 4440</li>
              <li>33 1602 5603</li>
              <li>contacto@autex.com.mx</li>
              <li>
                <Link to="/sucursales" className="hover:text-blue-600">
                  Localiza tu tienda
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Downloads */}
          <div>
            <h3 className="font-semibold mb-4">Descargables</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="https://www.apymsa.com.mx/Promociones/Revista/09f76872-3e25-4d15-b3b5-d8f0071269ff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  Revista mensual
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Admin Zone */}
          <div>
            <h3 className="font-semibold mb-4">Zona reservada</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/admin" className="hover:text-blue-600">
                  Administrador
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 mb-4 md:mb-0 text-center md:text-left">
            Derechos reservados AUTEX 2026
          </div>

          {/* Payment methods */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0">
            <div className="text-sm text-gray-600">Métodos de pago</div>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                VISA
              </div>
              <div className="w-10 h-6 bg-blue-400 rounded flex items-center justify-center text-white text-xs">
                AMEX
              </div>
              <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                MC
              </div>
            </div>
          </div>

          {/* Social media */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Síguenos</span>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/523332084440"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 md:bottom-8 right-6 md:right-8 bg-green-500 text-white rounded-full p-3 md:p-4 shadow-lg hover:bg-green-600 transition-colors z-40"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </a>
    </footer>
  );
}