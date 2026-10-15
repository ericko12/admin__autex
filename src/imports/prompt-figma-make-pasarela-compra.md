# Prompt para Figma Make — Pasarela de compra (Checkout)

Actúa como diseñador de producto y genera un prototipo funcional en Figma Make de la pasarela de compra de la tienda, **reutilizando los componentes, estilos y patrones de interacción que ya existen en el archivo** (stepper, tarjetas de selección con radio button, botones primario/secundario, tarjetas de resumen, tipografía y colores de marca). No crees un nuevo sistema visual: reutiliza lo existente en el resto del sitio/carrito.

## Punto de entrada

- Esta pasarela se abre al dar clic en el botón **"Proceder pago"** del carrito de compras.
- Por defecto arranca en el paso 1 ("Datos del usuario").

## Estructura general (persiste en los 4 pasos)

- Encabezado centrado: "Pago del pedido #[número de pedido]".
- Stepper horizontal de 4 pasos numerados: **1 Datos del usuario · 2 Método de envío · 3 Método de pago · 4 Confirmación**. El paso activo se resalta en azul; los completados muestran número/relleno azul; los pendientes en gris.
- Layout de 2 columnas:
  - **Columna izquierda** (~70%): tarjeta blanca con encabezado azul marino con un acento angular rojo a la izquierda, título del paso, y el contenido específico de cada paso.
  - **Columna derecha** (~30%, sticky/fija en los 4 pasos): tarjeta "Detalle de pedido" + NUEVO bloque de cupón + tarjeta "Resumen de productos".

## Paso 1 — Datos del usuario

- Texto "Selecciona una dirección".
- Lista de tarjetas seleccionables (radio) con las direcciones guardadas ("Dirección 1", "Dirección 2"...), cada una con la dirección completa y link "Editar dirección".
- Link "Añadir dirección +" al final.
- Botones: "Regresar" (secundario) / "Continuar" (primario).

## Paso 2 — Método de envío

- Texto "Verifica el envío".
- Tarjetas seleccionables (radio) por opción: ícono de camión, título ("Envío a domicilio"), etiqueta opcional en naranja (ej. "(Productos bajo pedido)"), tiempo estimado de entrega, y costo alineado a la derecha ("Sin costo de envío" o precio).
- Botones: "Regresar" / "Continuar".

## Paso 3 — Método de pago

- Tabs "Tarjetas" / "Otras formas de pago".
- Fila de logos de tarjetas de crédito y débito aceptadas.
- Lista de tarjetas guardadas como tarjetas seleccionables (radio): logo de marca, "Visa/Mastercard con terminación ####", chevron para expandir.
- Link "Añadir tarjeta +".
- Botones: "Regresar" / "Continuar".

## Paso 4 — Confirmación

- Encabezado con ícono de usuario + nombre del usuario / empresa.
- Tarjeta "Confirmación del pedido" con 3 bloques, cada uno con botón "Cambiar" que regresa al paso correspondiente:
  - "Acerca del pedido" (número de pedido, fecha de solicitud)
  - "Método de envío" (resumen de la opción elegida y dirección)
  - "Método de pago" (resumen de la tarjeta elegida)
- Botón "Regresar".
- En el sidebar derecho, el CTA cambia de "Continuar" a **"Confirmar el pedido"** (primario, ancho completo, debajo del total).

## Sidebar derecho (persistente en los 4 pasos)

### Tarjeta "Detalle de pedido"
- Subtotal
- Envío / Costo de envío
- Descuentos aplicados
- Total (IVA incluido) — destacado en azul y negritas

### NUEVO — Bloque de cupón de descuento
**Ubicación:** entre la tarjeta "Detalle de pedido" y la tarjeta "Resumen de productos".

**Contenido:**
- Texto "¿Tienes un cupón de descuento?"
- Input con placeholder "Ingresa el código"
- Botón "Aplicar"

**Especificación funcional (implementar con estados reales, no solo visual):**
1. Estado inicial: input vacío, botón "Aplicar" **deshabilitado**.
2. Al escribir cualquier carácter, el botón "Aplicar" se **habilita**. Si el input vuelve a quedar vacío, se deshabilita de nuevo.
3. Clic en "Aplicar" con código **inválido**:
   - Mostrar debajo del input el texto de error en rojo: **"Cupón inválido"**.
   - El input puede marcarse con borde rojo.
   - El campo sigue editable para reintentar.
4. Clic en "Aplicar" con código **válido** (define 1-2 códigos de ejemplo, ej. "DESCUENTO10"):
   - Ocultar el mensaje de error si estaba visible.
   - Actualizar la línea "Descuentos aplicados" en "Detalle de pedido" con el monto del descuento.
   - Recalcular y actualizar "Total (IVA incluido)".
   - Mostrar confirmación visual breve (texto verde "Cupón aplicado" o el input bloqueado con ícono de check y opción de "Quitar").

### Tarjeta "Resumen de productos"
- Lista de productos: imagen miniatura, nombre truncado con "...", badge opcional (ej. "Bajo pedido" en naranja), cantidad (xN), precio.

## Componentes a reutilizar (no recrear)

- Stepper de 4 pasos
- Encabezado de tarjeta azul con acento rojo
- Tarjeta seleccionable con radio button (direcciones, envío, tarjetas de pago)
- Botón primario azul / botón secundario outline
- Tarjeta "Detalle de pedido"
- Tarjeta "Resumen de productos" con fila de producto
- Link con ícono "+" (Añadir dirección / Añadir tarjeta)
- Badge de estado (ej. "Bajo pedido")

## Notas de consistencia

- El botón "Aplicar" del cupón debe usar el mismo estilo de botón primario que "Continuar"/"Confirmar el pedido" (azul marino), salvo que se busque diferenciarlo intencionalmente como acción del carrito.
- Mantener tipografía, espaciado y paleta ya usados en las pantallas existentes.
- El sidebar derecho debe permanecer visible y actualizado en los 4 pasos.
