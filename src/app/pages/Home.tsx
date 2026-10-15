import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, X, Download, Printer } from "lucide-react";
import imgCargaArranque from "../../imports/Catergotias-Carga-arranque.jpg";
import imgElectricos from "../../imports/Catergotias-Electrico.jpg";
import imgFuelInjection from "../../imports/Catergotias-Fuel-injection.jpg";
import imgIluminacion from "../../imports/Catergotias-iluminacion.jpg";
import imgHerramientas from "../../imports/Catergotias-herramientas.jpg";
import imgMotopartes from "../../imports/Catergotias-motopartes.jpg";
import imgHeavyDuty from "../../imports/Catergotias-heavy-duty.jpg";
import pdfRevista from "../../imports/Autoexpertos_julio_2.pdf";
import iconEnvio from "../../imports/Envio_gratis.svg";
import iconDevoluciones from "../../imports/Devoluciones.svg";
import iconGarantia from "../../imports/90_dias_de_garantia.svg";
import promoBanner1 from "../../imports/Web-Julio-1920x600-1.jpg";
import promoBanner2 from "../../imports/Web-Julio-1920x600-2.jpg";
import promoBanner3 from "../../imports/Web-Julio-1920x600-3.jpg";
import promoBanner5 from "../../imports/Web-Julio-1920x600-5.jpg";
import brand02 from "../../imports/02_Tecnofuel.jpg";
import brand03 from "../../imports/03_Bresser.jpg";
import brand04 from "../../imports/04_Carfan.jpg";
import brand05 from "../../imports/05_Star.jpg";
import brand06 from "../../imports/06_Dynamic.jpg";
import brand07 from "../../imports/07_Acosa.jpg";
import brand08 from "../../imports/08_Juls_Carman.jpg";
import brand09 from "../../imports/09_Verze.jpg";
import brand10 from "../../imports/10_Weischler.jpg";
import brand11 from "../../imports/11_Reiden.jpg";

const specialties = [
  {
    id: "carga-arranque",
    name: "CARGA Y ARRANQUE",
    img: imgCargaArranque,
  },
  { id: "electricos", name: "ELÉCTRICO", img: imgElectricos },
  {
    id: "fuel-injection",
    name: "FUEL INJECTION",
    img: imgFuelInjection,
  },
  {
    id: "iluminacion-cables",
    name: "ILUMINACIÓN Y CABLE",
    img: imgIluminacion,
  },
  {
    id: "herramientas",
    name: "HERRAMIENTAS",
    img: imgHerramientas,
  },
  { id: "motopartes", name: "MOTOPARTES", img: imgMotopartes },
  { id: "heavy-duty", name: "HEAVY DUTY", img: imgHeavyDuty },
];

type HomeBannerDestino =
  | { tipo: 'detalleProducto'; url: string }
  | { tipo: 'resultadoBusqueda'; url: string };

const promoBanners: { src: string; alt: string; destino: HomeBannerDestino }[] = [
  { src: promoBanner1, alt: 'Banner promoción 1', destino: { tipo: 'detalleProducto',    url: '/busqueda/carga-arranque' } },
  { src: promoBanner2, alt: 'Banner promoción 2', destino: { tipo: 'detalleProducto',    url: '/busqueda/fuel-injection' } },
  { src: promoBanner3, alt: 'Banner promoción 3', destino: { tipo: 'resultadoBusqueda',  url: '/busqueda/electricos' } },
  { src: promoBanner5, alt: 'Banner promoción 4', destino: { tipo: 'resultadoBusqueda',  url: '/busqueda/herramientas' } },
];

const brandGroups = [
  [
    { id: "tecnofuel", name: "Tecnofuel", logo: brand02 },
    { id: "bresser", name: "Bresser", logo: brand03 },
    { id: "carfan", name: "Carfan", logo: brand04 },
    { id: "star", name: "Star", logo: brand05 },
    { id: "dynamic", name: "Dynamic", logo: brand06 },
  ],
  [
    { id: "acosa", name: "Acosa", logo: brand07 },
    { id: "juls-carman", name: "Juls Carman", logo: brand08 },
    { id: "verze", name: "Verze", logo: brand09 },
    { id: "weischler", name: "Weischler", logo: brand10 },
    { id: "reiden", name: "Reiden", logo: brand11 },
  ],
];

export function Home() {
  const navigate = useNavigate();
  const [showRevista, setShowRevista] = useState(false);
  const [brandGroupIndex, setBrandGroupIndex] = useState(0);
  const [promoBannerIndex, setPromoBannerIndex] = useState(0);

  const handleBannerClick = (destino: HomeBannerDestino) => {
    navigate(destino.url);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBrandGroupIndex((i) => (i + 1) % brandGroups.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoBannerIndex((i) => (i + 1) % promoBanners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section - Vehicle search */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-medium text-center mb-6 md:mb-8">
            Encuentra los mejores productos para tu vehículo
          </h1>

          <div className="bg-gray-50 rounded-lg p-4 md:p-8 border border-blue-600">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Año
                </label>
                <select className="w-full border rounded-lg px-4 py-3 bg-white">
                  <option>Seleccionar</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Marca
                </label>
                <select className="w-full border rounded-lg px-4 py-3 bg-white">
                  <option>Seleccionar</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>Nissan</option>
                  <option>Ford</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Modelo
                </label>
                <select className="w-full border rounded-lg px-4 py-3 bg-white">
                  <option>Seleccionar</option>
                </select>
              </div>

              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Motor (Opcional)
                  </label>
                  <select className="w-full border rounded-lg px-4 py-3 bg-white">
                    <option>Seleccionar</option>
                  </select>
                </div>

                <button className="bg-[#1E3A8A] text-white rounded-full p-3 hover:bg-blue-700 transition-colors flex-shrink-0 flex items-center justify-center w-12 h-12">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-sm">
            <Link
              to="/buscar-producto"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Buscar por producto
            </Link>
            <span className="mx-3 text-gray-400">|</span>
            <Link
              to="/marcas"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Buscar por marcas
            </Link>
          </div>
        </div>
      </section>

      {/* Promo banner carousel */}
      <section className="bg-white">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${promoBannerIndex * 100}%)`,
            }}
          >
            {promoBanners.map((b, i) => (
              <button
                key={i}
                onClick={() => handleBannerClick(b.destino)}
                className="min-w-full w-full p-0 border-0 bg-transparent cursor-pointer focus:outline-none"
                aria-label={b.alt}
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {promoBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setPromoBannerIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === promoBannerIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() =>
              setPromoBannerIndex(
                (promoBannerIndex - 1 + promoBanners.length) %
                  promoBanners.length,
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors text-xl"
          >
            &#8249;
          </button>
          <button
            onClick={() =>
              setPromoBannerIndex(
                (promoBannerIndex + 1) % promoBanners.length,
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors text-xl"
          >
            &#8250;
          </button>
        </div>
      </section>

      {/* Features section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-start gap-4">
              <img
                src={iconEnvio}
                alt="Envío gratis"
                className="w-16 h-16 shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  Envío gratis
                </h3>
                <p className="text-sm text-gray-600">
                  Compras mayores a $499
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img
                src={iconDevoluciones}
                alt="Devoluciones"
                className="w-16 h-16 shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  Devoluciones
                </h3>
                <p className="text-sm text-gray-600">
                  30 días en todos los productos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img
                src={iconGarantia}
                alt="90 días de garantía"
                className="w-16 h-16 shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  90 días de garantía
                </h3>
                <p className="text-sm text-gray-600">
                  En todos los productos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by specialty */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-medium">
              Categorías
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {specialties.map((specialty) => (
              <Link
                key={specialty.id}
                to={`/busqueda/${specialty.id}`}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-32 h-32 rounded-lg overflow-hidden flex items-center justify-center mb-3">
                  <img
                    src={specialty.img}
                    alt={specialty.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <span className="text-sm text-center font-medium">
                  {specialty.name}
                </span>
              </Link>
            ))}
            {/* Todas las categorías — texto */}
            <Link
              to="/catalogo"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-32 h-32 rounded-lg flex items-center justify-center mb-3">
                <span className="text-3xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors text-center leading-snug">
                  Todas las
                  <br />
                  Categorías
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA sections */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Link
              to="/como-comprar"
              className="bg-[#1E3A8A] rounded-lg p-6 md:p-8 text-white flex flex-col justify-between hover:bg-blue-700 transition-colors"
            >
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">
                  ¿Cómo comprar en Autex?
                </h3>
              </div>
              <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit">
                Cómo comprar
              </button>
            </Link>

            <Link
              to="/credito-taller"
              className="bg-[#1E3A8A] rounded-lg p-6 md:p-8 text-white flex flex-col justify-between hover:bg-blue-700 transition-colors"
            >
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">
                  ¿Necesitas un crédito para hacer crecer tu
                  negocio?
                </h3>
              </div>
              <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit">
                Solicitar crédito
              </button>
            </Link>

            <div
              className="bg-[#1E3A8A] rounded-lg p-6 md:p-8 text-white flex flex-col justify-between hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={() => setShowRevista(true)}
            >
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">
                  Ver nuestra revista de promociones
                </h3>
              </div>
              <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit">
                Ver revista →
              </button>
            </div>

            {/* ── Visor PDF ── */}
            {showRevista && (
              <div className="fixed inset-0 z-50 flex flex-col bg-gray-900">
                {/* Barra superior */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white shrink-0">
                  <span className="font-medium text-sm">
                    Revista de Promociones — Autoexpertos
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={pdfRevista}
                      download="Autoexpertos_julio_2.pdf"
                      className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </a>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      Imprimir
                    </button>
                    <button
                      onClick={() => setShowRevista(false)}
                      className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cerrar
                    </button>
                  </div>
                </div>
                {/* Visor */}
                <embed
                  src={`${pdfRevista}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                  type="application/pdf"
                  className="flex-1 w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Brands section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
            Marcas destacadas
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${brandGroupIndex * 100}%)`,
              }}
            >
              {brandGroups.map((group, gi) => (
                <div
                  key={gi}
                  className="min-w-full grid grid-cols-5 gap-6"
                >
                  {group.map((brand) => (
                    <Link
                      key={brand.id}
                      to={`/marca/${brand.id}`}
                      className="bg-white flex items-center justify-center hover:shadow-lg transition-shadow p-2"
                    >
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-contain"
                      />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {brandGroups.map((_, i) => (
              <button
                key={i}
                onClick={() => setBrandGroupIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === brandGroupIndex ? "bg-gray-800" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-12 md:py-16 bg-[#1E3A8A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-white mb-6 md:mb-8">
            <div className="text-sm font-medium mb-2">
              SUSCRÍBETE
            </div>
            <h2 className="text-2xl md:text-3xl font-medium mb-2">
              Entérate de nuestras mejores promociones y
              descuentos
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Escribe tu correo"
              className="flex-1 px-4 md:px-6 py-3 rounded-lg outline-none text-sm md:text-base placeholder:text-gray-400"
            />
            <button className="bg-red-600 text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}