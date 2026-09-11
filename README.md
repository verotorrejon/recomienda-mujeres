# Recomienda Mujeres

Versión 2 del MVP estático de Recomienda Mujeres, preparada para publicarse directamente con GitHub Pages. El proyecto usa únicamente HTML, CSS, JavaScript y archivos locales: no requiere instalar dependencias, conectar una base de datos ni contratar servicios externos.

## Cómo reemplazar la versión publicada

1. Descarga y descomprime el ZIP entregado.
2. Copia **todo su contenido**, incluida la carpeta `assets`, en la raíz del repositorio `recomienda-mujeres`.
3. Reemplaza los archivos anteriores cuando GitHub lo solicite.
4. Confirma los cambios en la rama que ya utiliza GitHub Pages.

La portada debe quedar en la raíz como `index.html`. Las rutas son relativas y funcionan bajo `https://verotorrejon.github.io/recomienda-mujeres/`.

## Estructura

- `index.html`: portada, banners, buscador, categorías, perfiles, eventos, contenido, planes y countdown.
- `catalogo.html`: catálogo de profesionales con búsqueda, filtros y orden.
- `pymes.html`: catálogo de emprendimientos y PYMES.
- `perfil.html`: detalle dinámico de cada perfil mediante `?id=`.
- `eventos.html` y `evento.html`: agenda y detalle de eventos.
- `noticias.html` y `articulo.html`: historias y artículos.
- `podcast.html`, `oportunidades.html` y `alianzas.html`: contenidos y oportunidades.
- `quienes-somos.html`, `como-funciona.html`, `suscripciones.html`, `faq.html` y `contacto.html`: páginas institucionales y comerciales.
- `favoritas.html`: perfiles guardados en el navegador de cada dispositivo.
- `panel.html`: panel demostrativo de gestión y estadísticas.
- `404.html`: salida segura para rutas inexistentes.
- `data.js`: contenido estructurado y principal archivo para editar perfiles, categorías, eventos, planes, banners y textos variables. Incluye 20 profesionales y 20 PYMES demostrativas con cobertura de las 16 regiones de Chile.
- `app.js`: navegación, buscador tolerante a errores, filtros, favoritos, carrusel, countdown y formularios.
- `styles.css`: sistema visual y comportamiento responsive.
- `assets/images`: imágenes locales del sitio.

## Cómo editar contenido

La mayoría de las actualizaciones cotidianas se hacen en `data.js`. Cada registro tiene un `id` estable que conecta catálogos con páginas de detalle. Las profesiones pueden pertenecer a varias áreas mediante el arreglo `areas`, y los perfiles pueden ofrecer varios servicios mediante `services`.

Para cambiar el WhatsApp o Instagram general, edita el objeto `SITE` al inicio de `data.js`.

## Funcionalidades incluidas

- Mega menú jerárquico y navegación móvil.
- Buscador por lenguaje cotidiano, sinónimos, coincidencias parciales y tolerancia a errores simples.
- Catálogos separados, filtros combinables y estado reflejado en la URL.
- Perfiles con galería, servicios, referencias demostrativas, favoritos, compartir, contacto y solicitud de reserva.
- Formulario completo para solicitar un perfil.
- Carrusel de cinco banners con rotación automática, controles manuales y gestos táctiles.
- Countdown funcional hacia Mañana de Wellness del 14 de noviembre de 2026.
- Eventos, artículos, oportunidades, podcast, alianzas y contenido institucional.
- Cuatro planes, flujo de solicitud sin pagos automáticos y panel de estadísticas demostrativas.

## Alcance del piloto

Los perfiles, valoraciones, estadísticas, oportunidades y varios contenidos están identificados como demostrativos. Los formularios preparan mensajes para WhatsApp y permiten revisarlos antes de enviarlos. No existen autenticación, pagos, base de datos, verificación formal ni confirmación de reservas en tiempo real.
