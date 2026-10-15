import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Search, X } from 'lucide-react';
import brand02 from '../../imports/02_Tecnofuel.jpg';
import brand03 from '../../imports/03_Bresser.jpg';
import brand04 from '../../imports/04_Carfan.jpg';
import brand05 from '../../imports/05_Star.jpg';
import brand06 from '../../imports/06_Dynamic.jpg';
import brand07 from '../../imports/07_Acosa.jpg';
import brand08 from '../../imports/08_Juls_Carman.jpg';
import brand09 from '../../imports/09_Verze.jpg';
import brand10 from '../../imports/10_Weischler.jpg';
import brand11 from '../../imports/11_Reiden.jpg';

const popularBrands = [
  { id: 'tecnofuel', name: 'Tecnofuel', logo: brand02 },
  { id: 'acosa', name: 'Acosa', logo: brand07 },
  { id: 'carfan', name: 'Carfan', logo: brand04 },
  { id: 'juls-carman', name: 'Juls Carman', logo: brand08 },
  { id: 'verze', name: 'Verze', logo: brand09 },
  { id: 'dynamic', name: 'Dynamic', logo: brand06 },
];

type Brand = { id: string; name: string };

const brandsByLetter: Record<string, Brand[]> = {
  '0-9': [
    { id: '3en1', name: '3 en 1' },
    { id: '3m', name: '3M' },
  ],
  A: [
    { id: 'ac-delco', name: 'AC Delco' },
    { id: 'acosa', name: 'Acosa' },
    { id: 'aisin', name: 'Aisin' },
    { id: 'armor-all', name: 'Armor All' },
    { id: 'autolite', name: 'Autolite' },
  ],
  B: [
    { id: 'beru', name: 'Beru' },
    { id: 'bosch', name: 'Bosch' },
    { id: 'brembo', name: 'Brembo' },
    { id: 'bresser', name: 'Bresser' },
  ],
  C: [
    { id: 'carfan', name: 'Carfan' },
    { id: 'castrol', name: 'Castrol' },
    { id: 'champion', name: 'Champion' },
    { id: 'continental', name: 'Continental' },
  ],
  D: [
    { id: 'daewoo', name: 'Daewoo' },
    { id: 'db-drive', name: 'DB Drive' },
    { id: 'delphi', name: 'Delphi' },
    { id: 'denso', name: 'Denso' },
    { id: 'depo', name: 'Depo' },
    { id: 'detroit-diesel', name: 'Detroit Diesel' },
    { id: 'dewalt', name: 'Dewalt' },
    { id: 'dirco', name: 'Dirco' },
    { id: 'dni', name: 'DNI' },
    { id: 'doga', name: 'Doga' },
    { id: 'dorman', name: 'Dorman' },
    { id: 'dynamic', name: 'Dynamic' },
  ],
  E: [
    { id: 'elring', name: 'Elring' },
    { id: 'esa', name: 'ESA' },
  ],
  F: [
    { id: 'facet', name: 'Facet' },
    { id: 'febi', name: 'Febi' },
    { id: 'fleetguard', name: 'Fleetguard' },
  ],
  G: [
    { id: 'gates', name: 'Gates' },
    { id: 'gabriel', name: 'Gabriel' },
    { id: 'gloria', name: 'Gloria' },
  ],
  H: [
    { id: 'hella', name: 'Hella' },
    { id: 'hitachi', name: 'Hitachi' },
    { id: 'holley', name: 'Holley' },
  ],
  I: [
    { id: 'idem', name: 'Idem' },
    { id: 'intermotor', name: 'Intermotor' },
  ],
  J: [
    { id: 'juls-carman', name: 'Juls Carman' },
    { id: 'jurid', name: 'Jurid' },
  ],
  K: [
    { id: 'kayaba', name: 'Kayaba' },
    { id: 'koyo', name: 'Koyo' },
  ],
  L: [
    { id: 'luk', name: 'LuK' },
    { id: 'lucas', name: 'Lucas' },
  ],
  M: [
    { id: 'mahle', name: 'Mahle' },
    { id: 'mann', name: 'Mann Filter' },
    { id: 'mobil', name: 'Mobil' },
    { id: 'monroe', name: 'Monroe' },
    { id: 'motorcraft', name: 'Motorcraft' },
  ],
  N: [
    { id: 'napa', name: 'NAPA' },
    { id: 'ngk', name: 'NGK' },
    { id: 'nissens', name: 'Nissens' },
  ],
  O: [
    { id: 'osram', name: 'Osram' },
    { id: 'oe-solutions', name: 'OE Solutions' },
  ],
  P: [
    { id: 'philips', name: 'Philips' },
    { id: 'prestone', name: 'Prestone' },
    { id: 'purflux', name: 'Purflux' },
  ],
  Q: [],
  R: [
    { id: 'reiden', name: 'Reiden' },
    { id: 'remy', name: 'Remy' },
    { id: 'robertshaw', name: 'Robertshaw' },
  ],
  S: [
    { id: 'sachs', name: 'Sachs' },
    { id: 'siemens', name: 'Siemens' },
    { id: 'standard', name: 'Standard' },
    { id: 'star', name: 'Star' },
  ],
  T: [
    { id: 'tecnofuel', name: 'Tecnofuel' },
    { id: 'timken', name: 'Timken' },
    { id: 'total', name: 'Total' },
    { id: 'trico', name: 'Trico' },
  ],
  U: [
    { id: 'uro', name: 'URO' },
  ],
  V: [
    { id: 'valeo', name: 'Valeo' },
    { id: 'value', name: 'Value' },
    { id: 'verze', name: 'Verze' },
    { id: 'victor-reinz', name: 'Victor Reinz' },
  ],
  W: [
    { id: 'walker', name: 'Walker' },
    { id: 'weischler', name: 'Weischler' },
    { id: 'wix', name: 'WIX' },
  ],
  X: [],
  Y: [
    { id: 'yuasa', name: 'Yuasa' },
  ],
  Z: [
    { id: 'zf', name: 'ZF' },
  ],
};

const alphabet = ['0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

function highlight(text: string, query: string) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-gray-900 rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

export function Marcas() {
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('A');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const el = sectionRefs.current[letter];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredBySearch = search
    ? Object.entries(brandsByLetter).reduce<Record<string, Brand[]>>((acc, [letter, brands]) => {
        const matches = brands.filter((b) =>
          b.name.toLowerCase().includes(search.toLowerCase())
        );
        if (matches.length > 0) acc[letter] = matches;
        return acc;
      }, {})
    : brandsByLetter;

  const totalResults = Object.values(filteredBySearch).flat().length;

  useEffect(() => {
    if (search) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveLetter(entry.target.id.replace('section-', ''));
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Búsqueda por marca</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1E3A8A] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3">Búsqueda por marca</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Encuentra rápidamente la marca que buscas utilizando el buscador o navegando por el índice alfabético.
          </p>
        </div>
      </div>

      {/* Sticky alphabet + search */}
      <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
        {/* Alphabet */}
        <div className="max-w-7xl mx-auto px-4 pt-3 pb-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {alphabet.map((letter) => {
              const hasContent = (brandsByLetter[letter]?.length ?? 0) > 0;
              return (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  disabled={!hasContent}
                  className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    activeLetter === letter
                      ? 'bg-[#1E3A8A] text-white shadow'
                      : hasContent
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="max-w-7xl mx-auto px-4 pb-3">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre de la marca"
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Popular brands */}
        {!search && (
          <section className="mb-14">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Marcas populares</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {popularBrands.map((brand) => (
                <Link
                  key={brand.id}
                  to={`/marca/${brand.id}`}
                  className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No results */}
        {search && totalResults === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No encontramos resultados</h3>
            <p className="text-gray-400 mb-6">Intenta escribir otro nombre de marca.</p>
            <button
              onClick={() => setSearch('')}
              className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <div className="space-y-12 pb-16">
            {alphabet.map((letter) => {
              const brands = filteredBySearch[letter];
              if (search && (!brands || brands.length === 0)) return null;

              return (
                <section
                  key={letter}
                  id={`section-${letter}`}
                  ref={(el) => { sectionRefs.current[letter] = el; }}
                >
                  <div className="flex items-baseline gap-4 mb-4 border-b pb-2">
                    <h2 className="text-3xl font-bold text-[#1E3A8A]">{letter}</h2>
                  </div>

                  {brands && brands.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      {brands.map((brand) => (
                        <Link
                          key={brand.id}
                          to={`/marca/${brand.id}`}
                          className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md hover:text-blue-600 transition-all duration-150 text-sm font-medium text-gray-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 group-hover:bg-blue-600 transition-colors shrink-0" />
                          {highlight(brand.name, search)}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-6 text-gray-400 text-sm">
                      <span className="text-2xl">📭</span>
                      <span>Sin marcas disponibles.</span>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
