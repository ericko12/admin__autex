Objetivo:
Diseñar un sistema completo de Backoffice (CMS) para Autex.com.mx que permita a usuarios administradores gestionar contenido comercial (landings, banners, formularios, footer y usuarios) de forma autónoma, con control de acceso por roles.

Contexto:
Usuarios administradores de contenido comercial. Uso en desktop. Necesitan crear, editar, activar y configurar contenido sin depender de desarrollo. Sistema orientado a ecommerce B2B.

Arquitectura / Módulos:

1. Autenticación y control de acceso
2. Gestión de Usuarios
3. Gestión de Landings
4. Gestión de Banners
5. Integración de Formularios (Salesforce)
6. Configuración de Footer

---

Pantallas requeridas:

Autenticación:
- Login (usuario + contraseña)
- Estados: error credenciales, sesión expirada

Dashboard:
- Menú lateral con módulos visibles según permisos
- Header con usuario activo

Usuarios:
- Listado
- Crear / editar

Landings:
- Listado
- Crear / editar
- Vista previa

Banners:
- Listado
- Crear / editar

Footer:
- Configuración editable

---

Módulo 1: Autenticación y control de acceso

Componentes:
- Login form
- Control de sesión
- Roles y permisos
- Header con usuario activo

Interacción:
- Validar credenciales
- Bloquear acceso sin sesión
- Redirigir a login si no hay sesión
- Mostrar menú según permisos
- Bloquear módulos no autorizados
- Permitir logout
- Bloquear acceso a usuarios inactivos

---

Módulo 2: Gestión de Usuarios

Listado:
- Tabla con columnas:
  - Nombre
  - Correo
  - Rol
  - Estatus (Activo / Inactivo)
  - Fecha de creación
  - Acciones (Editar / Desactivar)
- Botón: "Crear usuario"

Formulario:
- Nombre completo
- Correo electrónico (único)
- Contraseña
- Confirmación de contraseña
- Rol (selector)

Roles disponibles:
- Administrador (acceso total)
- Marketing (gestión de banners, landings y footer)
- Visualizador (solo lectura)

Interacción:
- Validar correo único
- Validar coincidencia de contraseñas
- Permitir activar / desactivar usuario
- Confirmación antes de desactivar
- Mensaje de éxito al guardar

Reglas:
- Usuarios inactivos no pueden acceder
- Roles controlan visibilidad de módulos
- Acciones deben quedar registradas por usuario

---

Módulo 3: Landings

Listado:
- Tabla: nombre, URL, estatus, fecha, acciones
- CTA: crear nueva landing

Formulario:
- Nombre interno (requerido)
- URL / slug (único, requerido)
- Título (requerido)
- Descripción
- Imagen principal
- Lista de productos (códigos)
- Código de formulario Salesforce
- Toggle activo/inactivo

Vista previa:
- Imagen
- Título
- Descripción
- Productos (cards)
- Formulario embebido

Interacción:
- Validación campos obligatorios
- Validación slug único
- Edición reutiliza formulario
- Activar/inactivar
- Asociación de productos validando formato
- Renderizar formulario externo

Reglas:
- Solo landings activas visibles en frontend
- No modificar layout, solo contenido
- Landing usable como destino de navegación

---

Módulo 4: Banners

Listado:
- Tabla: sección, vigencia, estatus, acciones

Formulario:
- Sección
- Fecha inicio
- Fecha fin
- URL destino
- Imagen desktop
- Imagen mobile
- Estatus

Interacción:
- Validar vigencia
- Mostrar/ocultar automáticamente por fechas
- Validar imágenes:
  - JPG/PNG
  - Dimensiones y peso
- Bloquear guardado si no cumple validaciones
- Click redirige a URL

Reglas:
- Banner visible solo en vigencia
- No modificar layout

---

Módulo 5: Formularios (Salesforce)

Componentes:
- Campo para código embebido

Interacción:
- Guardar código
- Validar formato básico
- Mostrar error si inválido
- Renderizar en landing
- Permitir actualización

Reglas:
- No modificar lógica del formulario
- Envío directo a Salesforce
- Respetar comportamiento externo
- Mantener responsividad

---

Módulo 6: Footer

Componentes:
- Enlaces
- Textos legales
- Datos de contacto
- Redes sociales

Interacción:
- Editar enlaces (nombre + URL)
- Agregar/eliminar
- Validar URLs
- Editar contacto y redes
- Guardar y reflejar en frontend

Reglas:
- No modificar layout
- Solo contenido editable
- Validar campos obligatorios

---

Interacción global:

- Validaciones en tiempo real
- Botones deshabilitados hasta cumplir reglas
- Confirmaciones en acciones críticas (eliminar, desactivar)
- Mensajes:
  - Error
  - Éxito
- Estados:
  - Empty
  - Loading
  - Error
  - Success

---

Estilo visual:

- UI tipo CMS moderno
- Jerarquía clara
- Uso de tablas y cards
- Espaciado amplio
- Estados visibles (hover, focus, error, disabled)
- Consistencia entre módulos

---

Restricciones:

- Responsive (desktop prioritario)
- No drag & drop layout builder
- Componentes reutilizables
- Estructura fija de frontend

---

Resultado esperado:

- Prototipo navegable completo
- Flujos entre autenticación, usuarios y módulos de contenido
- Estados definidos
- Componentes reutilizables
- Experiencia consistente en todo el sistema