import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import promo1 from 'figma:asset/31de7e11465833329ee62760636088d08d977de8.png';
import promo2 from 'figma:asset/66c9be1c6b4ad3baf2461892007fdfa76ed4579d.png';
import promo3 from 'figma:asset/87b8b43db4fb56d6c80db739b754c47c5fa8b200.png';
import promo4 from 'figma:asset/08cdbed3310c2f11a498c4163b94af5a733f9092.png';
import promo5 from 'figma:asset/a799c35966fb7ad340feeaedcba8ceb055cc891f.png';
import promo6 from 'figma:asset/09f350ef11ef0048ba26ed88ac486dbf346899c5.png';
import promo7 from 'figma:asset/2636b66634e79939c9a1f426a3ca253d2fc1a9cb.png';
import promo8 from 'figma:asset/cb2495e7e67e97609c5389ebae8087671abae4df.png';
import banner1 from '../../imports/Web-Julio-1920x600-1.jpg';
import banner2 from '../../imports/Web-Julio-1920x600-2.jpg';
import banner3 from '../../imports/Web-Julio-1920x600-3.jpg';
import banner5 from '../../imports/Web-Julio-1920x600-5.jpg';
import gridV1 from '../../imports/2.1_Juls-Carman-2-400x500.jpg';
import gridV2 from '../../imports/2.2_Juls-Carman-400x500.jpg';
import gridV3 from '../../imports/2.3_presto-400x500.jpg';
import gridV4 from '../../imports/VERZE-400x500.jpg';
import gridH1 from '../../imports/3.1_Juls-Carman-2-300x400.jpg';
import gridH2 from '../../imports/3.2_Juls-Carman-300x400.jpg';
import gridH3 from '../../imports/3.3_Presto-400x300.jpg';
import gridH4 from '../../imports/VERZE-300x400.jpg';

type BannerDestino =
  | { tipo: 'interno'; url: string }
  | { tipo: 'ninguno' };

const bannerConfig: { src: string; alt: string; destino: BannerDestino }[] = [
  { src: banner1, alt: 'Banner promoción 1', destino: { tipo: 'interno', url: '/busqueda/aceites-lubricantes' } },
  { src: banner2, alt: 'Banner promoción 2', destino: { tipo: 'ninguno' } },
  { src: banner3, alt: 'Banner promoción 3', destino: { tipo: 'interno', url: '/busqueda/frenos-suspension' } },
  { src: banner5, alt: 'Banner promoción 4', destino: { tipo: 'ninguno' } },
];

export function Promociones() {
  const navigate = useNavigate();
  const [bannerIndex, setBannerIndex] = useState(0);

  const handleBannerClick = (destino: BannerDestino) => {
    if (destino.tipo === 'interno') {
      navigate(destino.url);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((i) => (i + 1) % bannerConfig.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const promocionesGrid = [
    { id: 1, image: promo1, alt: 'Promoción Tecnofuel' },
    { id: 2, image: promo2, alt: 'Promoción Carfan' },
    { id: 3, image: promo3, alt: 'Promoción Juls Carman' },
    { id: 4, image: promo4, alt: 'Promoción Reiden' },
    { id: 6, image: promo6, alt: 'Promoción Bresser' },
    { id: 7, image: promo7, alt: 'Promoción Acosa' },
    { id: 8, image: promo8, alt: 'Promoción Star' },
  ];

  const handlePromoClick = (promo: typeof promocionesGrid[0]) => {
    // Carfan (id: 2) va directo a productos
    if (promo.id === 2) {
      navigate('/busqueda/fuel-injection');
    } else {
      navigate(`/promocion/${promo.id}`, { state: { image: promo.image, alt: promo.alt, id: promo.id } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">← Volver</a>
            <span>|</span>
            <span className="text-blue-600">Promociones</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-medium mb-8">Promociones</h1>

        {/* Banner principal */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
            >
              {bannerConfig.map((b, i) => (
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
              {bannerConfig.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBannerIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === bannerIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
            {/* Prev / Next arrows */}
            <button
              onClick={() => setBannerIndex((bannerIndex - 1 + bannerConfig.length) % bannerConfig.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
            >&#8249;</button>
            <button
              onClick={() => setBannerIndex((bannerIndex + 1) % bannerConfig.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
            >&#8250;</button>
          </div>
        </div>

        {/* Promociones grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* Verticales 400x500 — fila 1 */}
          {([
            { id: 1,  src: gridV1, alt: 'Promoción Tecnofuel',          banner: banner1 },
            { id: 3,  src: gridV2, alt: 'Promoción Juls Carman',        banner: banner2 },
            { id: 4,  src: gridV3, alt: 'Promoción Reiden',             banner: banner3 },
            { id: 6,  src: gridV4, alt: 'Promoción Bresser',            banner: banner5 },
          ] as const).map((p) => (
            <button
              key={`v${p.id}`}
              onClick={() => navigate(`/promocion/${p.id}`, { state: { image: p.banner, alt: p.alt, id: p.id } })}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer text-left w-full"
            >
              <img src={p.src} alt={p.alt} className="w-full h-auto object-cover" />
            </button>
          ))}
          {/* Horizontales 400x300 — fila 2 */}
          {([
            { id: 7,  src: gridH1, alt: 'Promoción Acosa',             banner: banner1 },
            { id: 8,  src: gridH2, alt: 'Promoción Star',              banner: banner2 },
            { id: 5,  src: gridH3, alt: 'Promoción Juls Carman Pro',   banner: banner3 },
            { id: 9,  src: gridH4, alt: 'Apymsa Mega Sale',            banner: banner5 },
          ] as const).map((p) => (
            <button
              key={`h${p.id}`}
              onClick={() => navigate(`/promocion/${p.id}`, { state: { image: p.banner, alt: p.alt, id: p.id } })}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer text-left w-full"
            >
              <img src={p.src} alt={p.alt} className="w-full h-auto object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}