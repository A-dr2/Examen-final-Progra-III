# Verificación, evidencias y demostración

## Comprobaciones realizadas

El 21/11/2026 se revisó Swagger, se consultaron las tres operaciones públicas sin credenciales y se guardaron las respuestas completas. `npm run verify:api` comprobó HTTP 200, arreglos válidos de catálogos, paquetes activos y coincidencia de ID, nombre y precio entre listado y detalle. Ver `evidence/api-verification.json` para URLs, horas UTC, duración, conteos y el identificador de petición de Railway.

`npm run build` completó la comprobación TypeScript en modo estricto y la compilación Vite. `npm test` pasó **9 pruebas** de contrato HTTP: método y ausencia de credenciales, lista vacía, error 503, JSON inválido, contrato incorrecto, ID equivocado, ID inválido sin consulta, fallo de conexión y validación de importes/búsqueda. Algunas comprobaciones están agrupadas dentro de una misma prueba. Resultados en `evidence/test-results.json`.

En el navegador se observaron 2 paquetes con sus precios, se abrió Essentials mediante una nueva consulta, se verificó el estado cargando y después el detalle, se buscó un texto inexistente y se mostró “No encontramos resultados”. Se limpió la búsqueda, se filtró por presupuesto de ₡60.000 (un paquete) y se filtraron adicionales por Palomitas de maíz (3 opciones). No se inyectaron respuestas falsas en la aplicación.

Se comprobó por HTTP el puente local con respuesta 200, cabecera `X-Upstream-Url` apuntando al proveedor y cabeceras de Railway. También se comprobó `npm run preview`: HTML y los tres GET con estado 200, y ruta no permitida con 405 sin llegar al servidor remoto; ver `evidence/preview-verification.json`. La falta de CORS quedó registrada en `evidence/cors.headers.txt` mediante una consulta con Origin de localhost.

## Capturas incluidas

| Archivo en `evidence/` | Contenido |
| --- | --- |
| `01-interfaz-paquetes.jpg` | Página completa y tarjetas con los paquetes del servicio. |
| `02-detalle-paquete.jpg` | Detalle solicitado por HTTP del paquete seleccionado. |
| `03-sin-resultados.jpg` | Búsqueda sin coincidencias y botón para limpiar filtros. |
| `04-adicionales-filtrados.jpg` | Catálogo real filtrado por Palomitas de maíz. |
| `paquetes.json`, `adicionales.json`, `detalle-paquete.json` | Respuestas completas reales de los tres GET. |
| `api-verification.json` | Registro reproducible de consultas anónimas HTTP 200. |
| `openapi.json`, `swagger-ui-init.js` | Especificación y fuente de documentación usada. |
| `*.headers.txt` | Cabeceras obtenidas directamente por HTTP. |

## Demostración en Network / Red

**Captura pendiente:** el control automatizado del navegador se detuvo al intentar seleccionar Chrome porque no pudo determinar su URL activa con suficiente confianza. No se obtuvo una captura auténtica de DevTools/Network y no se presenta una imagen recreada como evidencia. Las capturas de interfaz y los registros JSON/HTTP sí se obtuvieron. La siguiente demostración debe completarse manualmente antes de entregar si se exige la captura de la pestaña Network.

1. Ejecutar `npm run dev` y abrir `http://127.0.0.1:5174/` en Chrome o Edge.
2. Abrir DevTools con F12 o Ctrl+Shift+I y seleccionar **Network / Red**. Activar **Preserve log / Conservar registro**, elegir **Fetch/XHR**, y recargar la página.
3. Identificar `paquetes` y `opciones-productos-adicionales` con método **GET** y estado **200**. Si no aparecen, pulsar **Actualizar catálogo**.
4. Abrir cada fila: en **Headers / Encabezados**, comprobar `Request URL`, `Request Method: GET`, `Status Code: 200`, `Content-Type: application/json`, `X-Upstream-Url` y `X-Railway-Request-Id`. No debe existir Authorization ni Cookie de la API.
5. En **Response / Respuesta**, comprobar que son los arreglos JSON que usa la pantalla: ID, nombre y precio, no HTML. Comparar Essentials y Premium con sus tarjetas; en adicionales comparar nombre del producto y precio de una opción.
6. Sin cerrar Network, pulsar **Explorar paquete** en Essentials. Aparecerá una nueva solicitud `1` a `/consulta/public/paquetes/1`, HTTP 200. En Response comprobar `id: 1`, `precioColones: 60000` y `paquetesServicios`. El ID debe corresponder a la selección real si el catálogo cambió.
7. Guardar capturas de la lista con los tres GET y de la respuesta de cada uno en `evidence/`. Opcionalmente exportar un HAR sanitizado para la revisión. Network muestra el salto navegador → Vite; `X-Upstream-Url` y los registros directos documentan Vite → API real.

Para demostrar carga con claridad, seleccionar **Slow 3G** en Network y pulsar Actualizar; restaurar **No throttling** al terminar. Para probar el error sin alterar datos, activar **Offline**, actualizar y comprobar el mensaje y Reintentar; después volver a **Online** y reintentar. Son pasos reproducibles pendientes; no se afirma haber capturado un error de red en el navegador ni una prueba móvil.

## Defensa breve

“Seleccioné dos catálogos públicos y el detalle público de paquetes. Revisé Swagger y confirmé los tres GET sin tokens. React separa presentación, hook de carga y cliente HTTP; la respuesta se valida antes de mostrarla. La búsqueda y los filtros trabajan sobre datos recibidos del servicio. Un AbortController evita que una respuesta vieja reemplace una selección nueva, y un timeout permite reintentar. La principal limitación fue CORS: Vite reenvía solo estos GET al proveedor, sin cambiarlo ni reemplazar los datos. Los nombres y cantidades inconsistentes se muestran tal como llegan.”

## Estado de entrega

- Proyecto ejecutable, fuente, lockfile, ficha y justificación: incluidos.
- Tres consultas públicas reales y respuestas: comprobadas e incluidas.
- Capturas de interfaz funcional: incluidas.
- Capturas auténticas de la pestaña Network: pendientes por la limitación de control del navegador descrita.
- Repositorio indicado por el estudiante: [A-dr2/Examen-final-Progra-III](https://github.com/A-dr2/Examen-final-Progra-III), rama [codex/villa-penas](https://github.com/A-dr2/Examen-final-Progra-III/tree/codex/villa-penas). Se conserva el historial previo. El conector GitHub no ofrece escritura en esta sesión, pero la comprobación de publicación con las credenciales Git locales resultó satisfactoria. La publicación se realiza mediante Git; ver `evidence/GIT.md`.
