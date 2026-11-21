# Villa Peñas · Explorador del catálogo público

Aplicación de consulta para el examen práctico de Programación Web. React + TypeScript + Vite. Consume **tres operaciones GET públicas reales**, sin credenciales y sin modificar el backend de Villa Peñas.

## Iniciar

Requisitos: Node.js 22 o posterior compatible, npm e Internet.

```powershell
cd villa-penas-explorer
npm ci
npm run dev
```

Abrir la dirección que muestra Vite, normalmente **http://127.0.0.1:5174/**. En Windows también se puede ejecutar `Iniciar-Villa-Penas.cmd`, que instala dependencias si faltan y abre el navegador.

```powershell
npm run build
npm run preview
```

La vista de producción local se sirve en **http://127.0.0.1:4174/**. No abrir `dist/index.html` con doble clic.

## Consultas implementadas

Origen real: `https://villa-penas-production.up.railway.app`. La ruta `/api` corresponde a la documentación; **no** es el prefijo de estos recursos.

| Operación | Uso |
| --- | --- |
| GET `/public/paquetes` | Catálogo, precio y resumen de servicios incluidos. |
| GET `/public/opciones-productos-adicionales` | Opciones, fotografías, cantidades, personas y precio de adicionales. |
| GET `/public/paquetes/{id}` | Detalle actualizado de un paquete elegido desde el catálogo real. |

La consulta de detalle es una tercera operación documentada, aunque pertenece al mismo recurso de paquetes. El identificador se obtiene del listado; no se supone que exista un ID fijo en la aplicación.

Fuente: [Swagger Villa Peñas](https://villa-penas-production.up.railway.app/api/docs). Análisis completo: [docs/ANALISIS-SERVICIOS.md](docs/ANALISIS-SERVICIOS.md).

## Interacciones y estados

- Búsqueda por nombre, descripción y servicios, sin distinguir tildes o mayúsculas.
- Presupuesto máximo y orden por nombre o precio.
- Filtro por categoría de producto adicional.
- Detalle remoto con servicios completos, cantidad y observaciones cuando existen.
- Cargando, sin resultados, error con reintento y espera máxima de 20 segundos.
- Botón para actualizar los dos catálogos. Las consultas funcionan de manera independiente: un error en uno no elimina el otro.
- Diálogo nativo con Escape, foco recuperado al cerrar, etiquetas de formularios y mensajes accesibles.

## CORS y ejecución

La API respondió HTTP 200, pero **no devolvió `Access-Control-Allow-Origin` para localhost**. Por eso el navegador usa `/consulta/public/...` en el mismo origen de Vite. El proxy de `vite.config.ts` reenvía cada GET al servidor real por HTTPS y devuelve su respuesta; no genera datos ni lee las evidencias guardadas.

El puente admite únicamente las tres rutas elegidas y GET. Elimina Cookie, Authorization y Origin antes de reenviar. La cabecera de respuesta `X-Upstream-Url` identifica la URL real en Network. Tanto `npm run dev` como `npm run preview` incluyen esta configuración. No hay claves ni inicio de sesión.

**Limitación de despliegue:** publicar solo `dist/` en un alojamiento estático no incorpora este proxy. Para un despliegue externo se necesita un proxy equivalente en el alojamiento o que el proveedor habilite CORS. El entregable es ejecutable localmente; no se ha publicado en Sites ni se ha alterado el servicio remoto.

## Verificación

```powershell
npm test
npm run verify:api
```

`test` verifica el contrato del cliente HTTP y sus errores con respuestas controladas exclusivamente en pruebas. `verify:api` consulta los tres endpoints reales sin credenciales, comprueba que Swagger no les exige autenticación, verifica HTTP 200 y la relación listado/detalle, y actualiza los JSON de `evidence/`.

Ver [docs/VERIFICACION.md](docs/VERIFICACION.md) para resultados, limitaciones y procedimiento de demostración en Network. La aplicación no importa archivos de `evidence/`, no usa arreglos de catálogo estáticos y no sustituye el servicio en caso de fallo.

## Estructura

```text
src/services/api.ts           HTTP, validación de respuestas y errores
src/hooks/useResource.ts      carga, cancelación, timeout y reintento
src/types.ts                 tipos de paquetes, servicios y adicionales
src/components/              tarjetas, detalle y estados reutilizables
src/App.tsx                  búsquedas, filtros y coordinación de vistas
scripts/verify-api.mjs        comprobación reproducible con el servicio real
tests/api.test.ts             pruebas del contrato y fallos HTTP
docs/                        ficha, justificación y comprobaciones
evidence/                    respuestas reales, Swagger y capturas
```

La ilustración de la cabecera está hecha con CSS y es decorativa; no representa una fotografía del establecimiento. Las fotografías de adicionales proceden del campo `imagenUrl` de la API. Si una imagen falla, aparece un icono, sin fabricar información.

## Entrega y repositorio

El paquete `Entrega-Villa-Penas.zip` contiene el código, lockfile, documentación y evidencias, sin `node_modules` ni `dist`. Repositorio de destino indicado por el estudiante: [A-dr2/Examen-final-Progra-III](https://github.com/A-dr2/Examen-final-Progra-III). La entrega está en la rama [codex/villa-penas](https://github.com/A-dr2/Examen-final-Progra-III/tree/codex/villa-penas), dentro de `villa-penas-explorer/`, conservando el historial previo. Al clonar, seleccionar esa rama:

```powershell
git clone --branch codex/villa-penas https://github.com/A-dr2/Examen-final-Progra-III.git
cd Examen-final-Progra-III/villa-penas-explorer
npm ci
npm run dev
```

Si la sesión no dispone de permisos para publicar, ejecutar desde la raíz del repositorio local con una cuenta que tenga escritura:

```powershell
git push -u origin codex/villa-penas
```

Revisar el contenido y comprender el flujo antes de la defensa individual. Proyecto elaborado con asistencia de IA.
