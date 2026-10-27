# LIIC Aprende

Plataforma web de apoyo al aprendizaje práctico del **Laboratorio Integrado de Ingeniería Civil (LIIC)** de la Universidad del Magdalena.

- **Sitio publicado:** https://josevillamizarm.github.io/liic-aprende/
- **Versión:** 1.0 (octubre de 2026). Fase I: asignatura Pavimentos, Práctica 2 – Mezclas Asfálticas.
- **Autor de la Fase I:** José David Villamizar Monterroza, práctica profesional 2026-II, Ingeniería Civil.
- **Contacto del laboratorio:** liic@unimagdalena.edu.co

> El procedimiento completo de administración está en el **Manual de administración de LIIC Aprende** (`docs/`, también Anexo 8 del informe de práctica). Este archivo es un resumen para quien vaya a editar el código.

---

## 1. Estructura del proyecto

| Archivo / carpeta | Contenido |
|---|---|
| `index.html` | Página principal: inicio, el LIIC, áreas, asignaturas, galería y contacto. |
| `modulo.html` | Módulo de la asignatura **Pavimentos** (prácticas y ensayos). |
| `css/styles.css` | Todos los estilos (incluye modo oscuro, celular e impresión). |
| `js/app.js` | Todo el comportamiento: menú, pestañas, buscador, progreso, autoevaluación (`PREGUNTAS`) y video por capítulos. |
| `assets/` | Imágenes: `areas/`, `galeria/`, logo y favicon. |
| `plantillas/ensayo-plantilla.html` | Bloque HTML listo para crear un ensayo nuevo. |
| `plantillas/preguntas-plantilla.js` | Bloque para agregar las preguntas de autoevaluación de un ensayo. |
| `docs/Manual_administracion_LIIC_Aprende.docx` | Manual completo de administración y ampliación de la plataforma. |
| `docs/Formato_validacion_LIIC_Aprende.docx` | Formato para que el docente valide técnicamente los contenidos de cada ensayo. |

No usa frameworks ni base de datos: es HTML, CSS y JavaScript. El progreso del estudiante se guarda solo en su navegador.

## 2. Cómo editar desde GitHub (sin instalar nada)

1. Abra el archivo en el repositorio y pulse el lápiz (**Edit this file**).
2. Haga el cambio y pulse **Commit changes**, con un mensaje que diga qué cambió (ej.: `Corrige temperatura de compactación en guía Marshall`).
3. Espere 1–2 minutos y abra el sitio con **Ctrl + F5**.

Para subir imágenes: entre a la carpeta correcta (`assets/galeria`, por ejemplo) y use **Add file → Upload files**.

> ⚠️ **Siempre suba cada archivo dentro de su carpeta.** Si `app.js` o `styles.css` quedan sueltos en la raíz, la página sigue usando la versión vieja y los botones dejan de funcionar.

> Cuando cambie `css/styles.css` o `js/app.js`, aumente el número `?v=` en las etiquetas `<link>` y `<script>` de `index.html` y `modulo.html` (ej.: `styles.css?v=8` → `?v=9`) para que los navegadores no usen la copia vieja.

## 3. Tareas frecuentes

### Agregar un ensayo a una práctica
1. Copie el bloque de `plantillas/ensayo-plantilla.html` en `modulo.html`, dentro de `<section class="ensayos">`.
2. Use un `data-id` único (minúsculas, sin tildes ni espacios).
3. Si el ensayo estaba como bloqueado (🔒 `ensayoCard bloqueada`), borre ese bloque.
4. Agregue sus preguntas en `js/app.js` → objeto `PREGUNTAS`, con la misma clave del `data-id`.
5. La barra de progreso y el buscador lo detectan solos.

### Habilitar una práctica o una asignatura
- En la tarjeta, cambie `materia bloqueada` por `materia activa` y el estado `Próximamente` por `<div class="estado disponible">Disponible</div>`.
- Para una asignatura nueva: copie `modulo.html` con otro nombre (ej. `geotecnia.html`), cambie el título, el hero, las prácticas y los ensayos, y en `index.html` agregue a su tarjeta el botón:
  `<button class="btnEntrar" data-href="geotecnia.html">Entrar al módulo</button>`

### Video por capítulos
El video se controla con atributos, sin tocar `app.js`:
- En el `<iframe class="videoVimeo">`: `data-video` (ID de Vimeo), `data-h` (hash), `data-inicio` y `data-fin` (segundos del fragmento del ensayo).
- En cada botón `capBtn capPropio`: `data-t` (inicio) y `data-fin` (pausa).
- **Solo se incrustan videos con autorización escrita de su titular**, mostrando el crédito exigido.

### Aviso de validación
Cada ensayo muestra un aviso naranja (`avisoValidacion`) mientras el docente no haya validado el contenido. Cuando se valide con el formato de validación, actualice el texto (versión y fecha) o retire el aviso.

## 4. Reglas de contenido

- Todo contenido técnico nuevo debe revisarlo el docente de la asignatura antes de retirar el aviso de validación.
- Videos y documentos de terceros solo con autorización y con crédito visible.
- Fotos con personas: rostros de menores de edad difuminados.
- Imágenes en `.jpg`, de máximo ~1600 px de ancho y menos de 500 KB.

## 5. Historial de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | Octubre 2026 | Fase I: página institucional del LIIC y módulo de Pavimentos con los ensayos Diseño Marshall (mezclado y elaboración de probetas) y Gravedad específica máxima. Video de la Práctica 2 autorizado por el Centro Innova. Contenido en proceso de validación docente. |
