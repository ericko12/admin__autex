import { Link } from 'react-router';

const allBrands = [
  'ACOSA', 'AIRTEX', 'BERU', 'BOSCH', 'BRG', 'COOLING TECHNOLOGIES',
  'CARTER', 'COLE HERSEE', 'DELPHI', 'DENSO', 'DEUTSCH', 'DOGA',
  'GATES', 'HELLA', 'MAHLE', 'MONROE', 'MOTORCRAFT', 'NGK',
  'STANDARD', 'TRW', 'VALVOLINE', 'WAGNER', 'WALKER', 'WYNN\'S',
];

export function Brands() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">← Volver</Link>
            <span>|</span>
            <span className="text-blue-600">Marcas</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium mb-8">Nuestras Marcas</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {allBrands.map((brand) => (
            <Link
              key={brand}
              to={`/marca/${brand.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white border rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow h-32"
            >
              <span className="font-semibold text-center text-gray-700">{brand}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
