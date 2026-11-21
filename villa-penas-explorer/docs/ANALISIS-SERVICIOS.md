# Ficha breve de análisis de servicios

Fecha de comprobación: **21 de noviembre de 2026**, Costa Rica. Documentación: [Swagger API Villa Peñas](https://villa-penas-production.up.railway.app/api/docs). Versión declarada: 1.0, OpenAPI 3.0.0.

## Selección y acceso público

Se descargó `swagger-ui-init.js` servido por la documentación y se extrajo `swaggerDoc` a `evidence/openapi.json`. Las tres operaciones seleccionadas están en secciones expresamente públicas, no declaran `security` y la especificación no define seguridad global. Se comprobó además el acceso efectivo mediante GET sin Authorization, cookies ni credenciales: todas respondieron HTTP 200.

No se consultan `/clientes`, `/servicios`, `/paquetes` administrativos ni reservaciones: Swagger exige `access-token` para esas operaciones. Un nombre de recurso parecido no vuelve pública una operación protegida.

Base de las consultas: `https://villa-penas-production.up.railway.app`, **sin `/api`**. Confundir la ubicación de Swagger con el prefijo de recursos produce 404.

| Recurso / operación GET | Datos relevantes | Uso dentro de la interfaz |
| --- | --- | --- |
| 1. `/public/paquetes` — listar paquetes públicos | Arreglo de paquetes activos: `id`, `nombre`, `descripcion`, `precioColones`, `activo`, `paquetesServicios[]`. Cada relación contiene `orden` y `servicio.nombre`. | Tarjetas de paquetes, precio CRC, resumen de servicios, búsqueda, presupuesto y orden. `id` permite solicitar el detalle correcto. |
| 2. `/public/opciones-productos-adicionales` — listar opciones públicas | Arreglo de opciones disponibles: `id`, `nombre`, `descripcion` nullable, `unidadMedida`, `cantidadIncluida`, `cantidadPersonas`, `precioVentaColones`; `productoAdicional.{id,nombre,descripcion,imagenUrl}`. | Tarjetas con fotografía real, nombre de opción, producto, personas, cantidades y precio; filtro por producto y presupuesto. Si `descripcion` es null, se utiliza la descripción del producto de la misma respuesta. |
| 3. `/public/paquetes/{id}` — consultar paquete público | Objeto de paquete activo. Los mismos datos del paquete y `paquetesServicios[].{id,orden,cantidad,detalle,servicio}`; del servicio se consumen `nombre`, `descripcion`, `unidadMedida`. Documenta 404 si no existe o no es público. | Diálogo remoto al elegir un paquete. Lista todos los servicios en orden, su descripción y cantidades/observaciones disponibles. El precio se muestra con la respuesta de detalle. |

## Justificación

Los dos catálogos permiten explorar la oferta y sus complementos. El detalle es una operación GET distinta y útil para comprobar el paquete actual antes de decidir: se solicita de nuevo por HTTP, aunque el listado ya incluya relaciones. Esto cubre **tres endpoints**, dos familias de recursos y un recorrido coherente de exploración, sin necesitar información privada ni escrituras.

Se omiten fechas internas de creación y actualización porque no ayudan a comparar planes. Se conserva el orden de servicios publicado por el backend. Los importes se reciben como números y se presentan mediante `Intl.NumberFormat('es-CR', {currency:'CRC'})` sin realizar conversiones monetarias.

## Resultados reales observados

| Operación ejecutada | HTTP | Resultado |
| --- | --- | --- |
| GET `/public/paquetes` | 200 | 2 paquetes: Essentials por ₡60.000 y Premium por ₡80.000. |
| GET `/public/opciones-productos-adicionales` | 200 | 10 opciones distribuidas entre 4 productos. |
| GET `/public/paquetes/1` | 200 | Essentials, con 6 relaciones de servicios y el mismo ID/precio del listado. |

Estos son resultados observados en la fecha indicada; no son constantes de la aplicación. Los catálogos pueden cambiar. Los archivos JSON de evidencia son una instantánea para revisión y no se usan como fuente de datos de la interfaz.

## Limitaciones detectadas

- CORS no autoriza localhost: se usa el puente GET restringido de Vite, también configurado para preview, sin modificar el backend. Network muestra la solicitud al puente y la URL real en `X-Upstream-Url`.
- Swagger explica las operaciones, pero no aporta un esquema de respuesta JSON detallado para estos GET. Los tipos se construyeron a partir de las respuestas reales y se validan en tiempo de ejecución antes de renderizar.
- El listado no documenta búsqueda ni paginación para estos endpoints públicos. Los filtros se aplican en el cliente sobre el catálogo realmente recibido; no se inventan parámetros del servidor.
- Hay inconsistencias de contenido: la primera opción de palomitas se llama “15 porciones”, pero `cantidadIncluida` y `cantidadPersonas` devuelven 10. Premium menciona un paquete “Exclusivo” que no aparece en el listado público. Se conservan esos valores y textos del servicio; no se corrige el backend ni se infieren productos.
- No se consulta disponibilidad por fecha, no se reservan eventos ni se procesan pagos. El catálogo no demuestra disponibilidad para una fecha concreta.
- La docente debe corroborar los recursos disponibles antes del examen, como indica el enunciado. La comprobación de hoy no garantiza disponibilidad futura.
