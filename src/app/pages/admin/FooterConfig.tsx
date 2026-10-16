import { useEffect, useMemo, useState } from 'react';
import { Facebook, Instagram, Linkedin, Lock, Music2, Plus, Save, Trash2, Youtube } from 'lucide-react';
import { Modal } from '../../components/admin/Modal';
import {
  CATALOGO_REDES,
  ENLACE_LOCALIZA_TIENDA,
  FOOTER_LIMITES,
  useFooter,
} from '../../context/FooterContext';
import type { FooterConfigData, FooterContacto, FooterLink } from '../../context/FooterContext';
import {
  validarContacto,
  validarEnlaces,
} from '../../utils/footerValidation';
import type { ErroresContacto, ErroresEnlace } from '../../utils/footerValidation';

type Seccion = 'acerca' | 'ayuda' | 'redes';

const MENSAJE_ERROR_CONSULTA =
  'No fue posible cargar la configuración del footer. Actualiza la página para intentarlo nuevamente.';
const MENSAJE_ERROR_GUARDADO = 'No fue posible guardar los cambios. Intenta nuevamente.';
const MENSAJE_EXITO = 'Configuración guardada exitosamente';
const MENSAJE_ELIMINAR = '¿Deseas eliminar este enlace del footer?';
const MENSAJE_SALIR = 'Tienes cambios sin guardar. ¿Deseas salir y descartarlos?';

const ICONOS_RED = {
  Facebook,
  Instagram,
  TikTok: Music2,
  YouTube: Youtube,
  LinkedIn: Linkedin,
} as const;

const inputBase =
  'w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500';
const inputOk = 'border-gray-300';
const inputError = 'border-red-500 focus:ring-red-500';
const inputFijo = 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed';

function claseInput(error?: string, fijo?: boolean) {
  return `${inputBase} ${fijo ? inputFijo : error ? inputError : inputOk}`;
}

function MensajeError({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} className="text-xs text-red-600 mt-1">
      {texto}
    </p>
  );
}

interface FilaEnlaceProps {
  enlace: FooterLink;
  errores?: ErroresEnlace;
  mostrarErrores: boolean;
  onCambio: (campo: 'nombre' | 'url', valor: string) => void;
  onEliminar: () => void;
  placeholderNombre: string;
  placeholderUrl: string;
  ayudaFormato?: boolean;
}

function FilaEnlace({
  enlace,
  errores,
  mostrarErrores,
  onCambio,
  onEliminar,
  placeholderNombre,
  placeholderUrl,
  ayudaFormato = true,
}: FilaEnlaceProps) {
  const errorNombre = mostrarErrores ? errores?.nombre : undefined;
  const errorUrl = mostrarErrores ? errores?.url : undefined;

  return (
    <div className="flex gap-2">
      <div className="flex-1 space-y-2">
        <div>
          <input
            type="text"
            value={enlace.nombre}
            onChange={(e) => onCambio('nombre', e.target.value)}
            placeholder={placeholderNombre}
            disabled={enlace.fijo}
            aria-label={`Nombre del enlace ${enlace.nombre}`}
            aria-invalid={!!errorNombre}
            aria-describedby={errorNombre ? `${enlace.id}-nombre-error` : undefined}
            className={claseInput(errorNombre, enlace.fijo)}
          />
          <MensajeError id={`${enlace.id}-nombre-error`} texto={errorNombre} />
        </div>
        <div>
          <input
            type="text"
            value={enlace.url}
            onChange={(e) => onCambio('url', e.target.value)}
            placeholder={placeholderUrl}
            disabled={enlace.fijo}
            aria-label={`Destino del enlace ${enlace.nombre}`}
            aria-invalid={!!errorUrl}
            aria-describedby={errorUrl ? `${enlace.id}-url-error` : undefined}
            className={claseInput(errorUrl, enlace.fijo)}
          />
          <MensajeError id={`${enlace.id}-url-error`} texto={errorUrl} />
          {!enlace.fijo && ayudaFormato && !errorUrl && (
            <p className="text-xs text-gray-500 mt-1">
              Formato: <span className="font-medium">/nombre-seccion</span> (ej: /terminos-condiciones, /preguntas-frecuentes) o URL completa (ej: https://...)
            </p>
          )}
        </div>
      </div>
      {enlace.fijo ? (
        <span
          className="p-2 text-gray-400 h-fit"
          title="Enlace fijo: no se puede editar ni eliminar"
          aria-label="Enlace fijo"
        >
          <Lock className="w-4 h-4" />
        </span>
      ) : (
        <button
          type="button"
          onClick={onEliminar}
          aria-label={`Eliminar enlace ${enlace.nombre || 'sin nombre'}`}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors h-fit"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function ContadorLimite({ actual, limite }: { actual: number; limite: number }) {
  return (
    <span className="text-xs text-gray-500" aria-label={`${actual} de ${limite} permitidos`}>
      {actual}/{limite}
    </span>
  );
}

function ControlAgregar({
  alcanzoLimite,
  limite,
  etiqueta,
  onClick,
}: {
  alcanzoLimite: boolean;
  limite: number;
  etiqueta: string;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={alcanzoLimite}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-600"
      >
        <Plus className="w-4 h-4" />
        {etiqueta}
      </button>
      {alcanzoLimite && (
        <p className="text-xs text-gray-500 mt-1">Alcanzaste el límite de {limite} registros en esta sección.</p>
      )}
    </div>
  );
}

function EsqueletoCarga() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse">
      <span className="sr-only">Cargando configuración del footer…</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[0, 1].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 space-y-3">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-9 bg-gray-200 rounded-lg" />
            <div className="h-9 bg-gray-200 rounded-lg" />
            <div className="h-9 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 space-y-3">
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="h-9 bg-gray-200 rounded-lg" />
      </div>
      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-3">
        <div className="h-5 w-36 bg-gray-200 rounded" />
        <div className="h-9 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

function primerCampoInvalido() {
  const campo = document.querySelector<HTMLElement>('[aria-invalid="true"]');
  campo?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  campo?.focus();
}

export function FooterConfig() {
  const { status, config, guardar } = useFooter();
  const [borrador, setBorrador] = useState<FooterConfigData | null>(null);
  const [mostrarErrores, setMostrarErrores] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);
  const [porEliminar, setPorEliminar] = useState<{ seccion: Seccion; id: string } | null>(null);

  // El borrador se crea al terminar la consulta; si la consulta falla o recarga, se descarta.
  useEffect(() => {
    if (status === 'ready') {
      setBorrador((actual) => actual ?? config);
    } else {
      setBorrador(null);
    }
  }, [status, config]);

  const erroresSecciones = useMemo(() => {
    if (!borrador) return { acerca: {}, ayuda: {}, redes: {} } as Record<Seccion, Record<string, ErroresEnlace>>;
    return {
      acerca: validarEnlaces(borrador.acerca),
      ayuda: validarEnlaces(borrador.ayuda),
      redes: validarEnlaces(borrador.redes),
    };
  }, [borrador]);

  const erroresContacto: ErroresContacto = useMemo(
    () => (borrador ? validarContacto(borrador.contacto) : {}),
    [borrador],
  );

  const hayErrores =
    Object.values(erroresSecciones).some((s) => Object.keys(s).length > 0) ||
    Object.keys(erroresContacto).length > 0;

  const hayCambios = useMemo(
    () => (borrador ? JSON.stringify(borrador) !== JSON.stringify(config) : false),
    [borrador, config],
  );

  useEffect(() => {
    if (!hayCambios) return;
    const prevenirSalida = (evento: BeforeUnloadEvent) => evento.preventDefault();
    const confirmarNavegacion = (evento: MouseEvent) => {
      const enlace = (evento.target as HTMLElement).closest('a[href]');
      if (enlace && !window.confirm(MENSAJE_SALIR)) evento.preventDefault();
    };
    window.addEventListener('beforeunload', prevenirSalida);
    document.addEventListener('click', confirmarNavegacion, true);
    return () => {
      window.removeEventListener('beforeunload', prevenirSalida);
      document.removeEventListener('click', confirmarNavegacion, true);
    };
  }, [hayCambios]);

  const actualizarEnlace = (seccion: Seccion, id: string, campo: 'nombre' | 'url', valor: string) => {
    setMostrarErrores(true);
    setBorrador((b) =>
      b ? { ...b, [seccion]: b[seccion].map((e) => (e.id === id && !e.fijo ? { ...e, [campo]: valor } : e)) } : b,
    );
  };

  const agregarEnlace = (seccion: Seccion) => {
    setMostrarErrores(true);
    setBorrador((b) => {
      if (!b || b[seccion].length >= FOOTER_LIMITES[seccion]) return b;
      // Los adicionales se agregan al final: orden de creación, sin reordenamiento manual.
      const nombre = seccion === 'redes'
        ? CATALOGO_REDES.find((red) => !b.redes.some((actual) => actual.nombre === red)) ?? ''
        : '';
      return { ...b, [seccion]: [...b[seccion], { id: `${seccion}-${crypto.randomUUID()}`, nombre, url: '' }] };
    });
  };

  const confirmarEliminacion = () => {
    if (!porEliminar) return;
    const { seccion, id } = porEliminar;
    setBorrador((b) =>
      b ? { ...b, [seccion]: b[seccion].filter((e) => e.id !== id || e.fijo) } : b,
    );
    setPorEliminar(null);
  };

  const actualizarContacto = (campo: keyof FooterContacto, valor: string) => {
    setMostrarErrores(true);
    setBorrador((b) => (b ? { ...b, contacto: { ...b.contacto, [campo]: valor } } : b));
  };

  const handleGuardar = async () => {
    if (!borrador || guardando) return;
    setMostrarErrores(true);
    setMensaje(null);

    if (hayErrores) {
      // Espera al render con los errores visibles para llevar el foco al primero.
      setTimeout(primerCampoInvalido, 0);
      return;
    }

    const limpio: FooterConfigData = {
      acerca: borrador.acerca.map((e) => ({ ...e, nombre: e.nombre.trim(), url: e.url.trim() })),
      ayuda: borrador.ayuda.map((e) => ({ ...e, nombre: e.nombre.trim(), url: e.url.trim() })),
      redes: borrador.redes.map((e) => ({ ...e, nombre: e.nombre.trim(), url: e.url.trim() })),
      contacto: {
        telefono1: borrador.contacto.telefono1.trim(),
        whatsapp: borrador.contacto.whatsapp.trim(),
        email: borrador.contacto.email.trim(),
      },
    };

    setGuardando(true);
    try {
      await guardar(limpio);
      setBorrador(limpio);
      setMostrarErrores(false);
      setMensaje({ tipo: 'ok', texto: MENSAJE_EXITO });
      setTimeout(() => setMensaje((m) => (m?.tipo === 'ok' ? null : m)), 3000);
    } catch {
      // La captura se conserva en el borrador.
      setMensaje({ tipo: 'error', texto: MENSAJE_ERROR_GUARDADO });
    } finally {
      setGuardando(false);
    }
  };

  const puedeGuardar = status === 'ready' && hayCambios && !hayErrores && !guardando;

  const columnas: { seccion: 'acerca' | 'ayuda'; titulo: string }[] = [
    { seccion: 'acerca', titulo: 'Acerca de Autex' },
    { seccion: 'ayuda', titulo: 'Ayuda' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Configuración de Footer</h1>
          <p className="text-gray-600">Administra los enlaces y contenido del footer</p>
        </div>
        <button
          type="button"
          onClick={handleGuardar}
          disabled={!puedeGuardar}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          <Save className="w-5 h-5" />
          {guardando ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </div>

      {mensaje && (
        <div
          role={mensaje.tipo === 'ok' ? 'status' : 'alert'}
          className={
            mensaje.tipo === 'ok'
              ? 'mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800'
              : 'mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800'
          }
        >
          {mensaje.texto}
        </div>
      )}

      {status === 'loading' && <EsqueletoCarga />}

      {status === 'error' && (
        <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {MENSAJE_ERROR_CONSULTA}
        </div>
      )}

      {status === 'ready' && borrador && (
        <>
          {/* Columnas de enlaces */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {columnas.map(({ seccion, titulo }) => (
              <div key={seccion} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{titulo}</h3>
                  <ContadorLimite actual={borrador[seccion].length} limite={FOOTER_LIMITES[seccion]} />
                </div>

                <div className="space-y-3">
                  {borrador[seccion].map((enlace) => (
                    <FilaEnlace
                      key={enlace.id}
                      enlace={enlace}
                      errores={erroresSecciones[seccion][enlace.id]}
                      mostrarErrores={mostrarErrores}
                      onCambio={(campo, valor) => actualizarEnlace(seccion, enlace.id, campo, valor)}
                      onEliminar={() => setPorEliminar({ seccion, id: enlace.id })}
                      placeholderNombre="Nombre del enlace"
                      placeholderUrl="/nombre-seccion"
                    />
                  ))}

                  <ControlAgregar
                    alcanzoLimite={borrador[seccion].length >= FOOTER_LIMITES[seccion]}
                    limite={FOOTER_LIMITES[seccion]}
                    etiqueta="Agregar enlace"
                    onClick={() => agregarEnlace(seccion)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Información de contacto */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Información de contacto</h3>
              <ContadorLimite actual={4} limite={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="footer-telefono1" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="footer-telefono1"
                  type="text"
                  inputMode="tel"
                  value={borrador.contacto.telefono1}
                  onChange={(e) => actualizarContacto('telefono1', e.target.value)}
                  aria-invalid={mostrarErrores && !!erroresContacto.telefono1}
                  aria-describedby={mostrarErrores && erroresContacto.telefono1 ? 'footer-telefono1-error' : undefined}
                  className={claseInput(mostrarErrores ? erroresContacto.telefono1 : undefined)}
                />
                <MensajeError id="footer-telefono1-error" texto={mostrarErrores ? erroresContacto.telefono1 : undefined} />
              </div>

              <div>
                <label htmlFor="footer-whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="footer-whatsapp"
                  type="text"
                  inputMode="tel"
                  value={borrador.contacto.whatsapp}
                  onChange={(e) => actualizarContacto('whatsapp', e.target.value)}
                  aria-invalid={mostrarErrores && !!erroresContacto.whatsapp}
                  aria-describedby={mostrarErrores && erroresContacto.whatsapp ? 'footer-whatsapp-error' : undefined}
                  className={claseInput(mostrarErrores ? erroresContacto.whatsapp : undefined)}
                />
                <MensajeError id="footer-whatsapp-error" texto={mostrarErrores ? erroresContacto.whatsapp : undefined} />
              </div>

              <div>
                <label htmlFor="footer-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={borrador.contacto.email}
                  onChange={(e) => actualizarContacto('email', e.target.value)}
                  aria-invalid={mostrarErrores && !!erroresContacto.email}
                  aria-describedby={mostrarErrores && erroresContacto.email ? 'footer-email-error' : undefined}
                  className={claseInput(mostrarErrores ? erroresContacto.email : undefined)}
                />
                <MensajeError id="footer-email-error" texto={mostrarErrores ? erroresContacto.email : undefined} />
              </div>

              <div>
                <label htmlFor="footer-localiza" className="block text-sm font-medium text-gray-700 mb-1">
                  Enlace fijo
                </label>
                <div className="relative">
                  <input
                    id="footer-localiza"
                    type="text"
                    value={ENLACE_LOCALIZA_TIENDA.nombre}
                    disabled
                    className={`${claseInput(undefined, true)} pr-9`}
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Redes sociales</h3>
              <ContadorLimite actual={borrador.redes.length} limite={FOOTER_LIMITES.redes} />
            </div>

            <div className="space-y-3">
              {borrador.redes.map((red) => {
                const errores = erroresSecciones.redes[red.id];
                const errorNombre = mostrarErrores ? errores?.nombre : undefined;
                const errorUrl = mostrarErrores ? errores?.url : undefined;
                const Icono = ICONOS_RED[red.nombre as keyof typeof ICONOS_RED] ?? Facebook;
                return (
                  <div key={red.id} className="flex gap-2">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <Icono className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                        <select
                          value={red.nombre}
                          onChange={(e) => actualizarEnlace('redes', red.id, 'nombre', e.target.value)}
                          aria-label="Nombre de la red social"
                          aria-invalid={!!errorNombre}
                          aria-describedby={errorNombre ? `${red.id}-nombre-error` : undefined}
                          className={`${claseInput(errorNombre)} pl-9`}
                        >
                          {CATALOGO_REDES.map((opcion) => (
                            <option
                              key={opcion}
                              value={opcion}
                              disabled={opcion !== red.nombre && borrador.redes.some((otra) => otra.nombre === opcion)}
                            >
                              {opcion}
                            </option>
                          ))}
                        </select>
                        <MensajeError id={`${red.id}-nombre-error`} texto={errorNombre} />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={red.url}
                          onChange={(e) => actualizarEnlace('redes', red.id, 'url', e.target.value)}
                          placeholder="https://..."
                          aria-label="Destino de la red social"
                          aria-invalid={!!errorUrl}
                          aria-describedby={errorUrl ? `${red.id}-url-error` : undefined}
                          className={claseInput(errorUrl)}
                        />
                        <MensajeError id={`${red.id}-url-error`} texto={errorUrl} />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPorEliminar({ seccion: 'redes', id: red.id })}
                      aria-label={`Eliminar red social ${red.nombre || 'sin nombre'}`}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors h-fit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              <ControlAgregar
                alcanzoLimite={borrador.redes.length >= FOOTER_LIMITES.redes}
                limite={FOOTER_LIMITES.redes}
                etiqueta="Agregar red social"
                onClick={() => agregarEnlace('redes')}
              />
            </div>
          </div>
        </>
      )}

      <Modal isOpen={!!porEliminar} onClose={() => setPorEliminar(null)} title="Eliminar enlace" maxWidth="sm">
        <p className="text-gray-700 mb-6">{MENSAJE_ELIMINAR}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setPorEliminar(null)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={confirmarEliminacion}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
}
