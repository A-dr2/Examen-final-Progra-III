
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "App"
          ]
        }
      },
      "/clientes": {
        "post": {
          "operationId": "ClientesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateClienteDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Clientes"
          ]
        },
        "get": {
          "operationId": "ClientesController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de clientes por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Búsqueda por nombre, apellidos, teléfono o correo",
              "schema": {
                "maxLength": 100,
                "example": "María Rodríguez",
                "type": "string"
              }
            },
            {
              "name": "activo",
              "required": false,
              "in": "query",
              "description": "Filtrar clientes según su estado",
              "schema": {
                "example": true,
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Campo utilizado para ordenar los clientes",
              "schema": {
                "default": "nombre",
                "example": "nombre",
                "type": "string",
                "enum": [
                  "nombre",
                  "apellidos",
                  "telefono",
                  "correo",
                  "activo",
                  "fechaCreacion"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Clientes"
          ]
        }
      },
      "/clientes/{id}": {
        "get": {
          "operationId": "ClientesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Clientes"
          ]
        },
        "patch": {
          "operationId": "ClientesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateClienteDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Clientes"
          ]
        },
        "delete": {
          "operationId": "ClientesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Clientes"
          ]
        }
      },
      "/tipos-evento": {
        "post": {
          "description": "Crea una un tipo de evento para utilizarla posteriormente en las reservaciones.",
          "operationId": "TiposEventoController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateTipoEventoDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Tipo de evento registrado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TipoEvento"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "409": {
              "description": "Ya existe un tipo de evento con el mismo nombre"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Registrar un tipo de evento",
          "tags": [
            "Tipos de evento"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar por nombre, estado y paginar los tipos de evento.",
          "operationId": "TiposEventoController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de registros por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Búsqueda por nombre o descripción",
              "schema": {
                "maxLength": 100,
                "example": "Cumpleaños",
                "type": "string"
              }
            },
            {
              "name": "activo",
              "required": false,
              "in": "query",
              "description": "Filtrar según el estado del tipo de evento",
              "schema": {
                "example": true,
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              }
            },
            {
              "name": "campoOrden",
              "required": false,
              "in": "query",
              "description": "Columna utilizada para ordenar los resultados",
              "schema": {
                "default": "nombre",
                "example": "nombre",
                "type": "string",
                "enum": [
                  "nombre",
                  "descripcion",
                  "activo"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de tipos de evento"
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar y buscar tipos de evento",
          "tags": [
            "Tipos de evento"
          ]
        }
      },
      "/tipos-evento/{id}": {
        "get": {
          "operationId": "TiposEventoController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del tipo de evento",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Tipo de evento encontrado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TipoEvento"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "El tipo de evento no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar un tipo de evento",
          "tags": [
            "Tipos de evento"
          ]
        },
        "patch": {
          "description": "Permite modificar el nombre, descripción o estado.",
          "operationId": "TiposEventoController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del tipo de evento",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateTipoEventoDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Tipo de evento actualizado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TipoEvento"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "404": {
              "description": "El tipo de evento no existe"
            },
            "409": {
              "description": "Ya existe otro tipo de evento con el mismo nombre"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar un tipo de evento",
          "tags": [
            "Tipos de evento"
          ]
        },
        "delete": {
          "description": "No elimina el registro; cambia su estado a inactivo.",
          "operationId": "TiposEventoController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del tipo de evento",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Tipo de evento desactivado correctamente"
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "El tipo de evento no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Desactivar un tipo de evento",
          "tags": [
            "Tipos de evento"
          ]
        }
      },
      "/paquetes": {
        "post": {
          "description": "Crea un paquete con su nombre, descripción y precio vigente.",
          "operationId": "PaquetesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePaqueteDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Paquete registrado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Paquete"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "409": {
              "description": "Ya existe un paquete con el mismo nombre"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Registrar un paquete",
          "tags": [
            "Paquetes"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar, ordenar y paginar los paquetes.",
          "operationId": "PaquetesController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de paquetes por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Búsqueda por nombre, descripción o servicio incluido",
              "schema": {
                "maxLength": 100,
                "example": "Piscina",
                "type": "string"
              }
            },
            {
              "name": "activo",
              "required": false,
              "in": "query",
              "description": "Filtrar paquetes según su estado",
              "schema": {
                "example": true,
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              }
            },
            {
              "name": "precioMinimo",
              "required": false,
              "in": "query",
              "description": "Precio mínimo del paquete en colones",
              "schema": {
                "minimum": 0,
                "example": 50000,
                "type": "number"
              }
            },
            {
              "name": "precioMaximo",
              "required": false,
              "in": "query",
              "description": "Precio máximo del paquete en colones",
              "schema": {
                "minimum": 0,
                "example": 100000,
                "type": "number"
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Campo utilizado para ordenar los resultados",
              "schema": {
                "default": "nombre",
                "example": "nombre",
                "type": "string",
                "enum": [
                  "nombre",
                  "descripcion",
                  "precioColones",
                  "activo",
                  "fechaCreacion"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de paquetes"
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar y buscar paquetes",
          "tags": [
            "Paquetes"
          ]
        }
      },
      "/paquetes/{id}": {
        "get": {
          "operationId": "PaquetesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del paquete",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Paquete encontrado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Paquete"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "El paquete no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar un paquete",
          "tags": [
            "Paquetes"
          ]
        },
        "patch": {
          "description": "Permite modificar el nombre, descripción, precio o estado.",
          "operationId": "PaquetesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del paquete",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePaqueteDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Paquete actualizado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Paquete"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "404": {
              "description": "El paquete no existe"
            },
            "409": {
              "description": "Ya existe otro paquete con el mismo nombre"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar un paquete",
          "tags": [
            "Paquetes"
          ]
        },
        "delete": {
          "description": "No elimina el registro; cambia su estado a inactivo.",
          "operationId": "PaquetesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del paquete",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Paquete desactivado correctamente"
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "El paquete no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Desactivar un paquete",
          "tags": [
            "Paquetes"
          ]
        }
      },
      "/public/paquetes": {
        "get": {
          "description": "Retorna únicamente los paquetes activos disponibles para mostrar en la landing page.",
          "operationId": "PaquetesPublicosController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Listado de paquetes activos"
            }
          },
          "summary": "Listar paquetes públicos",
          "tags": [
            "Paquetes públicos"
          ]
        }
      },
      "/public/paquetes/reporte/pdf": {
        "get": {
          "description": "Genera un PDF público con todos los paquetes activos disponibles.",
          "operationId": "PaquetesPublicosController_reporteTodos",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "summary": "Generar catálogo PDF de paquetes",
          "tags": [
            "Paquetes públicos"
          ]
        }
      },
      "/public/paquetes/{id}/reporte/pdf": {
        "get": {
          "description": "Genera el reporte público en PDF de un paquete específico.",
          "operationId": "PaquetesPublicosController_reporteUno",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "404": {
              "description": "El paquete no existe o no está disponible públicamente"
            }
          },
          "summary": "Generar PDF de un paquete",
          "tags": [
            "Paquetes públicos"
          ]
        }
      },
      "/public/paquetes/{id}": {
        "get": {
          "description": "Retorna un paquete activo específico con sus servicios incluidos.",
          "operationId": "PaquetesPublicosController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Paquete encontrado"
            },
            "404": {
              "description": "El paquete no existe o no está disponible públicamente"
            }
          },
          "summary": "Consultar paquete público",
          "tags": [
            "Paquetes públicos"
          ]
        }
      },
      "/reportes/reservaciones/excel": {
        "get": {
          "description": "Genera un archivo XLSX con las reservaciones, pagos y saldos del período seleccionado.",
          "operationId": "ReportesController_exportarReservacionesExcel",
          "parameters": [
            {
              "name": "fechaDesde",
              "required": true,
              "in": "query",
              "description": "Fecha inicial del período del reporte",
              "schema": {
                "format": "date",
                "example": "2026-08-01",
                "type": "string"
              }
            },
            {
              "name": "fechaHasta",
              "required": true,
              "in": "query",
              "description": "Fecha final del período del reporte",
              "schema": {
                "format": "date",
                "example": "2026-08-31",
                "type": "string"
              }
            },
            {
              "name": "estado",
              "required": false,
              "in": "query",
              "description": "Filtrar por estado de la reservación",
              "schema": {
                "example": "CONFIRMADA",
                "type": "string",
                "enum": [
                  "COTIZACION",
                  "PENDIENTE",
                  "CONFIRMADA",
                  "CANCELADA",
                  "REALIZADA"
                ]
              }
            },
            {
              "name": "vendedorId",
              "required": false,
              "in": "query",
              "description": "Identificador del vendedor",
              "schema": {
                "minimum": 1,
                "example": 3,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Archivo Excel generado correctamente.",
              "content": {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
                  "schema": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            },
            "400": {
              "description": "Las fechas o filtros del reporte no son válidos."
            },
            "401": {
              "description": "El usuario no está autenticado."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Exportar reporte de reservaciones a Excel",
          "tags": [
            "Reportes"
          ]
        }
      },
      "/reportes/reservaciones/pdf": {
        "get": {
          "description": "Genera un documento PDF con las reservaciones, pagos y saldos del período seleccionado.",
          "operationId": "ReportesController_exportarReservacionesPdf",
          "parameters": [
            {
              "name": "fechaDesde",
              "required": true,
              "in": "query",
              "description": "Fecha inicial del período del reporte",
              "schema": {
                "format": "date",
                "example": "2026-08-01",
                "type": "string"
              }
            },
            {
              "name": "fechaHasta",
              "required": true,
              "in": "query",
              "description": "Fecha final del período del reporte",
              "schema": {
                "format": "date",
                "example": "2026-08-31",
                "type": "string"
              }
            },
            {
              "name": "estado",
              "required": false,
              "in": "query",
              "description": "Filtrar por estado de la reservación",
              "schema": {
                "example": "CONFIRMADA",
                "type": "string",
                "enum": [
                  "COTIZACION",
                  "PENDIENTE",
                  "CONFIRMADA",
                  "CANCELADA",
                  "REALIZADA"
                ]
              }
            },
            {
              "name": "vendedorId",
              "required": false,
              "in": "query",
              "description": "Identificador del vendedor",
              "schema": {
                "minimum": 1,
                "example": 3,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Archivo PDF generado correctamente.",
              "content": {
                "application/pdf": {
                  "schema": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            },
            "400": {
              "description": "Las fechas o filtros del reporte no son válidos."
            },
            "401": {
              "description": "El usuario no está autenticado."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Exportar reporte de reservaciones a PDF",
          "tags": [
            "Reportes"
          ]
        }
      },
      "/reportes/reservaciones/{id}/pdf": {
        "get": {
          "operationId": "ReportesController_exportarReservacionPdf",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Reportes"
          ]
        }
      },
      "/reportes/paquetes/pdf": {
        "get": {
          "operationId": "ReportesController_exportarPaquetesPdf",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Reportes"
          ]
        }
      },
      "/reportes/paquetes/{id}/pdf": {
        "get": {
          "operationId": "ReportesController_exportarPaquetePdf",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "tags": [
            "Reportes"
          ]
        }
      },
      "/servicios": {
        "post": {
          "description": "Crea un servicio que posteriormente podrá incluirse en uno o varios paquetes.",
          "operationId": "ServiciosController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateServicioDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Servicio registrado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Servicio"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "409": {
              "description": "Ya existe un servicio con el mismo nombre"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Registrar un servicio",
          "tags": [
            "Servicios"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar, ordenar y paginar los servicios.",
          "operationId": "ServiciosController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de servicios por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Búsqueda por nombre, descripción o unidad de medida",
              "schema": {
                "maxLength": 100,
                "example": "piscina",
                "type": "string"
              }
            },
            {
              "name": "activo",
              "required": false,
              "in": "query",
              "description": "Filtrar servicios según su estado",
              "schema": {
                "example": true,
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              }
            },
            {
              "name": "unidadMedida",
              "required": false,
              "in": "query",
              "description": "Filtrar por unidad de medida",
              "schema": {
                "maxLength": 30,
                "example": "hora",
                "type": "string"
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Campo utilizado para ordenar los servicios",
              "schema": {
                "default": "nombre",
                "example": "nombre",
                "type": "string",
                "enum": [
                  "nombre",
                  "descripcion",
                  "unidadMedida",
                  "activo",
                  "fechaCreacion"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de servicios"
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar y buscar servicios",
          "tags": [
            "Servicios"
          ]
        }
      },
      "/servicios/{id}": {
        "get": {
          "operationId": "ServiciosController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del servicio",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Servicio encontrado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Servicio"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "El servicio no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar un servicio",
          "tags": [
            "Servicios"
          ]
        },
        "patch": {
          "description": "Permite modificar el nombre, descripción, unidad de medida o estado.",
          "operationId": "ServiciosController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del servicio",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateServicioDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Servicio actualizado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Servicio"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "404": {
              "description": "El servicio no existe"
            },
            "409": {
              "description": "Ya existe otro servicio con el mismo nombre"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar un servicio",
          "tags": [
            "Servicios"
          ]
        },
        "delete": {
          "description": "No elimina el registro; cambia su estado a inactivo.",
          "operationId": "ServiciosController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del servicio",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Servicio desactivado correctamente"
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "El servicio no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Desactivar un servicio",
          "tags": [
            "Servicios"
          ]
        }
      },
      "/paquetes-servicios": {
        "post": {
          "description": "Asigna un servicio activo a un paquete activo.",
          "operationId": "PaquetesServiciosController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePaqueteServicioDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Servicio agregado al paquete correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaqueteServicio"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos no son válidos o el paquete o servicio está inactivo"
            },
            "404": {
              "description": "El paquete o servicio no existe"
            },
            "409": {
              "description": "El servicio ya está incluido en el paquete"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Agregar un servicio a un paquete",
          "tags": [
            "Paquetes - Servicios"
          ]
        },
        "get": {
          "description": "Permite consultar, buscar, filtrar y paginar las asignaciones.",
          "operationId": "PaquetesServiciosController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de registros por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "paqueteId",
              "required": false,
              "in": "query",
              "description": "Filtrar por identificador del paquete",
              "schema": {
                "minimum": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "servicioId",
              "required": false,
              "in": "query",
              "description": "Filtrar por identificador del servicio",
              "schema": {
                "minimum": 1,
                "example": 2,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Buscar por nombre del paquete, servicio o detalle",
              "schema": {
                "maxLength": 100,
                "example": "Piscina",
                "type": "string"
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del orden de presentación",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de servicios asignados"
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar servicios asignados a paquetes",
          "tags": [
            "Paquetes - Servicios"
          ]
        }
      },
      "/paquetes-servicios/{id}": {
        "get": {
          "operationId": "PaquetesServiciosController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la asignación entre paquete y servicio",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Asignación encontrada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaqueteServicio"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "La asignación no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar una asignación",
          "tags": [
            "Paquetes - Servicios"
          ]
        },
        "patch": {
          "description": "Permite modificar la cantidad, detalle u orden del servicio.",
          "operationId": "PaquetesServiciosController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la asignación entre paquete y servicio",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePaqueteServicioDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Asignación actualizada correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaqueteServicio"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "404": {
              "description": "La asignación no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar una asignación",
          "tags": [
            "Paquetes - Servicios"
          ]
        },
        "delete": {
          "description": "Elimina la asignación sin borrar el paquete ni el servicio.",
          "operationId": "PaquetesServiciosController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la asignación entre paquete y servicio",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Servicio eliminado del paquete correctamente"
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "La asignación no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Quitar un servicio de un paquete",
          "tags": [
            "Paquetes - Servicios"
          ]
        }
      },
      "/productos-adicionales/imagen": {
        "post": {
          "description": "Guarda una imagen JPG, PNG o WebP con un tamaño máximo de 5 MB.",
          "operationId": "ProductosAdicionalesController_subirImagen",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "required": [
                    "imagen"
                  ],
                  "properties": {
                    "imagen": {
                      "type": "string",
                      "format": "binary",
                      "description": "Imagen del producto adicional"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Imagen almacenada correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "imagenUrl": "/uploads/productos-adicionales/550e8400-e29b-41d4-a716-446655440000.jpg",
                      "nombreArchivo": "550e8400-e29b-41d4-a716-446655440000.jpg"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "No se envió una imagen o su formato no es válido."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Subir la imagen de un producto adicional",
          "tags": [
            "Productos adicionales"
          ]
        }
      },
      "/productos-adicionales": {
        "post": {
          "description": "Crea el producto adicional junto con sus opciones de venta.",
          "operationId": "ProductosAdicionalesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateProductoAdicionalDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Producto adicional registrado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos."
            },
            "409": {
              "description": "Ya existe un producto adicional con el mismo nombre."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Registrar un producto adicional",
          "tags": [
            "Productos adicionales"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar, ordenar y paginar los productos.",
          "operationId": "ProductosAdicionalesController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de productos por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Búsqueda por nombre, descripción u opciones del producto adicional",
              "schema": {
                "maxLength": 100,
                "example": "palomitas",
                "type": "string"
              }
            },
            {
              "name": "activo",
              "required": false,
              "in": "query",
              "description": "Filtrar productos según su estado",
              "schema": {
                "example": true,
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Columna utilizada para ordenar los productos",
              "schema": {
                "default": "nombre",
                "example": "nombre",
                "type": "string",
                "enum": [
                  "nombre",
                  "descripcion",
                  "activo",
                  "fechaCreacion"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de productos adicionales."
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar productos adicionales",
          "tags": [
            "Productos adicionales"
          ]
        }
      },
      "/productos-adicionales/{id}": {
        "get": {
          "operationId": "ProductosAdicionalesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del producto adicional",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Producto adicional encontrado.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido."
            },
            "404": {
              "description": "El producto adicional no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar un producto adicional",
          "tags": [
            "Productos adicionales"
          ]
        },
        "patch": {
          "description": "Permite modificar el producto y sincronizar sus opciones de venta.",
          "operationId": "ProductosAdicionalesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del producto adicional",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateProductoAdicionalDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Producto adicional actualizado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos."
            },
            "404": {
              "description": "El producto adicional no existe."
            },
            "409": {
              "description": "Ya existe otro producto adicional con el mismo nombre."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar un producto adicional",
          "tags": [
            "Productos adicionales"
          ]
        },
        "delete": {
          "description": "No elimina el producto; cambia su estado y el de sus opciones a inactivo.",
          "operationId": "ProductosAdicionalesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del producto adicional",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Producto adicional desactivado correctamente."
            },
            "400": {
              "description": "El identificador no es válido."
            },
            "404": {
              "description": "El producto adicional no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Desactivar un producto adicional",
          "tags": [
            "Productos adicionales"
          ]
        }
      },
      "/opciones-productos-adicionales": {
        "post": {
          "description": "Crea una presentación con cantidad, precio de venta y costo estimado.",
          "operationId": "OpcionesProductosAdicionalesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateOpcionProductoAdicionalDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Opción registrada correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OpcionProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos no son válidos o el producto está inactivo"
            },
            "404": {
              "description": "El producto adicional no existe"
            },
            "409": {
              "description": "Ya existe una opción con el mismo nombre para este producto"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Registrar una opción de producto adicional",
          "tags": [
            "Opciones de productos adicionales"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar, ordenar y paginar las opciones.",
          "operationId": "OpcionesProductosAdicionalesController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de opciones por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "productoAdicionalId",
              "required": false,
              "in": "query",
              "description": "Filtrar por identificador del producto adicional",
              "schema": {
                "minimum": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Buscar por producto, opción o descripción",
              "schema": {
                "maxLength": 100,
                "example": "30 personas",
                "type": "string"
              }
            },
            {
              "name": "activo",
              "required": false,
              "in": "query",
              "description": "Filtrar opciones según su estado",
              "schema": {
                "example": true,
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              }
            },
            {
              "name": "precioMinimo",
              "required": false,
              "in": "query",
              "description": "Precio mínimo de venta en colones",
              "schema": {
                "minimum": 0,
                "example": 10000,
                "type": "number"
              }
            },
            {
              "name": "precioMaximo",
              "required": false,
              "in": "query",
              "description": "Precio máximo de venta en colones",
              "schema": {
                "minimum": 0,
                "example": 20000,
                "type": "number"
              }
            },
            {
              "name": "cantidadPersonas",
              "required": false,
              "in": "query",
              "description": "Filtrar por cantidad de personas cubierta",
              "schema": {
                "minimum": 1,
                "example": 30,
                "type": "number"
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Campo utilizado para ordenar",
              "schema": {
                "default": "orden",
                "example": "orden",
                "type": "string",
                "enum": [
                  "orden",
                  "nombre",
                  "precioVentaColones",
                  "cantidadPersonas",
                  "fechaCreacion"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de opciones"
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar opciones de productos adicionales",
          "tags": [
            "Opciones de productos adicionales"
          ]
        }
      },
      "/opciones-productos-adicionales/{id}": {
        "get": {
          "operationId": "OpcionesProductosAdicionalesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la opción",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Opción encontrada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OpcionProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "La opción no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar una opción de producto adicional",
          "tags": [
            "Opciones de productos adicionales"
          ]
        },
        "patch": {
          "description": "Permite modificar nombre, cantidades, precios, estado u orden.",
          "operationId": "OpcionesProductosAdicionalesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la opción",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateOpcionProductoAdicionalDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Opción actualizada correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OpcionProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos"
            },
            "404": {
              "description": "La opción no existe"
            },
            "409": {
              "description": "Ya existe otra opción con el mismo nombre para este producto"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar una opción de producto adicional",
          "tags": [
            "Opciones de productos adicionales"
          ]
        },
        "delete": {
          "description": "No elimina la opción; cambia su estado a inactivo.",
          "operationId": "OpcionesProductosAdicionalesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la opción",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Opción desactivada correctamente"
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "La opción no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Desactivar una opción de producto adicional",
          "tags": [
            "Opciones de productos adicionales"
          ]
        }
      },
      "/public/opciones-productos-adicionales": {
        "get": {
          "description": "Retorna únicamente opciones activas de productos activos disponibles para la landing page.",
          "operationId": "OpcionesProductosAdicionalesPublicosController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Listado de opciones disponibles"
            }
          },
          "summary": "Listar opciones de productos adicionales públicas",
          "tags": [
            "Opciones de productos adicionales públicas"
          ]
        }
      },
      "/public/opciones-productos-adicionales/reporte/pdf": {
        "get": {
          "description": "Genera un catálogo público con las opciones disponibles de productos adicionales.",
          "operationId": "OpcionesProductosAdicionalesPublicosController_reporteTodos",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "summary": "Generar catálogo PDF de productos adicionales",
          "tags": [
            "Opciones de productos adicionales públicas"
          ]
        }
      },
      "/public/opciones-productos-adicionales/{id}/reporte/pdf": {
        "get": {
          "operationId": "OpcionesProductosAdicionalesPublicosController_reporteUno",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "404": {
              "description": "La opción no existe o no está disponible públicamente"
            }
          },
          "summary": "Generar PDF de una opción de producto adicional",
          "tags": [
            "Opciones de productos adicionales públicas"
          ]
        }
      },
      "/public/opciones-productos-adicionales/{id}": {
        "get": {
          "operationId": "OpcionesProductosAdicionalesPublicosController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Opción encontrada"
            },
            "404": {
              "description": "La opción no existe o no está disponible públicamente"
            }
          },
          "summary": "Consultar opción pública de producto adicional",
          "tags": [
            "Opciones de productos adicionales públicas"
          ]
        }
      },
      "/reservaciones": {
        "post": {
          "description": "Crea una cotización o reservación pendiente y asigna como vendedor al usuario autenticado.",
          "operationId": "ReservacionesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateReservacionDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Reservación creada correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservacion"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos enviados no son válidos."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para gestionar reservaciones."
            },
            "404": {
              "description": "El cliente, tipo de evento o paquete seleccionado no existe."
            },
            "409": {
              "description": "El horario coincide con otra reservación."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Registrar una reservación",
          "tags": [
            "Reservaciones"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar, ordenar y paginar las reservaciones.",
          "operationId": "ReservacionesController_findAll",
          "parameters": [
            {
              "name": "excluirEstados",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": [
                  "REALIZADA",
                  "CANCELADA"
                ],
                "type": "array",
                "items": {
                  "type": "string",
                  "enum": [
                    "COTIZACION",
                    "PENDIENTE",
                    "CONFIRMADA",
                    "CANCELADA",
                    "REALIZADA"
                  ]
                }
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de reservaciones por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Buscar por nombre, apellidos, nombre completo, teléfono o correo del cliente",
              "schema": {
                "maxLength": 100,
                "example": "María Rodríguez",
                "type": "string"
              }
            },
            {
              "name": "estado",
              "required": false,
              "in": "query",
              "description": "Filtrar por estado",
              "schema": {
                "example": "CONFIRMADA",
                "type": "string",
                "enum": [
                  "COTIZACION",
                  "PENDIENTE",
                  "CONFIRMADA",
                  "CANCELADA",
                  "REALIZADA"
                ]
              }
            },
            {
              "name": "mostrarTodos",
              "required": false,
              "in": "query",
              "description": "Indica si se deben mostrar todos los estados",
              "schema": {
                "example": true,
                "type": "boolean"
              }
            },
            {
              "name": "tipoEventoId",
              "required": false,
              "in": "query",
              "description": "Filtrar por tipo de evento",
              "schema": {
                "minimum": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "paqueteId",
              "required": false,
              "in": "query",
              "description": "Filtrar por paquete",
              "schema": {
                "minimum": 1,
                "example": 2,
                "type": "number"
              }
            },
            {
              "name": "vendedorId",
              "required": false,
              "in": "query",
              "description": "Filtrar por vendedor",
              "schema": {
                "minimum": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "fechaDesde",
              "required": false,
              "in": "query",
              "description": "Fecha inicial del periodo de eventos",
              "schema": {
                "example": "2026-10-01T00:00:00.000-06:00",
                "type": "string"
              }
            },
            {
              "name": "fechaHasta",
              "required": false,
              "in": "query",
              "description": "Fecha final del periodo de eventos",
              "schema": {
                "example": "2026-10-31T23:59:59.999-06:00",
                "type": "string"
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Columna utilizada para ordenar",
              "schema": {
                "default": "fechaInicio",
                "example": "fechaInicio",
                "type": "string",
                "enum": [
                  "fechaInicio",
                  "fechaContacto",
                  "fechaCreacion",
                  "cliente",
                  "tipoEvento",
                  "paquete",
                  "vendedor",
                  "cantidadPersonas",
                  "montoTotalColones",
                  "estado"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de reservaciones."
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para gestionar reservaciones."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar y buscar reservaciones",
          "tags": [
            "Reservaciones"
          ]
        }
      },
      "/reservaciones/{id}": {
        "get": {
          "description": "Devuelve la reservación con cliente, tipo de evento, paquete, vendedor, productos adicionales y pagos.",
          "operationId": "ReservacionesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la reservación.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Reservación encontrada.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservacion"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para gestionar reservaciones."
            },
            "404": {
              "description": "La reservación no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar una reservación",
          "tags": [
            "Reservaciones"
          ]
        },
        "patch": {
          "description": "Modifica los datos generales y recalcula el precio cuando cambia el paquete.",
          "operationId": "ReservacionesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la reservación.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateReservacionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Reservación actualizada correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservacion"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos no son válidos o la reservación ya no puede modificarse."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para gestionar reservaciones."
            },
            "404": {
              "description": "La reservación o alguno de los registros relacionados no existe."
            },
            "409": {
              "description": "El horario coincide con otra reservación."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar una reservación",
          "tags": [
            "Reservaciones"
          ]
        }
      },
      "/reservaciones/{id}/estado-inicial": {
        "patch": {
          "description": "Permite cambiar el estado mientras la reservación no esté confirmada, cancelada o realizada.",
          "operationId": "ReservacionesController_cambiarEstadoInicial",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la reservación.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CambiarEstadoInicialDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Estado actualizado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservacion"
                  }
                }
              }
            },
            "400": {
              "description": "La transición de estado no está permitida."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para gestionar reservaciones."
            },
            "404": {
              "description": "La reservación no existe."
            },
            "409": {
              "description": "No existe disponibilidad para convertir la cotización en pendiente."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Cambiar entre cotización y pendiente",
          "tags": [
            "Reservaciones"
          ]
        }
      },
      "/reservaciones/{id}/cancelar": {
        "patch": {
          "description": "Marca la reservación como cancelada y registra la fecha y el motivo.",
          "operationId": "ReservacionesController_cancelar",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la reservación.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CancelarReservacionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Reservación cancelada correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservacion"
                  }
                }
              }
            },
            "400": {
              "description": "La reservación no puede cancelarse o el motivo no es válido."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para gestionar reservaciones."
            },
            "404": {
              "description": "La reservación no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Cancelar una reservación",
          "tags": [
            "Reservaciones"
          ]
        }
      },
      "/reservaciones/{id}/realizar": {
        "patch": {
          "description": "Permite finalizar reservaciones pendientes o confirmadas cuyo evento ya terminó.",
          "operationId": "ReservacionesController_marcarRealizada",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador de la reservación.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Reservación marcada como realizada.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservacion"
                  }
                }
              }
            },
            "400": {
              "description": "La reservación no está pendiente o confirmada, o el evento todavía no terminó."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para gestionar reservaciones."
            },
            "404": {
              "description": "La reservación no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Marcar una reservación como realizada",
          "tags": [
            "Reservaciones"
          ]
        }
      },
      "/pagos": {
        "post": {
          "description": "Registra un pago y confirma automáticamente la reservación cuando recibe su primer pago.",
          "operationId": "PagosController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePagoDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Pago registrado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pago"
                  }
                }
              }
            },
            "400": {
              "description": "El pago no es válido, supera el saldo o la reservación no permite pagos."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para realizar esta acción."
            },
            "404": {
              "description": "La reservación no existe."
            },
            "409": {
              "description": "La reservación no puede confirmarse porque existe un conflicto de horario."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Registrar un pago",
          "tags": [
            "Pagos"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar, ordenar y paginar los pagos.",
          "operationId": "PagosController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de registros por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Búsqueda por cliente, teléfono, correo, referencia u observaciones",
              "schema": {
                "maxLength": 150,
                "example": "María Rodríguez",
                "type": "string"
              }
            },
            {
              "name": "reservacionId",
              "required": false,
              "in": "query",
              "description": "Filtrar por reservación",
              "schema": {
                "minimum": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "concepto",
              "required": false,
              "in": "query",
              "description": "Filtrar por concepto del pago",
              "schema": {
                "type": "string",
                "enum": [
                  "DEPOSITO",
                  "ABONO",
                  "PAGO_FINAL"
                ]
              }
            },
            {
              "name": "metodoPago",
              "required": false,
              "in": "query",
              "description": "Filtrar por método de pago",
              "schema": {
                "type": "string",
                "enum": [
                  "EFECTIVO",
                  "SINPE_MOVIL",
                  "TRANSFERENCIA",
                  "TARJETA",
                  "OTRO"
                ]
              }
            },
            {
              "name": "anulado",
              "required": false,
              "in": "query",
              "description": "Filtrar según el estado de anulación",
              "schema": {
                "example": false,
                "type": "boolean"
              }
            },
            {
              "name": "fechaDesde",
              "required": false,
              "in": "query",
              "description": "Fecha inicial del periodo de pagos",
              "schema": {
                "example": "2026-08-01",
                "type": "string"
              }
            },
            {
              "name": "fechaHasta",
              "required": false,
              "in": "query",
              "description": "Fecha final del periodo de pagos",
              "schema": {
                "example": "2026-08-31",
                "type": "string"
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Columna utilizada para ordenar",
              "schema": {
                "default": "fechaPago",
                "type": "string",
                "enum": [
                  "fechaPago",
                  "fechaCreacion",
                  "montoColones",
                  "cliente",
                  "concepto",
                  "metodoPago"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "DESC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de pagos."
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para realizar esta acción."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar y buscar pagos",
          "tags": [
            "Pagos"
          ]
        }
      },
      "/pagos/reservacion/{reservacionId}/resumen": {
        "get": {
          "description": "Devuelve el total de la reservación, total pagado, saldo pendiente e historial de pagos.",
          "operationId": "PagosController_obtenerResumenReservacion",
          "parameters": [
            {
              "name": "reservacionId",
              "required": true,
              "in": "path",
              "description": "Identificador de la reservación.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Resumen financiero de la reservación."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para realizar esta acción."
            },
            "404": {
              "description": "La reservación no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar el resumen de pagos",
          "tags": [
            "Pagos"
          ]
        }
      },
      "/pagos/{id}": {
        "get": {
          "operationId": "PagosController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del pago.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Pago encontrado.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pago"
                  }
                }
              }
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para realizar esta acción."
            },
            "404": {
              "description": "El pago no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar un pago",
          "tags": [
            "Pagos"
          ]
        }
      },
      "/pagos/{id}/anular": {
        "patch": {
          "description": "Anula el pago, conserva su historial y recalcula el estado financiero de la reservación.",
          "operationId": "PagosController_anular",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del pago.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnularPagoDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Pago anulado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pago"
                  }
                }
              }
            },
            "400": {
              "description": "El pago ya está anulado o pertenece a una reservación realizada."
            },
            "401": {
              "description": "El usuario no ha iniciado sesión o el token no es válido."
            },
            "403": {
              "description": "El usuario no tiene permiso para realizar esta acción."
            },
            "404": {
              "description": "El pago o la reservación no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Anular un pago",
          "tags": [
            "Pagos"
          ]
        }
      },
      "/reservaciones-productos-adicionales": {
        "post": {
          "description": "Copia el precio vigente, calcula el subtotal y actualiza el monto total de la reservación.",
          "operationId": "ReservacionesProductosAdicionalesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateReservacionProductoAdicionalDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Producto adicional agregado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservacionProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos no son válidos, la opción está inactiva o la reservación no puede modificarse"
            },
            "404": {
              "description": "La reservación o la opción no existe"
            },
            "409": {
              "description": "La opción ya está agregada a la reservación"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Agregar un producto adicional a una reservación",
          "tags": [
            "Reservaciones - Productos adicionales"
          ]
        },
        "get": {
          "description": "Permite buscar, filtrar, ordenar y paginar los adicionales.",
          "operationId": "ReservacionesProductosAdicionalesController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de registros por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "reservacionId",
              "required": false,
              "in": "query",
              "description": "Filtrar por reservación",
              "schema": {
                "minimum": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "opcionProductoAdicionalId",
              "required": false,
              "in": "query",
              "description": "Filtrar por opción de producto adicional",
              "schema": {
                "minimum": 1,
                "example": 2,
                "type": "number"
              }
            },
            {
              "name": "productoAdicionalId",
              "required": false,
              "in": "query",
              "description": "Filtrar por producto adicional general",
              "schema": {
                "minimum": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Buscar por producto, opción, observaciones o cliente",
              "schema": {
                "maxLength": 100,
                "example": "palomitas",
                "type": "string"
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Campo utilizado para ordenar",
              "schema": {
                "default": "fechaCreacion",
                "example": "fechaCreacion",
                "type": "string",
                "enum": [
                  "fechaCreacion",
                  "cantidad",
                  "subtotalColones"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "DESC",
                "example": "DESC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de productos adicionales contratados"
            },
            "400": {
              "description": "Los parámetros de consulta no son válidos"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar productos adicionales contratados",
          "tags": [
            "Reservaciones - Productos adicionales"
          ]
        }
      },
      "/reservaciones-productos-adicionales/{id}": {
        "get": {
          "operationId": "ReservacionesProductosAdicionalesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del adicional en la reservación",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Producto adicional contratado encontrado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservacionProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "El identificador no es válido"
            },
            "404": {
              "description": "El producto adicional contratado no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Consultar un producto adicional contratado",
          "tags": [
            "Reservaciones - Productos adicionales"
          ]
        },
        "patch": {
          "description": "Permite modificar cantidad u observaciones y recalcula los montos.",
          "operationId": "ReservacionesProductosAdicionalesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del adicional en la reservación",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateReservacionProductoAdicionalDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Producto adicional actualizado correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservacionProductoAdicional"
                  }
                }
              }
            },
            "400": {
              "description": "Los datos no son válidos, la reservación no puede modificarse o el nuevo total sería menor que lo pagado"
            },
            "404": {
              "description": "El adicional o la reservación no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar un producto adicional contratado",
          "tags": [
            "Reservaciones - Productos adicionales"
          ]
        },
        "delete": {
          "description": "Elimina la asignación y recalcula los montos de la reservación.",
          "operationId": "ReservacionesProductosAdicionalesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del adicional en la reservación",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Producto adicional eliminado correctamente"
            },
            "400": {
              "description": "La reservación no puede modificarse o el nuevo total sería menor que lo pagado"
            },
            "404": {
              "description": "El adicional o la reservación no existe"
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Quitar un producto adicional de una reservación",
          "tags": [
            "Reservaciones - Productos adicionales"
          ]
        }
      },
      "/usuarios": {
        "post": {
          "description": "Registra un administrador o vendedor y almacena su contraseña de forma segura.",
          "operationId": "UsuariosController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUsuarioDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Usuario creado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Usuario"
                  }
                }
              }
            },
            "401": {
              "description": "No se proporcionó un token válido."
            },
            "403": {
              "description": "El usuario no tiene permisos de administrador."
            },
            "409": {
              "description": "Ya existe un usuario con el correo indicado."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Crear un usuario",
          "tags": [
            "Usuarios"
          ]
        },
        "get": {
          "description": "Devuelve los usuarios paginados y permite buscar, filtrar y ordenar.",
          "operationId": "UsuariosController_findAll",
          "parameters": [
            {
              "name": "pagina",
              "required": false,
              "in": "query",
              "description": "Número de página solicitada",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limite",
              "required": false,
              "in": "query",
              "description": "Cantidad de usuarios por página",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "buscar",
              "required": false,
              "in": "query",
              "description": "Buscar por nombre, apellidos, nombre completo, teléfono o correo",
              "schema": {
                "maxLength": 100,
                "example": "María Rodríguez",
                "type": "string"
              }
            },
            {
              "name": "rol",
              "required": false,
              "in": "query",
              "description": "Filtrar usuarios por rol",
              "schema": {
                "example": "VENDEDOR",
                "type": "string",
                "enum": [
                  "ADMINISTRADOR",
                  "VENDEDOR"
                ]
              }
            },
            {
              "name": "activo",
              "required": false,
              "in": "query",
              "description": "Filtrar usuarios según su estado",
              "schema": {
                "example": true,
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              }
            },
            {
              "name": "ordenarPor",
              "required": false,
              "in": "query",
              "description": "Columna utilizada para ordenar los usuarios",
              "schema": {
                "default": "nombre",
                "example": "nombre",
                "type": "string",
                "enum": [
                  "nombre",
                  "apellidos",
                  "telefono",
                  "correo",
                  "rol",
                  "activo",
                  "fechaCreacion"
                ]
              }
            },
            {
              "name": "orden",
              "required": false,
              "in": "query",
              "description": "Dirección del ordenamiento",
              "schema": {
                "default": "ASC",
                "example": "ASC",
                "type": "string",
                "enum": [
                  "ASC",
                  "DESC"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Listado paginado de usuarios."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Listar y buscar usuarios",
          "tags": [
            "Usuarios"
          ]
        }
      },
      "/usuarios/{id}": {
        "get": {
          "operationId": "UsuariosController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del usuario.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Usuario encontrado.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Usuario"
                  }
                }
              }
            },
            "404": {
              "description": "El usuario no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Buscar un usuario por ID",
          "tags": [
            "Usuarios"
          ]
        },
        "patch": {
          "description": "Actualiza nombre, apellidos, teléfono, correo, rol o estado.",
          "operationId": "UsuariosController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del usuario.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUsuarioDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Usuario actualizado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Usuario"
                  }
                }
              }
            },
            "400": {
              "description": "No se puede modificar el rol o estado del propio usuario ni eliminar al último administrador."
            },
            "404": {
              "description": "El usuario no existe."
            },
            "409": {
              "description": "Ya existe otro usuario con el correo indicado."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Actualizar un usuario",
          "tags": [
            "Usuarios"
          ]
        },
        "delete": {
          "description": "Realiza una eliminación lógica estableciendo activo en false.",
          "operationId": "UsuariosController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del usuario.",
              "schema": {
                "example": 2,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Usuario desactivado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "message": "Usuario desactivado correctamente",
                      "id": 2
                    }
                  }
                }
              }
            },
            "400": {
              "description": "No puede desactivar su propio usuario ni al último administrador activo."
            },
            "404": {
              "description": "El usuario no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Desactivar un usuario",
          "tags": [
            "Usuarios"
          ]
        }
      },
      "/usuarios/{id}/password": {
        "patch": {
          "description": "Permite al administrador asignar una nueva contraseña.",
          "operationId": "UsuariosController_cambiarPassword",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Identificador del usuario.",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CambiarPasswordUsuarioDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Contraseña actualizada correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "message": "Contraseña actualizada correctamente"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "El usuario no existe."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Restablecer la contraseña de un usuario",
          "tags": [
            "Usuarios"
          ]
        }
      },
      "/auth/login": {
        "post": {
          "description": "Valida las credenciales y devuelve un token JWT.",
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Inicio de sesión correcto.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
                      "usuario": {
                        "id": 1,
                        "nombre": "Administrador",
                        "apellidos": "Villa Peñas",
                        "correo": "admin@villapenas.com",
                        "rol": "ADMINISTRADOR"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Correo o contraseña incorrectos, o usuario desactivado."
            }
          },
          "summary": "Iniciar sesión",
          "tags": [
            "Autenticación"
          ]
        }
      },
      "/auth/perfil": {
        "get": {
          "description": "Devuelve los datos del usuario asociado al token JWT.",
          "operationId": "AuthController_perfil",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Datos del usuario autenticado.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "id": 1,
                      "nombre": "Administrador",
                      "apellidos": "Villa Peñas",
                      "correo": "admin@villapenas.com",
                      "rol": "ADMINISTRADOR"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "El token no existe, es inválido o ha expirado."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Obtener el usuario autenticado",
          "tags": [
            "Autenticación"
          ]
        }
      },
      "/dashboard/resumen": {
        "get": {
          "description": "Los administradores reciben información operativa y financiera. Los vendedores reciben únicamente información operativa.",
          "operationId": "DashboardController_obtenerResumen",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Resumen del Dashboard obtenido correctamente."
            },
            "401": {
              "description": "El usuario no está autenticado."
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "Obtener el resumen del Dashboard",
          "tags": [
            "Dashboard"
          ]
        }
      },
      "/public/instagram": {
        "get": {
          "description": "Retorna hasta ocho publicaciones recientes de Instagram para la landing page.",
          "operationId": "InstagramPublicosController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Listado de publicaciones de Instagram"
            },
            "502": {
              "description": "No fue posible obtener las publicaciones de Instagram"
            },
            "503": {
              "description": "El servicio de Instagram no esta configurado"
            }
          },
          "summary": "Listar publicaciones publicas de Instagram",
          "tags": [
            "Instagram publico"
          ]
        }
      }
    },
    "info": {
      "title": "API Villa Peñas",
      "description": "API para la gestión de reservaciones de Villa Peñas",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Clientes",
        "description": "Gestión de clientes"
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "access-token": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http",
          "description": "Ingrese el token JWT"
        }
      },
      "schemas": {
        "CreateClienteDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del cliente",
              "example": "María",
              "minLength": 2,
              "maxLength": 80
            },
            "apellidos": {
              "type": "string",
              "description": "Apellidos del cliente",
              "example": "Rodríguez Solano",
              "minLength": 2,
              "maxLength": 120
            },
            "telefono": {
              "type": "string",
              "description": "Teléfono del cliente con código de país opcional",
              "example": "+50688888888",
              "minLength": 8,
              "maxLength": 16
            },
            "correo": {
              "type": "object",
              "description": "Correo electrónico del cliente",
              "example": "maria.rodriguez@correo.com",
              "maxLength": 150,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el cliente está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            }
          },
          "required": [
            "nombre",
            "apellidos",
            "telefono"
          ]
        },
        "UpdateClienteDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del cliente",
              "example": "María",
              "minLength": 2,
              "maxLength": 80
            },
            "apellidos": {
              "type": "string",
              "description": "Apellidos del cliente",
              "example": "Rodríguez Solano",
              "minLength": 2,
              "maxLength": 120
            },
            "telefono": {
              "type": "string",
              "description": "Teléfono del cliente con código de país opcional",
              "example": "+50688888888",
              "minLength": 8,
              "maxLength": 16
            },
            "correo": {
              "type": "object",
              "description": "Correo electrónico del cliente",
              "example": "maria.rodriguez@correo.com",
              "maxLength": 150,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el cliente está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            }
          }
        },
        "CreateTipoEventoDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del tipo de evento",
              "example": "Cumpleaños",
              "minLength": 2,
              "maxLength": 80
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción del tipo de evento",
              "example": "Celebración para niños o adultos",
              "maxLength": 500,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el tipo de evento puede seleccionarse en nuevas reservaciones",
              "example": true,
              "default": true
            }
          },
          "required": [
            "nombre"
          ]
        },
        "TipoEvento": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador del tipo de evento",
              "example": 1
            },
            "nombre": {
              "type": "string",
              "description": "Nombre del tipo de evento",
              "example": "Cumpleaños",
              "maxLength": 80
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción del tipo de evento",
              "example": "Celebración de cumpleaños para niños o adultos",
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si puede utilizarse en nuevas reservaciones",
              "example": true,
              "default": true
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación",
              "example": "2026-08-20T20:30:00.000Z"
            },
            "fechaActualizacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de la última actualización",
              "example": "2026-08-20T20:30:00.000Z"
            }
          },
          "required": [
            "id",
            "nombre",
            "activo",
            "fechaCreacion",
            "fechaActualizacion"
          ]
        },
        "UpdateTipoEventoDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del tipo de evento",
              "example": "Cumpleaños",
              "minLength": 2,
              "maxLength": 80
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción del tipo de evento",
              "example": "Celebración para niños o adultos",
              "maxLength": 500,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el tipo de evento puede seleccionarse en nuevas reservaciones",
              "example": true,
              "default": true
            }
          }
        },
        "ServicioPaqueteDto": {
          "type": "object",
          "properties": {
            "servicioId": {
              "type": "number",
              "description": "Identificador del servicio existente",
              "example": 1,
              "minimum": 1
            },
            "cantidad": {
              "type": "object",
              "description": "Cantidad del servicio incluida en el paquete",
              "example": 2,
              "minimum": 0.01,
              "nullable": true
            },
            "detalle": {
              "type": "object",
              "description": "Detalle del servicio dentro del paquete",
              "example": "Dos micrófonos inalámbricos",
              "maxLength": 200,
              "nullable": true
            },
            "orden": {
              "type": "number",
              "description": "Orden en el que se mostrará el servicio",
              "example": 1,
              "default": 0,
              "minimum": 0
            }
          },
          "required": [
            "servicioId"
          ]
        },
        "CreatePaqueteDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre comercial del paquete",
              "example": "Paquete Full",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción general del paquete",
              "example": "Incluye piscina, parrilla BBQ, parlante y micrófonos",
              "maxLength": 500,
              "nullable": true
            },
            "precioColones": {
              "type": "number",
              "description": "Precio del paquete expresado en colones",
              "example": 80000,
              "minimum": 0,
              "maximum": 100000000
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el paquete está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            },
            "servicios": {
              "description": "Servicios existentes incluidos en el paquete",
              "example": [
                {
                  "servicioId": 1,
                  "cantidad": 1,
                  "detalle": "Uso durante todo el evento",
                  "orden": 1
                },
                {
                  "servicioId": 2,
                  "cantidad": 2,
                  "detalle": "Dos micrófonos inalámbricos",
                  "orden": 2
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ServicioPaqueteDto"
              }
            }
          },
          "required": [
            "nombre",
            "precioColones",
            "servicios"
          ]
        },
        "PaqueteServicio": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador de la asignación",
              "example": 1
            },
            "paqueteId": {
              "type": "number",
              "description": "Identificador del paquete",
              "example": 1
            },
            "servicioId": {
              "type": "number",
              "description": "Identificador del servicio",
              "example": 2
            },
            "cantidad": {
              "type": "object",
              "description": "Cantidad del servicio incluida",
              "example": 2,
              "nullable": true
            },
            "detalle": {
              "type": "object",
              "description": "Detalle del servicio dentro del paquete",
              "example": "Dos micrófonos inalámbricos",
              "maxLength": 200,
              "nullable": true
            },
            "orden": {
              "type": "number",
              "description": "Orden de presentación",
              "example": 1,
              "default": 0
            }
          },
          "required": [
            "id",
            "paqueteId",
            "servicioId",
            "orden"
          ]
        },
        "Paquete": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador del paquete",
              "example": 1
            },
            "nombre": {
              "type": "string",
              "description": "Nombre del paquete",
              "example": "Paquete Full",
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción general del paquete",
              "example": "Incluye piscina, parrilla BBQ, parlante y micrófonos",
              "maxLength": 500,
              "nullable": true
            },
            "precioColones": {
              "type": "number",
              "description": "Precio vigente del paquete expresado en colones",
              "example": 80000,
              "minimum": 0
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el paquete está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            },
            "paquetesServicios": {
              "description": "Servicios incluidos en el paquete",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/PaqueteServicio"
              }
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación",
              "example": "2026-08-20T20:30:00.000Z"
            },
            "fechaActualizacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de la última actualización",
              "example": "2026-08-20T20:30:00.000Z"
            }
          },
          "required": [
            "id",
            "nombre",
            "precioColones",
            "activo",
            "paquetesServicios",
            "fechaCreacion",
            "fechaActualizacion"
          ]
        },
        "UpdatePaqueteDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre comercial del paquete",
              "example": "Paquete Full",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción general del paquete",
              "example": "Incluye piscina, parrilla BBQ, parlante y micrófonos",
              "maxLength": 500,
              "nullable": true
            },
            "precioColones": {
              "type": "number",
              "description": "Precio del paquete expresado en colones",
              "example": 80000,
              "minimum": 0,
              "maximum": 100000000
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el paquete está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            },
            "servicios": {
              "description": "Servicios existentes incluidos en el paquete",
              "example": [
                {
                  "servicioId": 1,
                  "cantidad": 1,
                  "detalle": "Uso durante todo el evento",
                  "orden": 1
                },
                {
                  "servicioId": 2,
                  "cantidad": 2,
                  "detalle": "Dos micrófonos inalámbricos",
                  "orden": 2
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ServicioPaqueteDto"
              }
            }
          }
        },
        "CreateServicioDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del servicio",
              "example": "Piscina",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción del servicio",
              "example": "Uso de la piscina durante el evento",
              "maxLength": 500,
              "nullable": true
            },
            "unidadMedida": {
              "type": "object",
              "description": "Unidad utilizada para medir el servicio",
              "example": "hora",
              "maxLength": 30,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el servicio está disponible para nuevos paquetes",
              "example": true,
              "default": true
            }
          },
          "required": [
            "nombre"
          ]
        },
        "Servicio": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador del servicio",
              "example": 1
            },
            "nombre": {
              "type": "string",
              "description": "Nombre del servicio",
              "example": "Piscina",
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción del servicio",
              "example": "Uso de la piscina durante el evento",
              "maxLength": 500,
              "nullable": true
            },
            "unidadMedida": {
              "type": "object",
              "description": "Unidad utilizada para medir el servicio",
              "example": "1 piscina",
              "maxLength": 30,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el servicio está disponible para nuevos paquetes",
              "example": true,
              "default": true
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación",
              "example": "2026-08-20T20:30:00.000Z"
            },
            "fechaActualizacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de la última actualización",
              "example": "2026-08-20T20:30:00.000Z"
            }
          },
          "required": [
            "id",
            "nombre",
            "activo",
            "fechaCreacion",
            "fechaActualizacion"
          ]
        },
        "UpdateServicioDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del servicio",
              "example": "Piscina",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción del servicio",
              "example": "Uso de la piscina durante el evento",
              "maxLength": 500,
              "nullable": true
            },
            "unidadMedida": {
              "type": "object",
              "description": "Unidad utilizada para medir el servicio",
              "example": "hora",
              "maxLength": 30,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el servicio está disponible para nuevos paquetes",
              "example": true,
              "default": true
            }
          }
        },
        "CreatePaqueteServicioDto": {
          "type": "object",
          "properties": {
            "paqueteId": {
              "type": "number",
              "description": "Identificador del paquete",
              "example": 1,
              "minimum": 1
            },
            "servicioId": {
              "type": "number",
              "description": "Identificador del servicio",
              "example": 2,
              "minimum": 1
            },
            "cantidad": {
              "type": "object",
              "description": "Cantidad del servicio incluida en el paquete",
              "example": 30,
              "minimum": 0.01,
              "maximum": 99999999.99,
              "nullable": true
            },
            "detalle": {
              "type": "object",
              "description": "Detalle del servicio dentro del paquete",
              "example": "30 sillas incluidas",
              "maxLength": 200,
              "nullable": true
            },
            "orden": {
              "type": "number",
              "description": "Posición en la que se mostrará el servicio",
              "example": 1,
              "default": 0,
              "minimum": 0
            }
          },
          "required": [
            "paqueteId",
            "servicioId"
          ]
        },
        "UpdatePaqueteServicioDto": {
          "type": "object",
          "properties": {
            "cantidad": {
              "type": "object",
              "description": "Cantidad del servicio incluida en el paquete",
              "example": 30,
              "minimum": 0.01,
              "maximum": 99999999.99,
              "nullable": true
            },
            "detalle": {
              "type": "object",
              "description": "Detalle del servicio dentro del paquete",
              "example": "30 sillas incluidas",
              "maxLength": 200,
              "nullable": true
            },
            "orden": {
              "type": "number",
              "description": "Posición en la que se mostrará el servicio",
              "example": 1,
              "minimum": 0
            }
          }
        },
        "OpcionProductoPayloadDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre de la opción",
              "example": "Paquete para 30 personas",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción de la opción",
              "example": "Incluye 30 porciones de palomitas",
              "maxLength": 500,
              "nullable": true
            },
            "unidadMedida": {
              "type": "object",
              "description": "Unidad utilizada para medir la opción",
              "example": "porción",
              "maxLength": 30,
              "nullable": true
            },
            "cantidadIncluida": {
              "type": "object",
              "description": "Cantidad incluida",
              "example": 30,
              "minimum": 0.01,
              "maximum": 99999999.99,
              "nullable": true
            },
            "cantidadPersonas": {
              "type": "object",
              "description": "Cantidad de personas cubierta por la opción",
              "example": 30,
              "minimum": 1,
              "maximum": 100000,
              "nullable": true
            },
            "precioVentaColones": {
              "type": "number",
              "description": "Precio de venta en colones",
              "example": 15000,
              "minimum": 0,
              "maximum": 100000000
            },
            "costoEstimadoColones": {
              "type": "object",
              "description": "Costo estimado en colones",
              "example": 5500,
              "minimum": 0,
              "maximum": 100000000,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si la opción está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            },
            "orden": {
              "type": "number",
              "description": "Posición de la opción dentro del producto",
              "example": 1,
              "default": 0,
              "minimum": 0
            },
            "id": {
              "type": "number",
              "description": "Identificador de la opción cuando se está editando",
              "example": 1,
              "minimum": 1
            }
          },
          "required": [
            "nombre",
            "precioVentaColones"
          ]
        },
        "CreateProductoAdicionalDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del producto adicional",
              "example": "Palomitas de maíz",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción general del producto",
              "example": "Servicio de palomitas preparado durante el evento",
              "maxLength": 500,
              "nullable": true
            },
            "imagenUrl": {
              "type": "object",
              "description": "Dirección de la imagen del producto",
              "example": "https://ejemplo.com/imagenes/palomitas.jpg",
              "maxLength": 2048,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el producto puede utilizarse en nuevas reservaciones",
              "example": true,
              "default": true
            },
            "opciones": {
              "description": "Opciones de venta disponibles para el producto",
              "example": [
                {
                  "nombre": "Paquete para 15 personas",
                  "descripcion": "Incluye 15 porciones de palomitas",
                  "unidadMedida": "porción",
                  "cantidadIncluida": 15,
                  "cantidadPersonas": 15,
                  "precioVentaColones": 10000,
                  "costoEstimadoColones": 3500,
                  "activo": true,
                  "orden": 1
                },
                {
                  "nombre": "Paquete para 30 personas",
                  "descripcion": "Incluye 30 porciones de palomitas",
                  "unidadMedida": "porción",
                  "cantidadIncluida": 30,
                  "cantidadPersonas": 30,
                  "precioVentaColones": 15000,
                  "costoEstimadoColones": 6000,
                  "activo": true,
                  "orden": 2
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/OpcionProductoPayloadDto"
              }
            }
          },
          "required": [
            "nombre",
            "opciones"
          ]
        },
        "OpcionProductoAdicional": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador de la opción",
              "example": 1
            },
            "productoAdicionalId": {
              "type": "number",
              "description": "Identificador del producto adicional",
              "example": 1
            },
            "nombre": {
              "type": "string",
              "description": "Nombre de la opción de venta",
              "example": "Paquete para 30 personas",
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción de la opción",
              "example": "Incluye 30 porciones de palomitas",
              "maxLength": 500,
              "nullable": true
            },
            "unidadMedida": {
              "type": "object",
              "description": "Unidad utilizada para medir la opción",
              "example": "porción",
              "maxLength": 30,
              "nullable": true
            },
            "cantidadIncluida": {
              "type": "object",
              "description": "Cantidad incluida de la unidad indicada",
              "example": 30,
              "nullable": true
            },
            "cantidadPersonas": {
              "type": "object",
              "description": "Cantidad de personas cubierta por la opción",
              "example": 30,
              "nullable": true
            },
            "precioVentaColones": {
              "type": "number",
              "description": "Precio de venta en colones",
              "example": 15000,
              "minimum": 0
            },
            "costoEstimadoColones": {
              "type": "object",
              "description": "Costo estimado en colones",
              "example": 5500,
              "minimum": 0,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si puede agregarse a nuevas reservaciones",
              "example": true,
              "default": true
            },
            "orden": {
              "type": "number",
              "description": "Posición de la opción dentro del producto",
              "example": 1,
              "default": 0
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación",
              "example": "2026-08-21T15:00:00.000Z"
            },
            "fechaActualizacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de la última actualización",
              "example": "2026-08-21T15:00:00.000Z"
            }
          },
          "required": [
            "id",
            "productoAdicionalId",
            "nombre",
            "precioVentaColones",
            "activo",
            "orden",
            "fechaCreacion",
            "fechaActualizacion"
          ]
        },
        "ProductoAdicional": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador del producto adicional",
              "example": 1
            },
            "nombre": {
              "type": "string",
              "description": "Nombre del producto adicional",
              "example": "Palomitas de maíz",
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción general del producto",
              "example": "Servicio de palomitas preparado durante el evento",
              "maxLength": 500,
              "nullable": true
            },
            "imagenUrl": {
              "type": "object",
              "description": "Dirección de la imagen del producto",
              "example": "https://ejemplo.com/imagenes/palomitas.jpg",
              "maxLength": 2048,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el producto puede utilizarse en nuevas reservaciones",
              "example": true,
              "default": true
            },
            "opciones": {
              "description": "Opciones de venta del producto adicional",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/OpcionProductoAdicional"
              }
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación",
              "example": "2026-08-21T15:00:00.000Z"
            },
            "fechaActualizacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de la última actualización",
              "example": "2026-08-21T15:00:00.000Z"
            }
          },
          "required": [
            "id",
            "nombre",
            "activo",
            "opciones",
            "fechaCreacion",
            "fechaActualizacion"
          ]
        },
        "UpdateProductoAdicionalDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del producto adicional",
              "example": "Palomitas de maíz",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción general del producto",
              "example": "Servicio de palomitas preparado durante el evento",
              "maxLength": 500,
              "nullable": true
            },
            "imagenUrl": {
              "type": "object",
              "description": "Dirección de la imagen del producto",
              "example": "https://ejemplo.com/imagenes/palomitas.jpg",
              "maxLength": 2048,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el producto puede utilizarse en nuevas reservaciones",
              "example": true,
              "default": true
            },
            "opciones": {
              "description": "Opciones de venta disponibles para el producto",
              "example": [
                {
                  "nombre": "Paquete para 15 personas",
                  "descripcion": "Incluye 15 porciones de palomitas",
                  "unidadMedida": "porción",
                  "cantidadIncluida": 15,
                  "cantidadPersonas": 15,
                  "precioVentaColones": 10000,
                  "costoEstimadoColones": 3500,
                  "activo": true,
                  "orden": 1
                },
                {
                  "nombre": "Paquete para 30 personas",
                  "descripcion": "Incluye 30 porciones de palomitas",
                  "unidadMedida": "porción",
                  "cantidadIncluida": 30,
                  "cantidadPersonas": 30,
                  "precioVentaColones": 15000,
                  "costoEstimadoColones": 6000,
                  "activo": true,
                  "orden": 2
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/OpcionProductoPayloadDto"
              }
            }
          }
        },
        "CreateOpcionProductoAdicionalDto": {
          "type": "object",
          "properties": {
            "productoAdicionalId": {
              "type": "number",
              "description": "Identificador del producto adicional",
              "example": 1,
              "minimum": 1
            },
            "nombre": {
              "type": "string",
              "description": "Nombre de la opción",
              "example": "Paquete para 30 personas",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción de la opción",
              "example": "Incluye 30 porciones de palomitas",
              "maxLength": 500,
              "nullable": true
            },
            "unidadMedida": {
              "type": "object",
              "description": "Unidad utilizada para medir la opción",
              "example": "porción",
              "maxLength": 30,
              "nullable": true
            },
            "cantidadIncluida": {
              "type": "object",
              "description": "Cantidad incluida",
              "example": 30,
              "minimum": 0.01,
              "maximum": 99999999.99,
              "nullable": true
            },
            "cantidadPersonas": {
              "type": "object",
              "description": "Cantidad de personas cubierta por la opción",
              "example": 30,
              "minimum": 1,
              "maximum": 100000,
              "nullable": true
            },
            "precioVentaColones": {
              "type": "number",
              "description": "Precio de venta en colones",
              "example": 15000,
              "minimum": 0,
              "maximum": 100000000
            },
            "costoEstimadoColones": {
              "type": "object",
              "description": "Costo estimado en colones",
              "example": 5500,
              "minimum": 0,
              "maximum": 100000000,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si la opción está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            },
            "orden": {
              "type": "number",
              "description": "Posición de la opción dentro del producto",
              "example": 1,
              "default": 0,
              "minimum": 0
            }
          },
          "required": [
            "productoAdicionalId",
            "nombre",
            "precioVentaColones"
          ]
        },
        "UpdateOpcionProductoAdicionalDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre de la opción",
              "example": "Paquete para 30 personas",
              "minLength": 2,
              "maxLength": 100
            },
            "descripcion": {
              "type": "object",
              "description": "Descripción de la opción",
              "example": "Incluye 30 porciones de palomitas",
              "maxLength": 500,
              "nullable": true
            },
            "unidadMedida": {
              "type": "object",
              "description": "Unidad utilizada para medir la opción",
              "example": "porción",
              "maxLength": 30,
              "nullable": true
            },
            "cantidadIncluida": {
              "type": "object",
              "description": "Cantidad incluida",
              "example": 30,
              "minimum": 0.01,
              "maximum": 99999999.99,
              "nullable": true
            },
            "cantidadPersonas": {
              "type": "object",
              "description": "Cantidad de personas cubierta por la opción",
              "example": 30,
              "minimum": 1,
              "maximum": 100000,
              "nullable": true
            },
            "precioVentaColones": {
              "type": "number",
              "description": "Precio de venta en colones",
              "example": 15000,
              "minimum": 0,
              "maximum": 100000000
            },
            "costoEstimadoColones": {
              "type": "object",
              "description": "Costo estimado en colones",
              "example": 5500,
              "minimum": 0,
              "maximum": 100000000,
              "nullable": true
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si la opción está disponible para nuevas reservaciones",
              "example": true,
              "default": true
            },
            "orden": {
              "type": "number",
              "description": "Posición de la opción dentro del producto",
              "example": 1,
              "default": 0,
              "minimum": 0
            }
          }
        },
        "ProductoAdicionalReservacionDto": {
          "type": "object",
          "properties": {}
        },
        "CreateReservacionDto": {
          "type": "object",
          "properties": {
            "productosAdicionales": {
              "description": "Opciones de productos adicionales seleccionadas para la reservación",
              "example": [
                {
                  "opcionProductoAdicionalId": 1,
                  "cantidad": 2,
                  "observaciones": "Preparar para 30 personas"
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ProductoAdicionalReservacionDto"
              }
            },
            "clienteId": {
              "type": "number",
              "description": "Identificador del cliente",
              "example": 1,
              "minimum": 1
            },
            "tipoEventoId": {
              "type": "number",
              "description": "Identificador del tipo de evento",
              "example": 1,
              "minimum": 1
            },
            "paqueteId": {
              "type": "object",
              "description": "Identificador del paquete contratado",
              "example": 2,
              "minimum": 1,
              "nullable": true
            },
            "fechaContacto": {
              "type": "string",
              "description": "Fecha en que el cliente contactó a Villa Peñas. Si se omite, se usa la fecha actual",
              "example": "2026-08-21T15:00:00.000-06:00"
            },
            "fechaInicio": {
              "type": "string",
              "description": "Fecha y hora de inicio del evento",
              "example": "2026-10-10T16:00:00.000-06:00"
            },
            "fechaFin": {
              "type": "string",
              "description": "Fecha y hora de finalización del evento",
              "example": "2026-10-10T22:00:00.000-06:00"
            },
            "cantidadPersonas": {
              "type": "number",
              "description": "Cantidad estimada de asistentes",
              "example": 30,
              "minimum": 1,
              "maximum": 10000
            },
            "descuentoColones": {
              "type": "number",
              "description": "Descuento fijo aplicado a la reservación",
              "example": 5000,
              "minimum": 0,
              "default": 0
            },
            "estado": {
              "type": "string",
              "description": "Estado inicial. CONFIRMADA será asignada automáticamente al registrar un pago",
              "example": "PENDIENTE",
              "enum": [
                "COTIZACION",
                "PENDIENTE"
              ],
              "default": "PENDIENTE"
            },
            "observaciones": {
              "type": "object",
              "description": "Observaciones generales",
              "example": "El cliente solicita acceso una hora antes",
              "maxLength": 2000,
              "nullable": true
            }
          },
          "required": [
            "clienteId",
            "tipoEventoId",
            "fechaInicio",
            "fechaFin",
            "cantidadPersonas",
            "descuentoColones"
          ]
        },
        "Reservacion": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador de la reservación",
              "example": 1
            },
            "clienteId": {
              "type": "number",
              "description": "Identificador del cliente",
              "example": 1
            },
            "tipoEventoId": {
              "type": "number",
              "description": "Identificador del tipo de evento",
              "example": 1
            },
            "paqueteId": {
              "type": "object",
              "description": "Identificador del paquete contratado",
              "example": 2,
              "nullable": true
            },
            "vendedorId": {
              "type": "number",
              "description": "Identificador del usuario que realizó la venta",
              "example": 1
            },
            "fechaContacto": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha en que el cliente contactó a Villa Peñas",
              "example": "2026-08-21T15:00:00.000-06:00"
            },
            "fechaInicio": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha y hora de inicio del evento",
              "example": "2026-10-10T16:00:00.000-06:00"
            },
            "fechaFin": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha y hora de finalización del evento",
              "example": "2026-10-10T22:00:00.000-06:00"
            },
            "cantidadPersonas": {
              "type": "number",
              "description": "Cantidad estimada de asistentes",
              "example": 30
            },
            "precioPaqueteColones": {
              "type": "number",
              "description": "Precio del paquete copiado al crear la reservación",
              "example": 80000
            },
            "montoAdicionalesColones": {
              "type": "number",
              "description": "Total de productos adicionales",
              "example": 15000,
              "default": 0
            },
            "descuentoColones": {
              "type": "number",
              "description": "Descuento fijo aplicado a la reservación",
              "example": 5000,
              "default": 0,
              "minimum": 0
            },
            "montoTotalColones": {
              "type": "number",
              "description": "Monto total de la reservación",
              "example": 95000
            },
            "estado": {
              "type": "string",
              "description": "Estado actual de la reservación",
              "enum": [
                "COTIZACION",
                "PENDIENTE",
                "CONFIRMADA",
                "CANCELADA",
                "REALIZADA"
              ],
              "example": "PENDIENTE"
            },
            "observaciones": {
              "type": "object",
              "description": "Observaciones generales",
              "example": "El cliente solicita acceso una hora antes",
              "nullable": true
            },
            "fechaCancelacion": {
              "type": "object",
              "description": "Fecha de cancelación",
              "example": "2026-09-20T10:00:00.000-06:00",
              "nullable": true
            },
            "motivoCancelacion": {
              "type": "object",
              "description": "Motivo de cancelación",
              "example": "Cambio de fecha solicitado por el cliente",
              "maxLength": 300,
              "nullable": true
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación",
              "example": "2026-08-21T15:00:00.000Z"
            },
            "fechaActualizacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de la última actualización",
              "example": "2026-08-21T15:00:00.000Z"
            }
          },
          "required": [
            "id",
            "clienteId",
            "tipoEventoId",
            "vendedorId",
            "fechaContacto",
            "fechaInicio",
            "fechaFin",
            "cantidadPersonas",
            "precioPaqueteColones",
            "montoAdicionalesColones",
            "descuentoColones",
            "montoTotalColones",
            "estado",
            "fechaCreacion",
            "fechaActualizacion"
          ]
        },
        "UpdateReservacionDto": {
          "type": "object",
          "properties": {
            "productosAdicionales": {
              "description": "Opciones de productos adicionales seleccionadas para la reservación",
              "example": [
                {
                  "opcionProductoAdicionalId": 1,
                  "cantidad": 2,
                  "observaciones": "Preparar para 30 personas"
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ProductoAdicionalReservacionDto"
              }
            },
            "clienteId": {
              "type": "number",
              "description": "Identificador del cliente",
              "example": 1,
              "minimum": 1
            },
            "tipoEventoId": {
              "type": "number",
              "description": "Identificador del tipo de evento",
              "example": 1,
              "minimum": 1
            },
            "paqueteId": {
              "type": "object",
              "description": "Identificador del paquete contratado",
              "example": 2,
              "minimum": 1,
              "nullable": true
            },
            "fechaContacto": {
              "type": "string",
              "description": "Fecha en que el cliente contactó a Villa Peñas. Si se omite, se usa la fecha actual",
              "example": "2026-08-21T15:00:00.000-06:00"
            },
            "fechaInicio": {
              "type": "string",
              "description": "Fecha y hora de inicio del evento",
              "example": "2026-10-10T16:00:00.000-06:00"
            },
            "fechaFin": {
              "type": "string",
              "description": "Fecha y hora de finalización del evento",
              "example": "2026-10-10T22:00:00.000-06:00"
            },
            "cantidadPersonas": {
              "type": "number",
              "description": "Cantidad estimada de asistentes",
              "example": 30,
              "minimum": 1,
              "maximum": 10000
            },
            "descuentoColones": {
              "type": "number",
              "description": "Descuento fijo aplicado a la reservación",
              "example": 5000,
              "minimum": 0,
              "default": 0
            },
            "observaciones": {
              "type": "object",
              "description": "Observaciones generales",
              "example": "El cliente solicita acceso una hora antes",
              "maxLength": 2000,
              "nullable": true
            }
          }
        },
        "CambiarEstadoInicialDto": {
          "type": "object",
          "properties": {
            "estado": {
              "type": "string",
              "description": "Estado previo a la confirmación mediante pago",
              "enum": [
                "COTIZACION",
                "PENDIENTE"
              ],
              "example": "PENDIENTE"
            }
          },
          "required": [
            "estado"
          ]
        },
        "CancelarReservacionDto": {
          "type": "object",
          "properties": {
            "motivo": {
              "type": "string",
              "description": "Motivo de la cancelación",
              "example": "El cliente solicitó cancelar por cambio de planes",
              "minLength": 5,
              "maxLength": 300
            }
          },
          "required": [
            "motivo"
          ]
        },
        "CreatePagoDto": {
          "type": "object",
          "properties": {
            "reservacionId": {
              "type": "number",
              "description": "Identificador de la reservación",
              "example": 1,
              "minimum": 1
            },
            "montoColones": {
              "type": "number",
              "description": "Monto pagado en colones",
              "example": 20000,
              "minimum": 1,
              "maximum": 100000000
            },
            "fechaPago": {
              "type": "string",
              "description": "Fecha y hora del pago. Si no se envía, se utiliza la fecha actual",
              "example": "2026-08-24T15:00:00.000-06:00"
            },
            "concepto": {
              "type": "string",
              "description": "Concepto del pago",
              "enum": [
                "DEPOSITO",
                "ABONO",
                "PAGO_FINAL"
              ],
              "example": "DEPOSITO"
            },
            "metodoPago": {
              "type": "string",
              "description": "Método utilizado para realizar el pago",
              "enum": [
                "EFECTIVO",
                "SINPE_MOVIL",
                "TRANSFERENCIA",
                "TARJETA",
                "OTRO"
              ],
              "example": "SINPE_MOVIL"
            },
            "numeroReferencia": {
              "type": "string",
              "description": "Número de referencia de la transacción",
              "example": "SINPE-20260824-001",
              "maxLength": 100
            },
            "comprobanteUrl": {
              "type": "string",
              "description": "URL o ruta del comprobante almacenado en el servidor",
              "example": "/uploads/comprobantes/pago-001.jpg",
              "maxLength": 2048
            },
            "observaciones": {
              "type": "string",
              "description": "Observaciones relacionadas con el pago",
              "example": "Depósito recibido mediante SINPE Móvil",
              "maxLength": 500
            }
          },
          "required": [
            "reservacionId",
            "montoColones",
            "concepto",
            "metodoPago"
          ]
        },
        "Pago": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador del pago",
              "example": 1
            },
            "reservacionId": {
              "type": "number",
              "description": "Identificador de la reservación",
              "example": 1
            },
            "registradoPorId": {
              "type": "object",
              "description": "Identificador del usuario que registró el pago",
              "example": 1,
              "nullable": true
            },
            "montoColones": {
              "type": "number",
              "description": "Monto pagado en colones",
              "example": 20000,
              "minimum": 1
            },
            "fechaPago": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha y hora del pago",
              "example": "2026-08-21T15:00:00.000-06:00"
            },
            "concepto": {
              "type": "string",
              "description": "Concepto del pago",
              "enum": [
                "DEPOSITO",
                "ABONO",
                "PAGO_FINAL"
              ],
              "example": "DEPOSITO"
            },
            "metodoPago": {
              "type": "string",
              "description": "Método utilizado para pagar",
              "enum": [
                "EFECTIVO",
                "SINPE_MOVIL",
                "TRANSFERENCIA",
                "TARJETA",
                "OTRO"
              ],
              "example": "SINPE_MOVIL"
            },
            "numeroReferencia": {
              "type": "object",
              "description": "Número de referencia de la transacción",
              "example": "SINPE-20260821-001",
              "maxLength": 100,
              "nullable": true
            },
            "comprobanteUrl": {
              "type": "object",
              "description": "URL del comprobante",
              "example": "https://ejemplo.com/comprobantes/pago-1.jpg",
              "maxLength": 2048,
              "nullable": true
            },
            "observaciones": {
              "type": "object",
              "description": "Observaciones del pago",
              "example": "Depósito recibido mediante SINPE",
              "maxLength": 500,
              "nullable": true
            },
            "anulado": {
              "type": "boolean",
              "description": "Indica si el pago fue anulado",
              "example": false,
              "default": false
            },
            "anuladoPorId": {
              "type": "object",
              "description": "Identificador del usuario que anuló el pago",
              "example": 1,
              "nullable": true
            },
            "fechaAnulacion": {
              "type": "object",
              "description": "Fecha y hora de anulación",
              "example": "2026-08-22T10:00:00.000-06:00",
              "nullable": true
            },
            "motivoAnulacion": {
              "type": "object",
              "description": "Motivo de la anulación",
              "example": "Pago registrado por duplicado",
              "maxLength": 500,
              "nullable": true
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación del registro",
              "example": "2026-08-21T15:00:00.000Z"
            }
          },
          "required": [
            "id",
            "reservacionId",
            "registradoPorId",
            "montoColones",
            "fechaPago",
            "concepto",
            "metodoPago",
            "anulado",
            "fechaCreacion"
          ]
        },
        "AnularPagoDto": {
          "type": "object",
          "properties": {
            "motivo": {
              "type": "string",
              "description": "Motivo por el cual se anula el pago",
              "example": "El pago fue registrado por duplicado",
              "minLength": 5,
              "maxLength": 500
            }
          },
          "required": [
            "motivo"
          ]
        },
        "CreateReservacionProductoAdicionalDto": {
          "type": "object",
          "properties": {
            "reservacionId": {
              "type": "number",
              "description": "Identificador de la reservación",
              "example": 1,
              "minimum": 1
            },
            "opcionProductoAdicionalId": {
              "type": "number",
              "description": "Identificador de la opción del producto adicional",
              "example": 2,
              "minimum": 1
            },
            "cantidad": {
              "type": "number",
              "description": "Cantidad de opciones contratadas",
              "example": 1,
              "default": 1,
              "minimum": 1,
              "maximum": 1000
            },
            "observaciones": {
              "type": "object",
              "description": "Observaciones específicas",
              "example": "Preparar las palomitas a partir de las 4:00 p. m.",
              "maxLength": 500,
              "nullable": true
            }
          },
          "required": [
            "reservacionId",
            "opcionProductoAdicionalId"
          ]
        },
        "ReservacionProductoAdicional": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador del producto agregado a la reservación",
              "example": 1
            },
            "reservacionId": {
              "type": "number",
              "description": "Identificador de la reservación",
              "example": 1
            },
            "opcionProductoAdicionalId": {
              "type": "number",
              "description": "Identificador de la opción seleccionada",
              "example": 2
            },
            "cantidad": {
              "type": "number",
              "description": "Cantidad de opciones contratadas",
              "example": 1,
              "minimum": 1
            },
            "precioUnitarioColones": {
              "type": "number",
              "description": "Precio unitario copiado al agregar la opción",
              "example": 15000,
              "minimum": 0
            },
            "subtotalColones": {
              "type": "number",
              "description": "Subtotal calculado por el backend",
              "example": 15000,
              "minimum": 0
            },
            "observaciones": {
              "type": "object",
              "description": "Observaciones específicas",
              "example": "Preparar las palomitas a partir de las 4:00 p. m.",
              "maxLength": 500,
              "nullable": true
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha en que se agregó la opción",
              "example": "2026-08-21T15:00:00.000Z"
            }
          },
          "required": [
            "id",
            "reservacionId",
            "opcionProductoAdicionalId",
            "cantidad",
            "precioUnitarioColones",
            "subtotalColones",
            "fechaCreacion"
          ]
        },
        "UpdateReservacionProductoAdicionalDto": {
          "type": "object",
          "properties": {
            "cantidad": {
              "type": "number",
              "description": "Cantidad de opciones contratadas",
              "example": 1,
              "default": 1,
              "minimum": 1,
              "maximum": 1000
            },
            "observaciones": {
              "type": "object",
              "description": "Observaciones específicas",
              "example": "Preparar las palomitas a partir de las 4:00 p. m.",
              "maxLength": 500,
              "nullable": true
            }
          }
        },
        "CreateUsuarioDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del usuario",
              "example": "María",
              "minLength": 2,
              "maxLength": 80
            },
            "apellidos": {
              "type": "string",
              "description": "Apellidos del usuario",
              "example": "Rodríguez Solano",
              "minLength": 2,
              "maxLength": 120
            },
            "telefono": {
              "type": "object",
              "description": "Teléfono del usuario",
              "example": "+506 8888-8888",
              "maxLength": 20,
              "nullable": true
            },
            "correo": {
              "type": "string",
              "description": "Correo utilizado para iniciar sesión",
              "example": "vendedor@villapenas.com",
              "maxLength": 150
            },
            "password": {
              "type": "string",
              "description": "Contraseña inicial del usuario",
              "example": "VillaPenas-2026",
              "minLength": 12,
              "maxLength": 128,
              "writeOnly": true
            },
            "rol": {
              "type": "string",
              "description": "Rol asignado al usuario",
              "enum": [
                "ADMINISTRADOR",
                "VENDEDOR"
              ],
              "example": "VENDEDOR"
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el usuario puede iniciar sesión",
              "example": true,
              "default": true
            }
          },
          "required": [
            "nombre",
            "apellidos",
            "correo",
            "password",
            "rol"
          ]
        },
        "Usuario": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Identificador del usuario",
              "example": 1
            },
            "nombre": {
              "type": "string",
              "description": "Nombre del usuario",
              "example": "Gloriana",
              "maxLength": 80
            },
            "apellidos": {
              "type": "string",
              "description": "Apellidos del usuario",
              "example": "Peña Ramírez",
              "maxLength": 120
            },
            "telefono": {
              "type": "object",
              "description": "Teléfono del usuario",
              "example": "+50688888888",
              "maxLength": 20,
              "nullable": true
            },
            "correo": {
              "type": "string",
              "description": "Correo utilizado para iniciar sesión",
              "example": "gloryx@msn.com",
              "maxLength": 150
            },
            "rol": {
              "type": "string",
              "description": "Rol del usuario",
              "enum": [
                "ADMINISTRADOR",
                "VENDEDOR"
              ],
              "example": "ADMINISTRADOR"
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el usuario puede ingresar al sistema",
              "example": true,
              "default": true
            },
            "fechaCreacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de creación",
              "example": "2026-08-21T15:00:00.000Z"
            },
            "fechaActualizacion": {
              "format": "date-time",
              "type": "string",
              "description": "Fecha de la última actualización",
              "example": "2026-08-21T15:00:00.000Z"
            }
          },
          "required": [
            "id",
            "nombre",
            "apellidos",
            "correo",
            "rol",
            "activo",
            "fechaCreacion",
            "fechaActualizacion"
          ]
        },
        "CambiarPasswordUsuarioDto": {
          "type": "object",
          "properties": {
            "nuevaPassword": {
              "type": "string",
              "description": "Nueva contraseña del usuario",
              "example": "NuevaClaveSegura-2026",
              "minLength": 12,
              "maxLength": 128,
              "writeOnly": true
            }
          },
          "required": [
            "nuevaPassword"
          ]
        },
        "UpdateUsuarioDto": {
          "type": "object",
          "properties": {
            "nombre": {
              "type": "string",
              "description": "Nombre del usuario",
              "example": "María",
              "minLength": 2,
              "maxLength": 80
            },
            "apellidos": {
              "type": "string",
              "description": "Apellidos del usuario",
              "example": "Rodríguez Solano",
              "minLength": 2,
              "maxLength": 120
            },
            "telefono": {
              "type": "object",
              "description": "Teléfono del usuario",
              "example": "+506 8888-8888",
              "maxLength": 20,
              "nullable": true
            },
            "correo": {
              "type": "string",
              "description": "Correo utilizado para iniciar sesión",
              "example": "vendedor@villapenas.com",
              "maxLength": 150
            },
            "rol": {
              "type": "string",
              "description": "Rol asignado al usuario",
              "enum": [
                "ADMINISTRADOR",
                "VENDEDOR"
              ],
              "example": "VENDEDOR"
            },
            "activo": {
              "type": "boolean",
              "description": "Indica si el usuario puede iniciar sesión",
              "example": true,
              "default": true
            }
          }
        },
        "LoginDto": {
          "type": "object",
          "properties": {
            "correo": {
              "type": "string",
              "example": "gloryx@msn.com"
            },
            "password": {
              "type": "string",
              "example": "VillaPenas2026!",
              "minLength": 8
            }
          },
          "required": [
            "correo",
            "password"
          ]
        }
      }
    }
  },
  "customOptions": {
    "persistAuthorization": true,
    "displayRequestDuration": true,
    "filter": true
  }
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
