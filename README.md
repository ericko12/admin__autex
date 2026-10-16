# Autex 2026 — Prototipo (Figma Make)

Prototipo de la tienda Autex y su panel de administración (`/admin`), exportado desde Figma Make y ajustado para cumplir la HU **EF-44384** (Administrar enlaces de footer: legales y contacto).

## Ejecutar

```bash
npm i
npm run dev
```

Otros comandos: `npm run build`.

## Configuración de Footer (EF-44384)

Pantalla: `/admin/footer` · Código: `src/app/pages/admin/FooterConfig.tsx`

| Pieza | Archivo |
|---|---|
| Estado compartido y servicio simulado | `src/app/context/FooterContext.tsx` |
| Reglas de validación | `src/app/utils/footerValidation.ts` |
| Footer público (lee la configuración guardada) | `src/app/components/Footer.tsx` |

Los datos son **simulados en memoria** (se pierden al recargar). Al conectar el backend (`ConfiguracionAutexService`), sustituir `consultarConfiguracion` y `persistirConfiguracion` en `FooterContext.tsx`.

Para probar los mensajes de error agrega a la URL:

- `?footerError=load` → falla la consulta (criterio 1)
- `?footerError=save` → falla el guardado (criterio 6)

## Pendientes por confirmar con Producto/Diseño

- Formato de teléfono y WhatsApp (hoy: 10 dígitos) y si los datos de contacto pueden quedar vacíos (hoy: sí, y entonces no se muestran).
- Los límites de Ayuda (6) se cuentan incluyendo el enlace fijo.
- Las URLs de Facebook e Instagram son de ejemplo.
- La ruta `/sucursales` (Localiza tu tienda) no existe todavía en `routes.tsx`.

## Stack

React 18 · Vite 6 · Tailwind 4 · shadcn/ui · React Router 7
