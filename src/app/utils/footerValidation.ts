import type { FooterContacto, FooterLink } from '../context/FooterContext';

export const MSG = {
  campoRequerido: 'Este campo es obligatorio.',
  nombreRequerido: 'El nombre es obligatorio.',
  destinoRequerido: 'El destino es obligatorio.',
  destinoInvalido: 'Usa el formato /nombre-seccion o https://...',
  urlDuplicada: 'Esta URL ya está registrada en esta sección.',
  telefonoInvalido: 'Ingresa un teléfono de 10 dígitos.',
  correoInvalido: 'Ingresa un correo electrónico válido.',
} as const;

const RUTA_INTERNA = /^\/[a-z0-9]+(?:[-_][a-z0-9]+)*(?:\/[a-z0-9]+(?:[-_][a-z0-9]+)*)*$/i;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function esRutaInterna(valor: string): boolean {
  return RUTA_INTERNA.test(valor.trim());
}

export function esUrlExterna(valor: string): boolean {
  const limpio = valor.trim();
  if (/\s/.test(limpio)) return false;
  try {
    const url = new URL(limpio);
    return url.protocol === 'https:' && url.hostname.includes('.');
  } catch {
    return false;
  }
}

export function esDestinoValido(valor: string): boolean {
  return esRutaInterna(valor) || esUrlExterna(valor);
}

export function esDestinoInterno(valor: string): boolean {
  return valor.trim().startsWith('/');
}

function normalizarUrl(valor: string): string {
  return valor.trim().toLowerCase().replace(/\/+$/, '');
}

export function soloDigitos(valor: string): string {
  return valor.replace(/\D/g, '');
}

export interface ErroresEnlace {
  nombre?: string;
  url?: string;
}

/** Valida los enlaces de una sección. Los enlaces fijos nunca se marcan, pero cuentan para detectar duplicados. */
export function validarEnlaces(enlaces: FooterLink[]): Record<string, ErroresEnlace> {
  const errores: Record<string, ErroresEnlace> = {};
  const vistas = new Set<string>();

  enlaces.forEach((enlace) => {
    const normalizada = normalizarUrl(enlace.url);
    if (enlace.fijo) {
      vistas.add(normalizada);
      return;
    }

    const error: ErroresEnlace = {};
    if (!enlace.nombre.trim()) error.nombre = MSG.nombreRequerido;

    if (!enlace.url.trim()) {
      error.url = MSG.destinoRequerido;
    } else if (!esDestinoValido(enlace.url)) {
      error.url = MSG.destinoInvalido;
    } else if (vistas.has(normalizada)) {
      error.url = MSG.urlDuplicada;
    }

    vistas.add(normalizada);
    if (error.nombre || error.url) errores[enlace.id] = error;
  });

  return errores;
}

export type ErroresContacto = Partial<Record<keyof FooterContacto, string>>;

/** Los tres datos de contacto son obligatorios y deben tener formato válido. */
export function validarContacto(contacto: FooterContacto): ErroresContacto {
  const errores: ErroresContacto = {};
  if (!contacto.telefono1.trim()) {
    errores.telefono1 = MSG.campoRequerido;
  } else if (soloDigitos(contacto.telefono1).length !== 10) {
    errores.telefono1 = MSG.telefonoInvalido;
  }
  if (!contacto.whatsapp.trim()) {
    errores.whatsapp = MSG.campoRequerido;
  } else if (soloDigitos(contacto.whatsapp).length !== 10) {
    errores.whatsapp = MSG.telefonoInvalido;
  }
  if (!contacto.email.trim()) {
    errores.email = MSG.campoRequerido;
  } else if (!CORREO.test(contacto.email.trim())) {
    errores.email = MSG.correoInvalido;
  }
  return errores;
}
