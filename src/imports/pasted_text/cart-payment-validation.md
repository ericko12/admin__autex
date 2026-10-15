Estoy diseñando el comportamiento del botón "Proceder al pago" dentro de la pantalla Mi carrito para el eCommerce Autex.

La pantalla "Mi carrito" ya existe y contiene el listado de productos, el resumen de compra y el botón Proceder al pago.

El objetivo es diseñar únicamente las validaciones que deben ejecutarse al presionar este botón, mostrando todos los estados posibles antes de permitir continuar al Checkout.

No diseñar aún la pantalla de Checkout ni la captura de datos de pago.

Mantener el mismo Design System del sitio utilizando Auto Layout, Variables, Componentes y Variantes.

Objetivo

Al hacer clic en Proceder al pago, el sistema debe ejecutar una serie de validaciones previas para determinar si el pedido es elegible para continuar.

Si alguna validación falla:

detener el flujo
informar claramente el problema
indicar al cliente qué debe hacer para corregirlo

Solo cuando todas las validaciones sean exitosas deberá permitirse continuar al Checkout.

Comportamiento del prototipo

Para fines demostrativos, crear un prototipo interactivo donde cada clic sobre Proceder al pago presente un escenario diferente.

Cada escenario representa una validación del sistema.

Después de mostrar el último escenario exitoso, el flujo debe reiniciarse para volver al primer escenario.

Escenario 1 – Stock insuficiente

Simular que uno o más productos perdieron disponibilidad durante el proceso de compra.

Mostrar un modal de error.

Título

No pudimos continuar con tu compra.

Mensaje

Uno o más productos ya no cuentan con inventario disponible.

Revisa tu carrito antes de continuar.

Acciones

Botón primario

Revisar carrito

Botón secundario

Seguir comprando

No permitir avanzar.

Escenario 2 – Método de pago no disponible

Simular que el método de pago configurado para el pedido no está habilitado para el canal.

Mostrar un modal.

Título

Método de pago no disponible

Mensaje

El método de pago seleccionado no está disponible para esta compra.

Selecciona otro método para continuar.

Acción

Aceptar

No permitir avanzar.

Escenario 3 – Restricción del canal

Simular una regla de negocio que impide continuar.

Ejemplos:

producto restringido
zona de entrega no disponible
canal sin cobertura

Mostrar un modal.

Título

No es posible procesar este pedido

Mensaje

Algunos productos no pueden procesarse con la configuración actual del pedido.

Modifica tu carrito o la información de entrega para continuar.

Acción

Aceptar

No permitir avanzar.

Escenario 4 – Validaciones exitosas

Simular que todas las validaciones fueron satisfactorias.

Mostrar un mensaje de éxito.

Título

Pedido listo para continuar

Mensaje

Se verificó correctamente:

disponibilidad de inventario
método de pago
reglas del canal

Ahora puedes continuar con el Checkout.

Acción principal

Continuar al Checkout

Este botón únicamente aparece cuando todas las validaciones fueron exitosas.

Reglas funcionales

Representar visualmente las siguientes reglas:

Validación de stock

Antes de continuar verificar la disponibilidad de todos los SKU.

Simular la siguiente lógica:

Stock disponible = Stock CEDIS + Stock Sucursales

No considerar apartados no pagados.

Si algún SKU no tiene disponibilidad:

detener el proceso
mostrar el mensaje correspondiente
Validación del método de pago

Verificar que el método de pago:

exista
esté activo
sea válido para el canal

Si falla:

detener el proceso
mostrar el mensaje correspondiente
Validación de reglas del canal

Validar restricciones comerciales relacionadas con:

tipo de producto
canal de venta
zona de entrega

Si alguna regla falla:

detener el proceso
mostrar el mensaje correspondiente
Regla de continuidad

El usuario solo podrá continuar al Checkout cuando:

exista disponibilidad para todos los productos
el método de pago sea válido
las reglas del canal sean correctas
Componentes

Crear componentes reutilizables para:

Modal de validación
Alerta de error
Mensaje de éxito
Botón primario
Botón secundario
Íconos de éxito, advertencia y error

Crear variantes para:

Error
Advertencia
Éxito
UX

Los mensajes deben estar orientados al cliente.

No utilizar:

códigos internos
mensajes técnicos
errores del sistema
información del ERP

Cada mensaje debe responder tres preguntas:

¿Qué ocurrió?
¿Por qué no puede continuar?
¿Qué debe hacer para resolverlo?

Este prompt está acotado exclusivamente al comportamiento del botón "Proceder al pago" y las validaciones previas al Checkout, dejando fuera el flujo de pago y la confirmación del pedido para abordarlos en un siguiente módulo.

la vista de mini carrito y carrito no existen se deben crear

Correcto. Además, como el objetivo es que Figma Make diseñe el flujo completo, el prompt debe pedir primero la creación de las vistas y después el comportamiento. También es mejor no hablar de "escenarios" sino de estados del sistema, ya que Figma Make interpreta mejor ese lenguaje.

Te propongo este prompt refinado:

Prompt para Figma Make
Contexto

Estoy diseñando una nueva experiencia de carrito de compras para el eCommerce Autex.

Actualmente no existe la vista de Mini Carrito ni la página Mi Carrito, por lo que ambas deben diseñarse desde cero, manteniendo la identidad visual, componentes y patrones de interacción del sitio.

La experiencia debe sentirse integrada con el resto del eCommerce y estar lista para desarrollo.

Utiliza Auto Layout, Variables, Componentes reutilizables y Variantes.

Objetivo

Diseñar el flujo completo del carrito considerando:

Mini Carrito (Drawer o Panel lateral).
Página Mi Carrito.
Validaciones ejecutadas al presionar Proceder al pago.

No diseñar todavía el Checkout ni el proceso de pago.

Vista 1 - Mini Carrito

Crear un panel lateral (Drawer) que aparezca al hacer clic sobre el ícono del carrito ubicado en el Header.

Este panel debe actualizarse automáticamente cuando el usuario agregue o elimine productos desde cualquier parte del sitio.

Cada producto debe mostrar:

Imagen
SKU
Nombre
Precio
Cantidad
Indicador visual cuando sea un producto Bajo Pedido
Botón para eliminar el producto

Al final del listado mostrar:

Subtotal
Botón principal Ver todos los productos

Si el carrito está vacío mostrar un estado vacío con:

Ilustración
Título: Tu carrito está vacío
Texto de apoyo
Botón Explorar productos
Vista 2 - Mi Carrito

Al hacer clic en Ver todos los productos, navegar a una nueva página llamada Mi Carrito.

Esta página debe mostrar los mismos productos que existen en el Mini Carrito.

Cada producto debe permitir:

Incrementar cantidad.
Disminuir cantidad.
Eliminar producto.
Visualizar subtotal por producto.
Visualizar precio unitario.
Mostrar el indicador Bajo Pedido, cuando aplique.

En el resumen de compra mostrar:

Subtotal
Costo de envío (si aplica)
Impuestos (si aplica)
Total

Botón principal:

Proceder al pago

Sincronización

Toda modificación realizada desde cualquiera de las dos vistas deberá actualizar automáticamente:

Mini Carrito.
Página Mi Carrito.
Contador del carrito en el Header.
Subtotal.
Total.
Comportamiento del botón "Proceder al pago"

Al hacer clic en Proceder al pago, ejecutar las validaciones previas antes de permitir continuar al Checkout.

Mientras exista una validación pendiente o fallida, el usuario no podrá avanzar.

Estados de validación

Para efectos del prototipo, crear un flujo interactivo donde cada clic sobre Proceder al pago muestre un estado diferente.

Después del último estado, reiniciar nuevamente el flujo.

Estado 1 – Stock insuficiente

Validar disponibilidad de cada SKU utilizando la siguiente lógica:

Stock disponible = Stock CEDIS + Stock Sucursales

(No considerar apartados no pagados.)

Si algún producto no tiene disponibilidad mostrar un modal.

Título

Algunos productos ya no están disponibles.

Mensaje

Mientras preparabas tu compra, uno o más productos agotaron su inventario.

Revisa tu carrito antes de continuar.

Acción principal

Revisar carrito

Acción secundaria

Seguir comprando

No permitir avanzar.

Estado 2 – Método de pago no válido

Simular que el método de pago configurado no está habilitado para el canal.

Título

Método de pago no disponible.

Mensaje

El método de pago seleccionado no puede utilizarse para esta compra.

Selecciona otro método para continuar.

Acción

Aceptar.

No permitir avanzar.

Estado 3 – Restricción de canal

Simular que una regla comercial impide continuar.

Ejemplos:

Restricción por tipo de producto.
Restricción por zona de entrega.
Restricción por canal de venta.
Título

No es posible continuar con este pedido.

Mensaje

Algunos productos presentan restricciones para la configuración actual del pedido.

Revisa tu carrito o modifica la información de entrega.

Acción

Aceptar.

No permitir avanzar.

Estado 4 – Validaciones exitosas

Cuando todas las validaciones sean satisfactorias mostrar un estado de éxito.

Título

Todo está listo para continuar.

Mensaje

El pedido cumple con las validaciones de inventario, método de pago y reglas comerciales.

Acción principal

Continuar al Checkout

Este será el único estado que permitirá abandonar la página Mi Carrito.

Reglas funcionales

Representar visualmente los siguientes criterios:

Validar el inventario de cada SKU antes de continuar.
Si un producto pierde disponibilidad, impedir continuar.
Validar que el método de pago esté activo para el canal.
Validar las reglas comerciales del canal.
El pedido solo podrá continuar cuando todas las validaciones sean exitosas.
Mostrar mensajes claros orientados al cliente, indicando la causa del problema y la acción recomendada.

No mostrar información técnica como:

códigos internos
identificadores del ERP
reglas internas del negocio
información logística interna
Componentes

Crear componentes reutilizables con variantes para:

Drawer Mini Carrito.
Card de producto.
Badge Bajo Pedido.
Selector de cantidad.
Resumen de compra.
Modal de validación.
Alertas.
Estado vacío.
Botones.
Toasts.
Loader.
Responsive

Diseñar versiones para:

Desktop.
Tablet.
Mobile.
Accesibilidad

Aplicar WCAG AA.

Contraste adecuado.
Focus visible.
Navegación por teclado.
Mensajes accesibles.
Labels visibles.