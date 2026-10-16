import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface FooterLink {
  id: string;
  nombre: string;
  url: string;
  /** Enlace fijo: visible, sin edición, eliminación ni duplicado. */
  fijo?: boolean;
}

export interface FooterContacto {
  telefono1: string;
  whatsapp: string;
  email: string;
}

export interface FooterConfigData {
  acerca: FooterLink[];
  ayuda: FooterLink[];
  contacto: FooterContacto;
  redes: FooterLink[];
}

export type FooterStatus = 'loading' | 'error' | 'ready';

/** Límites por sección (EF-44384, criterio 3). Acerca y Ayuda cuentan los enlaces fijos. */
export const FOOTER_LIMITES = { acerca: 6, ayuda: 6, redes: 5 } as const;

export const ENLACES_FIJOS_ACERCA: FooterLink[] = [
  { id: 'fijo-terminos', nombre: 'Términos y condiciones', url: '/terminos-condiciones', fijo: true },
  { id: 'fijo-privacidad', nombre: 'Aviso de privacidad', url: '/avisos-privacidad', fijo: true },
  { id: 'fijo-quienes-somos', nombre: '¿Quiénes somos?', url: '/quienes-somos', fijo: true },
];

export const ENLACES_FIJOS_AYUDA: FooterLink[] = [
  {
    id: 'fijo-garantias',
    nombre: 'Garantías y devoluciones',
    url: 'https://www.autex.com.mx/terminos-y-condiciones/#garantias-devoluciones',
    fijo: true,
  },
];

export const ENLACE_LOCALIZA_TIENDA = { nombre: 'Localiza tu tienda', url: '/sucursales' } as const;

const CONFIG_INICIAL: FooterConfigData = {
  acerca: [
    ...ENLACES_FIJOS_ACERCA,
    { id: 'acerca-1', nombre: 'Bolsa de trabajo', url: 'https://empleos.apymsa.com.mx/' },
  ],
  ayuda: [
    ...ENLACES_FIJOS_AYUDA,
    { id: 'ayuda-1', nombre: 'Preguntas frecuentes', url: '/preguntas-frecuentes' },
    { id: 'ayuda-2', nombre: 'Facturación', url: '/facturacion' },
    { id: 'ayuda-3', nombre: '¿Cómo comprar en Autex?', url: '/como-comprar' },
    { id: 'ayuda-4', nombre: 'Rastrea tu pedido', url: '/rastreo-pedido' },
  ],
  contacto: {
    telefono1: '33 3208 4440',
    whatsapp: '33 3208 4440',
    email: 'contacto@autex.com.mx',
  },
  redes: [
    { id: 'red-1', nombre: 'Facebook', url: 'https://www.facebook.com/' },
    { id: 'red-2', nombre: 'Instagram', url: 'https://www.instagram.com/' },
  ],
};

/** Configuración mínima que siempre se muestra: solo elementos fijos. */
export const CONFIG_SOLO_FIJOS: FooterConfigData = {
  acerca: ENLACES_FIJOS_ACERCA,
  ayuda: ENLACES_FIJOS_AYUDA,
  contacto: { telefono1: '', whatsapp: '', email: '' },
  redes: [],
};

/* ---------------------------------------------------------------------------
 * Servicio simulado (sustituir por ConfiguracionAutexService cuando exista el backend).
 * Para demostrar los errores de los criterios 1 y 6 agrega a la URL:
 *   ?footerError=load  -> falla la consulta
 *   ?footerError=save  -> falla el guardado
 * ------------------------------------------------------------------------- */
let almacenSimulado: FooterConfigData = structuredClone(CONFIG_INICIAL);

function errorSimulado(): string | null {
  return new URLSearchParams(window.location.search).get('footerError');
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function consultarConfiguracion(): Promise<FooterConfigData> {
  await esperar(700);
  if (errorSimulado() === 'load') throw new Error('Consulta fallida');
  return structuredClone(almacenSimulado);
}

async function persistirConfiguracion(config: FooterConfigData): Promise<FooterConfigData> {
  await esperar(500);
  if (errorSimulado() === 'save') throw new Error('Guardado fallido');
  // Los enlaces fijos se reimponen siempre; no pueden alterarse desde el cliente.
  const fijosAcerca = ENLACES_FIJOS_ACERCA;
  const fijosAyuda = ENLACES_FIJOS_AYUDA;
  almacenSimulado = {
    ...config,
    acerca: [...fijosAcerca, ...config.acerca.filter((e) => !e.fijo)].slice(0, FOOTER_LIMITES.acerca),
    ayuda: [...fijosAyuda, ...config.ayuda.filter((e) => !e.fijo)].slice(0, FOOTER_LIMITES.ayuda),
    redes: config.redes.slice(0, FOOTER_LIMITES.redes),
  };
  return structuredClone(almacenSimulado);
}

interface FooterContextValue {
  status: FooterStatus;
  config: FooterConfigData;
  recargar: () => void;
  guardar: (config: FooterConfigData) => Promise<void>;
}

const FooterContext = createContext<FooterContextValue | undefined>(undefined);

export function FooterProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<FooterStatus>('loading');
  const [config, setConfig] = useState<FooterConfigData>(CONFIG_SOLO_FIJOS);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setStatus('loading');
    consultarConfiguracion()
      .then((datos) => {
        if (cancelado) return;
        setConfig(datos);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelado) return;
        setConfig(CONFIG_SOLO_FIJOS);
        setStatus('error');
      });
    return () => {
      cancelado = true;
    };
  }, [intento]);

  const recargar = useCallback(() => setIntento((n) => n + 1), []);

  const guardar = useCallback(async (nueva: FooterConfigData) => {
    const guardada = await persistirConfiguracion(nueva);
    setConfig(guardada);
  }, []);

  const value = useMemo(() => ({ status, config, recargar, guardar }), [status, config, recargar, guardar]);

  return <FooterContext.Provider value={value}>{children}</FooterContext.Provider>;
}

export function useFooter() {
  const context = useContext(FooterContext);
  if (!context) throw new Error('useFooter debe usarse dentro de FooterProvider');
  return context;
}
