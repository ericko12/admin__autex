# NFR UX/UI — Módulo: Catálogo Extendido
**AdminAutex · Versión 1.0**
**Fecha:** Junio 2026

---

## Índice
1. [Rendimiento percibido](#1-rendimiento-percibido)
2. [Retroalimentación visual](#2-retroalimentación-visual)
3. [Búsqueda y filtrado](#3-búsqueda-y-filtrado)
4. [Switch de estado (Activo / Inactivo)](#4-switch-de-estado)
5. [Selección múltiple y acciones en lote](#5-selección-múltiple-y-acciones-en-lote)
6. [Confirmación de acciones críticas](#6-confirmación-de-acciones-críticas)
7. [Bitácora de cambios](#7-bitácora-de-cambios)
8. [Diseño responsivo](#8-diseño-responsivo)
9. [Accesibilidad (a11y)](#9-accesibilidad)
10. [Consistencia visual](#10-consistencia-visual)

---

## 1. Rendimiento percibido

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-01 | La lista de productos debe renderizarse en menos de **500 ms** con hasta 500 registros. | El listado visible se pinta antes de que el usuario note espera. |
| NFR-CE-02 | El filtrado por búsqueda (SKU, nombre, categoría) debe aplicarse en tiempo real, **sin debounce mayor a 300 ms**. | El resultado se actualiza mientras el usuario escribe, sin lag perceptible. |
| NFR-CE-03 | El cambio de filtro de estado (Todos / Activos / Inactivos) debe reflejar el resultado de forma **inmediata (<100 ms)**. | No se muestra spinner; el cambio es instantáneo al seleccionar la opción. |
| NFR-CE-04 | La apertura del modal de Bitácora debe completarse en **menos de 200 ms**. | No se percibe demora al hacer clic en el botón Bitácora. |

---

## 2. Retroalimentación visual

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-05 | Cada cambio de estado individual (activar / desactivar) debe mostrar una **notificación toast** en la esquina superior derecha. | El toast aparece en ≤300 ms tras la acción y desaparece automáticamente después de 3.5 s. |
| NFR-CE-06 | El toast debe indicar claramente el **SKU afectado** y la **acción realizada** (activado / desactivado). | Texto mínimo: `"Producto [SKU] activado/desactivado correctamente"`. |
| NFR-CE-07 | El switch debe reflejar visualmente el cambio de estado de forma **inmediata** al hacer clic, sin esperar confirmación del servidor (optimistic UI). | El thumb del switch se desplaza en el mismo frame del clic. |
| NFR-CE-08 | Las filas seleccionadas mediante checkbox deben destacarse con un **fondo diferenciado** (bg-blue-50) para indicar selección activa. | Visible en todas las filas seleccionadas de forma simultánea. |
| NFR-CE-09 | Los cambios en lote deben mostrar un **toast resumen** indicando la cantidad de productos afectados. | Texto: `"N producto(s) activados/desactivados correctamente"`. |
| NFR-CE-10 | Los contadores de estadísticas (Total / Activos / Inactivos) deben actualizarse **en tiempo real** tras cada cambio de estado. | Los números cambian sin recargar la vista. |

---

## 3. Búsqueda y filtrado

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-11 | El campo de búsqueda debe incluir un **botón de limpiar (×)** visible solo cuando hay texto ingresado. | Al hacer clic en ×, el campo se vacía y el listado vuelve al estado sin filtro. |
| NFR-CE-12 | Cuando la búsqueda no produce resultados, debe mostrarse un **estado vacío** con ícono y mensaje descriptivo. | Mensaje: `"No se encontraron productos con los filtros aplicados"`. |
| NFR-CE-13 | El filtro de estado debe cerrarse automáticamente al seleccionar una opción (dropdown de un solo paso). | No requiere botón de "Aplicar"; la selección es inmediata. |
| NFR-CE-14 | El pie de la tabla debe mostrar siempre el conteo `"Mostrando X de Y productos"` actualizado con los filtros activos. | Visible en todo momento debajo de la lista. |

---

## 4. Switch de estado

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-15 | El switch activo debe mostrarse en **verde (#22c55e)** y el inactivo en **gris (#d1d5db)**. | Sin ambigüedad visual entre los dos estados. |
| NFR-CE-16 | Debajo de cada switch debe mostrarse la **etiqueta de texto** del estado actual ("Activo" / "Inactivo"). | El usuario puede identificar el estado sin depender únicamente del color. |
| NFR-CE-17 | El switch debe tener un área de clic mínima de **44 × 44 px** para facilitar la interacción táctil. | Cumple guías WCAG 2.1 de target size. |
| NFR-CE-18 | El switch debe recibir foco con teclado y ser operable con `Space` / `Enter`. | Accesible sin ratón. |

---

## 5. Selección múltiple y acciones en lote

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-19 | El **checkbox maestro** en el encabezado debe seleccionar / deseleccionar todos los productos visibles en la vista actual (aplicando los filtros activos). | Si hay filtro de búsqueda, solo selecciona los resultados filtrados. |
| NFR-CE-20 | La barra de acciones en lote debe ser **visible solo cuando hay al menos 1 producto seleccionado** y ocultarse al limpiar la selección. | No ocupa espacio cuando no hay selección activa. |
| NFR-CE-21 | La barra de acciones en lote debe mostrar de forma prominente el **número de productos seleccionados** antes de los botones de acción. | Texto: `"N producto(s) seleccionado(s)"`. |
| NFR-CE-22 | Los botones "Activar selección" y "Desactivar selección" deben estar **diferenciados por color** (verde / rojo) para evitar errores. | No pueden tener el mismo color o estilo. |

---

## 6. Confirmación de acciones críticas

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-23 | Toda desactivación masiva de **más de 10 productos simultáneamente** debe requerir confirmación mediante un **modal de alerta** antes de ejecutarse. | El modal debe mostrar la cantidad de productos afectados y dos opciones: confirmar o cancelar. |
| NFR-CE-24 | El modal de confirmación debe incluir un **aviso de advertencia** (ámbar) que indique el impacto de la acción. | El usuario comprende las consecuencias antes de confirmar. |
| NFR-CE-25 | El botón de acción destructiva en el modal debe estar visualmente diferenciado en **rojo** y ser el menos accesible por defecto (foco inicial en "Cancelar"). | Se minimiza la acción accidental. |
| NFR-CE-26 | Al cancelar el modal, el estado del sistema debe permanecer **sin cambios**; la selección de productos debe mantenerse intacta. | No hay side effects al cancelar. |

---

## 7. Bitácora de cambios

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-27 | La bitácora debe registrar **cada cambio de estado** de forma individual, incluso cuando el cambio proviene de una acción en lote. | Si se modifican 5 productos, se generan 5 entradas separadas en la bitácora. |
| NFR-CE-28 | Cada entrada de bitácora debe mostrar: **SKU, nombre del producto, estado anterior, estado nuevo, usuario responsable y timestamp** completo (fecha + hora + segundos). | Todos los campos son visibles en la vista de listado de la bitácora. |
| NFR-CE-29 | El estado anterior y el nuevo deben mostrarse con **etiquetas de color diferenciadas** (verde para Activo, rojo/gris para Inactivo). | Identificación visual inmediata sin leer el texto. |
| NFR-CE-30 | El modal de bitácora debe mostrar los registros en **orden cronológico descendente** (el más reciente primero). | Acceso rápido al último cambio realizado. |
| NFR-CE-31 | El ícono / botón de bitácora debe mostrar un **badge con el número de registros** de la sesión actual cuando hay cambios. | El usuario sabe cuántos cambios ha realizado sin abrir el modal. |

---

## 8. Diseño responsivo

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-32 | El módulo debe ser funcional en pantallas desde **1024 px de ancho** (resolución mínima de escritorio del AdminAutex). | No hay overflow horizontal ni elementos cortados en 1024 px. |
| NFR-CE-33 | Las columnas de la tabla deben mantener las **proporciones definidas**: checkbox (48 px fijo) · imagen (80 px fijo) · descripción (flexible) · switch (100 px fijo). | El layout no colapsa ni desborda en el rango de pantallas soportado. |
| NFR-CE-34 | Las imágenes de producto en la tabla deben tener un **tamaño fijo de 56 × 56 px** con `object-contain` para no distorsionar el aspecto. | Todas las imágenes se muestran completas sin recorte. |

---

## 9. Accesibilidad

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-35 | Los switches deben usar el rol ARIA `role="switch"` con `aria-checked` actualizado dinámicamente. | Lectores de pantalla anuncian el estado actual del switch. |
| NFR-CE-36 | Los checkboxes de selección deben tener un **label accesible** que identifique el producto (no solo "checkbox"). | `aria-label="Seleccionar [nombre del producto]"`. |
| NFR-CE-37 | Los modales (confirmación y bitácora) deben **atrapar el foco** mientras están abiertos y devolvérselo al elemento que los abrió al cerrarse. | Cumple patrón ARIA Modal Dialog. |
| NFR-CE-38 | El contraste de texto en estados de disponibilidad (badges) debe cumplir **WCAG AA (ratio ≥ 4.5:1)**. | Válido para texto sobre fondo de color (verde, gris, rojo). |

---

## 10. Consistencia visual

| ID | Requisito | Criterio de aceptación |
|----|-----------|----------------------|
| NFR-CE-39 | Los toasts del módulo deben usar el mismo **sistema de notificación** del AdminAutex (color, tipografía, posición y duración). | Reutilizar el componente de toast existente; no crear uno ad hoc. |
| NFR-CE-40 | Los modales deben seguir la estructura del componente `<Modal>` del AdminAutex: overlay oscuro, `border-radius: 16px`, `max-width` parametrizable. | No crear modales con estilos propios fuera del design system interno. |
| NFR-CE-41 | Los chips de SKU y categoría en la tabla deben usar los mismos tokens de color que el resto del panel de administración. | `bg-blue-50 / text-blue-600` para SKU · `bg-gray-100 / text-gray-600` para categoría. |
| NFR-CE-42 | El ícono del módulo en el sidebar y en la pantalla de Bienvenida debe ser consistente (**BookOpen** de lucide-react, color `text-blue-600`). | Mismo ícono en todas las referencias al módulo. |

---

## Glosario

| Término | Definición |
|---------|-----------|
| **Toast** | Notificación temporal no bloqueante que aparece en la esquina de la pantalla |
| **Switch** | Control de alternancia visual (toggle) para activar o desactivar un producto |
| **Bitácora** | Registro cronológico de todos los cambios de estado realizados en la sesión |
| **Acción en lote** | Operación que afecta a múltiples productos seleccionados simultáneamente |
| **Estado vacío** | Vista que se muestra cuando una búsqueda o filtro no retorna resultados |
| **Optimistic UI** | Patrón donde la interfaz refleja el cambio antes de recibir confirmación del servidor |

---

*Documento generado para el equipo de desarrollo de AUTEX. Revisión requerida por UX Lead antes de sprint planning.*
