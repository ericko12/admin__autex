import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, PackageSearch } from 'lucide-react';

export function RastreoPedido() {
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = orderNumber.trim();
    if (!trimmed) {
      setError('Por favor ingresa un número de pedido.');
      return;
    }
    setError('');
    navigate(`/pedido/${trimmed}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Rastrea tu pedido</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1E3A8A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <PackageSearch className="w-14 h-14 mx-auto mb-4 text-blue-300" />
          <h1 className="text-4xl md:text-5xl font-semibold mb-3">Rastrea tu pedido</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Consulta el estado y seguimiento de tu compra ingresando tu número de pedido.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Consulta tu pedido</h2>
          <p className="text-sm text-gray-500 mb-6">
            Ingresa el número de pedido que encontrarás en tu correo de confirmación.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Número de pedido
            </label>
            <div className="relative mb-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => { setOrderNumber(e.target.value); setError(''); }}
                placeholder="Ej. AUT-2026-00123"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
                }`}
                aria-describedby={error ? 'order-error' : undefined}
                aria-invalid={!!error}
              />
            </div>
            {error && (
              <p id="order-error" className="text-red-500 text-xs mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full mt-4 bg-[#1E3A8A] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Consultar pedido
            </button>
          </form>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-gray-500">
              ¿Tienes una cuenta?{' '}
              <Link to="/mis-pedidos" className="text-blue-600 hover:underline font-medium">
                Ver todos mis pedidos
              </Link>
            </p>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 text-center text-sm text-gray-500">
          ¿Necesitas ayuda?{' '}
          <a href="https://wa.me/523332084440" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Contáctanos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
