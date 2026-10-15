# Crear vista "Detalle de Promoción"

## Objetivo

La vista **Promociones** ya está construida en Figma Make.

La vista **Listado/Resultado de Productos** también ya existe y debe reutilizarse.

**IMPORTANTE PARA AHORRAR CRÉDITOS:**

No reconstruir, rediseñar ni duplicar las vistas que ya existen.

No crear un nuevo Header.

No crear un nuevo Footer.

No crear nuevamente la vista de Promociones.

No crear nuevamente el listado de productos.

Reutilizar los componentes, layouts, estilos y elementos existentes.

El único objetivo de esta instrucción es:

1. Crear la nueva vista **Detalle de Promoción**.
2. Conectar los banners de la vista existente de Promociones con esta nueva vista.
3. Conectar el botón **Ver productos de la promoción** con la vista de productos existente.

---

# 1. Navegación desde Promociones

En la vista de **Promociones que ya existe**, hacer que cada banner/promoción sea clicable.

Al hacer clic sobre cualquier banner:

**Promociones → Detalle de Promoción**

No modificar visualmente la vista de Promociones.

Solo agregar la interacción de navegación.

Cada promoción debe poder mostrar su propio contenido de detalle.

---

# 2. Nueva vista: Detalle de Promoción

Crear únicamente esta nueva pantalla.

Mantener exactamente el mismo:

* Header existente
* Footer existente
* ancho de contenido
* grid
* tipografía
* colores
* espaciados
* botones
* componentes
* estilos visuales

que utiliza actualmente Autex.

No crear componentes equivalentes si ya existen.

Reutilizar los componentes existentes.

---

# 3. Estructura de la vista

La estructura debe ser:

### Breadcrumb

Mostrar una navegación contextual similar a:

**Inicio / Promociones / Detalle de promoción**

Permitir regresar a la vista de Promociones.

---

## Banner principal

En la parte superior del contenido mostrar el banner correspondiente a la promoción seleccionada.

Utilizar la misma proporción y tratamiento visual de los banners utilizados actualmente en la vista de Promociones.

El banner debe ocupar el ancho disponible del contenedor principal.

No crear un nuevo banner genérico si ya existe el asset correspondiente.

Utilizar el banner de la promoción seleccionada.

---

# 4. Información de la promoción

Debajo del banner mostrar una sección de contenido con:

## Nombre de la promoción

Ejemplo:

**Promoción - Promoción**

Utilizar como título el nombre correspondiente a la promoción seleccionada.

---

## Descripción

Mostrar una descripción completa de la promoción.

Crear suficiente espacio para que el contenido pueda contener textos de diferentes longitudes.

No utilizar Lorem Ipsum como contenido final si ya existe información de la promoción en el proyecto.

Si no existe contenido real asociado a la promoción, utilizar contenido de ejemplo únicamente para demostrar la estructura.

---

# 5. Bases y condiciones

Debajo de la descripción crear una sección:

## Bases y condiciones

Mostrar las condiciones de participación como una lista.

Ejemplo de estructura:

* Descuento aplicable en productos seleccionados.
* No acumulable con otras promociones.
* Stock limitado.
* Válido hasta agotar existencias.

La sección debe permitir diferentes cantidades de condiciones.

No exponer información técnica o administrativa que no corresponda al cliente.

---

# 6. Botón "Ver productos en promoción"

Al final de la información de la promoción agregar un botón principal:

**Ver productos en promoción**

Este botón debe utilizar el componente de botón existente en Autex.

No crear un nuevo estilo de botón.

---

# 7. Navegación a productos

Al hacer clic en:

**Ver productos en promoción**

NO crear una nueva vista de productos.

Reutilizar completamente la vista de **Listado/Resultado de Productos que ya existe en Figma Make**.

La navegación debe llevar al usuario a esa vista mostrando únicamente los productos asociados a la promoción seleccionada.

Conceptualmente:

**Detalle de Promoción → Resultado de productos de la promoción**

---

# 8. Resultado de productos

Reutilizar:

* Header existente
* Footer existente
* buscador existente
* filtros existentes
* sidebar existente
* cards de producto existentes
* paginación existente
* controles de cantidad existentes
* botón "Agregar al carrito"
* badges
* estados de disponibilidad
* componentes de producto

No duplicar ni reconstruir ninguno de estos elementos.

La única modificación necesaria es representar que el resultado corresponde a:

**Productos de la promoción**

Por ejemplo, mediante un encabezado:

**Productos en promoción**

y mostrar únicamente los productos relacionados con la promoción seleccionada.

---

# 9. Flujo de navegación

Crear únicamente estas interacciones:

### Flujo 1

**Promociones**

↓ clic en banner

**Detalle de Promoción**

---

### Flujo 2

**Detalle de Promoción**

↓ clic en "Ver productos en promoción"

**Resultado de productos**

---

### Flujo 3

Desde Detalle de Promoción:

**Breadcrumb → Promociones**

Regresar a la vista de promociones existente.

---

# 10. Datos simulados

Para demostrar el prototipo, utilizar al menos una promoción existente en la vista actual y asociarla con varios productos.

La relación conceptual debe ser:

**Promoción**
→ Banner
→ Nombre
→ Descripción
→ Bases y condiciones
→ Productos relacionados

Al seleccionar otra promoción, el contenido de detalle debe corresponder a esa promoción.

No es necesario desarrollar backend ni lógica real de consulta.

Utilizar variables/interacciones de Figma para simular la selección de la promoción.

---

# 11. Responsive

La nueva vista debe mantener el comportamiento responsive existente de Autex.

Crear únicamente los ajustes necesarios para:

* Desktop
* Tablet
* Mobile

No modificar el responsive de las vistas existentes.

---

# 12. Restricciones para ahorrar créditos

**NO HACER:**

* No reconstruir la página de Promociones.
* No reconstruir Header.
* No reconstruir Footer.
* No reconstruir el listado de productos.
* No crear nuevas Product Cards.
* No crear nuevos filtros.
* No crear un nuevo buscador.
* No crear un nuevo sistema de navegación.
* No crear un nuevo Design System.
* No modificar innecesariamente componentes existentes.
* No duplicar componentes que ya existan.

**SÍ HACER:**

* Crear únicamente la pantalla Detalle de Promoción.
* Reutilizar componentes existentes.
* Reutilizar Header y Footer existentes.
* Reutilizar estilos existentes.
* Reutilizar la vista de productos existente.
* Agregar las interacciones de navegación.
* Agregar la relación entre promoción y productos.
* Mantener la experiencia visual actual de Autex.

## Resultado esperado

El resultado debe ser un flujo compacto:

**Promociones**
→ **clic en banner**
→ **Detalle de Promoción**
→ **clic en Ver productos en promoción**
→ **Resultado de productos existente**

La prioridad es **reutilizar al máximo lo que ya existe y crear únicamente los elementos que realmente hacen falta para la nueva vista de Detalle de Promoción.**
