import { Link } from 'react-router';
import { Facebook, Globe, Instagram, Linkedin, MessageCircle, Music2, Youtube } from 'lucide-react';
import autexLogo from 'figma:asset/e4a51ee4a49c3f2fe023ab4e73b1a904ebde460b.png';
import { CONFIG_SOLO_FIJOS, ENLACE_LOCALIZA_TIENDA, useFooter } from '../context/FooterContext';
import type { FooterLink } from '../context/FooterContext';
import { esDestinoInterno, soloDigitos } from '../utils/footerValidation';

/** Enlaces internos: misma pestaña. Externos: pestaña nueva. */
function EnlaceFooter({ enlace }: { enlace: FooterLink }) {
  if (esDestinoInterno(enlace.url)) {
    return (
      <Link to={enlace.url} className="hover:text-blue-600">
        {enlace.nombre}
      </Link>
    );
  }
  return (
    <a href={enlace.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
      {enlace.nombre}
    </a>
  );
}

function IconoRed({ nombre }: { nombre: string }) {
  const clave = nombre.toLowerCase();
  if (clave.includes('facebook')) return <Facebook className="w-5 h-5" />;
  if (clave.includes('instagram')) return <Instagram className="w-5 h-5" />;
  if (clave.includes('tiktok')) return <Music2 className="w-5 h-5" />;
  if (clave.includes('youtube')) return <Youtube className="w-5 h-5" />;
  if (clave.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
  return <Globe className="w-5 h-5" />;
}

function enlaceTelefono(valor: string) {
  const digitos = soloDigitos(valor);
  return digitos.length === 10 ? `tel:+52${digitos}` : `tel:${digitos}`;
}

function enlaceWhatsapp(valor: string) {
  const digitos = soloDigitos(valor);
  return `https://wa.me/${digitos.length === 10 ? `52${digitos}` : digitos}`;
}

export function Footer() {
  const { status, config } = useFooter();
  // Si la consulta falla o aún carga, se muestran solo los elementos fijos.
  const { acerca, ayuda, contacto, redes } = status === 'ready' ? config : CONFIG_SOLO_FIJOS;
  const whatsapp = contacto.whatsapp.trim();

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
              {acerca.map((enlace) => (
                <li key={enlace.id}>
                  <EnlaceFooter enlace={enlace} />
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h3 className="font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {ayuda.map((enlace) => (
                <li key={enlace.id}>
                  <EnlaceFooter enlace={enlace} />
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contáctanos</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {contacto.telefono1.trim() && (
                <li>
                  <a href={enlaceTelefono(contacto.telefono1)} className="hover:text-blue-600">
                    {contacto.telefono1}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a
                    href={enlaceWhatsapp(whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    WhatsApp {whatsapp}
                  </a>
                </li>
              )}
              {contacto.email.trim() && (
                <li>
                  <a href={`mailto:${contacto.email.trim()}`} className="hover:text-blue-600">
                    {contacto.email}
                  </a>
                </li>
              )}
              <li>
                <Link to={ENLACE_LOCALIZA_TIENDA.url} className="hover:text-blue-600">
                  {ENLACE_LOCALIZA_TIENDA.nombre}
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
            {redes.map((red) => (
              <a
                key={red.id}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={red.nombre}
                className="text-gray-600 hover:text-blue-600"
              >
                <IconoRed nombre={red.nombre} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      {whatsapp && (
        <a
          href={enlaceWhatsapp(whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-6 md:bottom-8 right-6 md:right-8 bg-green-500 text-white rounded-full p-3 md:p-4 shadow-lg hover:bg-green-600 transition-colors z-40"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      )}
    </footer>
  );
}
