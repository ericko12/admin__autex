import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import autexLogo from 'figma:asset/88db2cd614f25c1010860e731d4ca247a78d19c2.png';
import mechPhoto from '@/imports/Img-1/4d3d2ca9fe133a6fc38de341744ba919ed5eaff4.png';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const fieldError = {
    email: touched.email && !email.trim(),
    password: touched.password && !password.trim(),
  };
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      navigate('/admin/bienvenida');
    } else {
      setError('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
    }
    setIsLoading(false);
  };

  const isDisabled = isLoading || !email.trim() || !password.trim();

  return (
    <div className="flex min-h-screen">

      {/* ── Left panel: form ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-12 bg-white">

        {/* Logo → home */}
        <div className="mb-10">
          <Link to="/">
            <img src={autexLogo} alt="AUTEX" className="h-8" />
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-8 max-w-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrador</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Ingresa tus credenciales de administrador para poder gestionar el contenido de Autex
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 max-w-sm p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-sm w-full">

          {/* Email */}
          <div>
            <label htmlFor="email" className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
              <span className="text-red-500 text-xs">*</span>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="Ingresa tu correo electrónico"
              autoComplete="email"
              required
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                fieldError.email || error ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {fieldError.email && (
              <p className="mt-1.5 text-xs text-red-500">Este campo es obligatorio</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
              <span className="text-red-500 text-xs">*</span>
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                required
                className={`w-full px-4 pr-11 py-3 border rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  fieldError.password || error ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {fieldError.password && (
              <p className="mt-1.5 text-xs text-red-500">Este campo es obligatorio</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-700"
              />
              Mantener mi sesión iniciada
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg text-sm font-semibold
              hover:bg-blue-900 active:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        {/* Credentials hint */}
        <div className="mt-8 max-w-sm p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-1.5">Credenciales de prueba:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p><span className="font-medium text-gray-700">Admin:</span> juan.perez@autex.com.mx / admin123</p>
            <p><span className="font-medium text-gray-700">Personalizado:</span> maria.lopez@autex.com.mx / marketing123</p>
          </div>
        </div>
      </div>

      {/* ── Right panel: hero image ── */}
      {/* Login Hero Image — replace mechPhoto import to swap the asset */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={mechPhoto}
          alt="Mecánico trabajando en un motor"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Blue overlay — independent element, adjust opacity/color as needed */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(18, 38, 170, 0.62)' }}
        />
      </div>

    </div>
  );
}
