# Rediseño del Login — Administrador Autex

## Objetivo

Modificar el **login actual de Autex** para sustituir su diseño visual por una nueva propuesta de interfaz basada en la referencia proporcionada.

**Importante:** conservar toda la funcionalidad actual del login. El cambio debe enfocarse principalmente en la estructura visual, composición, estilos y presentación de la pantalla.

No crear un login independiente ni duplicar la funcionalidad existente.

---

## Referencia visual

Utilizar la imagen de referencia proporcionada como guía principal para la nueva composición visual.

La referencia presenta un login dividido en dos áreas:

* **Panel izquierdo:** formulario de autenticación.
* **Panel derecho:** imagen fotográfica de acompañamiento.

La composición debe conservar esta lógica visual, pero adaptarse correctamente al Design System y branding actual de Autex.

---

# 1. Estructura general

Crear una pantalla de login de escritorio dividida aproximadamente en dos columnas:

### Panel izquierdo

Área destinada al formulario.

Ancho aproximado: **50% de la pantalla**.

Debe contener:

1. Logo Autex.
2. Título.
3. Texto descriptivo.
4. Campo de correo electrónico.
5. Campo de contraseña.
6. Opción "Mantener mi sesión iniciada".
7. Enlace "¿Olvidaste tu contraseña?"
8. Botón "Iniciar sesión".
9. Área informativa de credenciales de prueba, únicamente si este elemento ya existe en el login actual.

### Panel derecho

Área visual de acompañamiento.

Ancho aproximado: **50% de la pantalla**.

Utilizar una imagen fotográfica relacionada con el sector automotriz.

**La imagen será proporcionada posteriormente.**

No generar una imagen artificial ni utilizar una imagen genérica como sustitución definitiva.

Dejar preparada la estructura para que la imagen proporcionada pueda incorporarse fácilmente.

La imagen debe:

* ocupar todo el panel derecho
* utilizar `object-fit: cover`
* conservar una composición visual adecuada
* ocupar el 100% de la altura disponible
* integrarse visualmente con el branding Autex

Agregar sobre la imagen un overlay azul/transparente similar al de la referencia para mantener la identidad visual.

---

# 2. Logo

Utilizar **el logo Autex que ya existe dentro de los archivos/proyecto de Figma Make**.

No crear un nuevo logotipo.

No redibujar el logo.

No sustituirlo por texto.

Utilizar el asset existente y respetar sus proporciones originales.

Ubicarlo en la parte superior izquierda del panel del formulario, siguiendo aproximadamente la posición de la referencia.

---

# 3. Formulario

Conservar los campos y funcionalidades existentes del login actual.

## Correo electrónico

Label:

**Correo electrónico**

Placeholder:

**Ingresa tu correo electrónico**

Mantener:

* estado default
* focus
* error
* disabled
* validación

---

## Contraseña

Label:

**Contraseña**

Placeholder:

**Ingresa tu contraseña**

Mantener el control para:

* mostrar contraseña
* ocultar contraseña

Utilizar el mismo patrón de interacción existente en Autex.

---

# 4. Opciones secundarias

Debajo de los campos mostrar:

### Checkbox

**Mantener mi sesión iniciada**

### Enlace

**¿Olvidaste tu contraseña?**

Mantener ambos elementos alineados horizontalmente en desktop.

El enlace debe conservar el comportamiento actual de recuperación de contraseña.

---

# 5. Botón

Crear botón principal:

**Iniciar sesión**

Debe conservar la funcionalidad actual de autenticación.

Crear los estados:

* Default
* Hover
* Pressed
* Focus
* Disabled
* Loading
* Error

El estado Disabled debe utilizarse cuando las credenciales requeridas no estén completas o no cumplan las validaciones actuales.

---

# 6. Mensajes y validaciones

Conservar las validaciones existentes del login.

No modificar la lógica de autenticación.

Diseñar visualmente los estados necesarios:

### Campos vacíos

Mostrar el mensaje correspondiente debajo del campo.

### Correo inválido

Mostrar un mensaje claro indicando que el correo no tiene un formato válido.

### Credenciales incorrectas

Mostrar un mensaje general de autenticación fallida.

No revelar si el correo o la contraseña específicamente son incorrectos.

### Cargando

Cuando se presione "Iniciar sesión", mostrar estado de carga en el botón y evitar múltiples envíos.

---

# 7. Credenciales de prueba

Si el login actual contiene un bloque de **Credenciales de prueba**, conservarlo.

Adaptarlo visualmente al nuevo diseño para que no compita con el formulario principal.

Mantener la información y funcionalidad existente.

No inventar nuevas credenciales.

---

# 8. Responsive

Diseñar comportamiento responsive.

### Desktop

Mantener la composición de dos columnas:

**Formulario | Imagen**

### Tablet

Reducir proporcionalmente el panel visual y mantener el formulario completamente usable.

### Mobile

Cambiar a una sola columna.

Mostrar:

**Logo → formulario → acciones**

La imagen puede:

* ocultarse completamente, o
* convertirse en un elemento visual reducido en la parte superior.

Priorizar siempre la usabilidad del formulario.

---

# 9. Imagen de acompañamiento

La imagen definitiva será proporcionada posteriormente.

Preparar un contenedor específico denominado:

**Login Hero Image**

para poder reemplazar fácilmente el asset.

La imagen debe utilizar:

* `object-fit: cover`
* ancho 100%
* alto 100%

Agregar un overlay azul sobre la imagen.

El overlay debe ser un elemento independiente para poder modificar posteriormente:

* color
* opacidad
* intensidad

No combinar permanentemente el overlay con la imagen.

---

# 10. Design System

Mantener la identidad visual de Autex.

Reutilizar, cuando existan:

* colores
* tipografía
* inputs
* botones
* checkbox
* iconografía
* espaciados
* radios
* sombras
* estados de interacción

No introducir un nuevo Design System.

Si algún elemento necesario no existe, crearlo siguiendo visualmente los patrones existentes.

---

# 11. Componentización

Crear componentes reutilizables para:

* Login Layout
* Logo Autex
* Input
* Password Input
* Checkbox
* Link
* Primary Button
* Validation Message
* Login Hero Image
* Overlay

Crear variantes para los estados necesarios.

Utilizar Auto Layout.

Utilizar Variables cuando sea conveniente para:

* colores
* espaciados
* estados
* opacidad del overlay

---

# 12. Resultado esperado

El resultado debe ser una pantalla de login visualmente similar a la referencia proporcionada, pero integrada al ecosistema visual de Autex.

La estructura final debe ser:

┌───────────────────────────┬──────────────────────────────┐
│                           │                              │
│       LOGO AUTEX          │                              │
│                           │                              │
│       Administrador       │       IMAGEN AUTOMOTRIZ      │
│                           │                              │
│  Texto descriptivo       │       + OVERLAY AZUL         │
│                           │                              │
│  Correo electrónico      │                              │
│  [********************]  │                              │
│                           │                              │
│  Contraseña              │                              │
│  [********************]  │                              │
│                           │                              │
│  □ Mantener sesión       │                              │
│              ¿Olvidaste? │                              │
│                           │                              │
│  [    Iniciar sesión   ] │                              │
│                           │                              │
│  Credenciales de prueba  │                              │
│                           │                              │
└───────────────────────────┴──────────────────────────────┘

## Restricciones importantes

* No modificar la lógica actual de autenticación.
* No eliminar funcionalidades existentes.
* No crear un nuevo logo.
* Utilizar el logo Autex existente en los archivos.
* No generar la imagen de acompañamiento definitiva.
* Dejar preparado el contenedor para sustituirlo posteriormente por la imagen que proporcionaré.
* No cambiar textos funcionales existentes sin necesidad.
* Priorizar consistencia con el Design System actual.
* El resultado debe ser responsive.
* El diseño debe quedar preparado para implementación.
