import type { Extra, Package } from '../types';
export const ORIGIN = 'https://villa-penas-production.up.railway.app';
export class ApiError extends Error {
  constructor(message: string, public status?: number) { super(message); this.name = 'ApiError'; }
}
const record = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
const amount = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0;
export function isPackage(v: unknown): v is Package {
  return record(v) && Number.isSafeInteger(v.id) && Number(v.id) > 0 && typeof v.nombre === 'string'
    && typeof v.descripcion === 'string' && amount(v.precioColones) && typeof v.activo === 'boolean'
    && Array.isArray(v.paquetesServicios) && v.paquetesServicios.every(s => record(s) && Number.isSafeInteger(s.id)
      && amount(s.orden) && (s.cantidad === null || amount(s.cantidad)) && (s.detalle === null || typeof s.detalle === 'string')
      && record(s.servicio) && Number.isSafeInteger(s.servicio.id) && typeof s.servicio.nombre === 'string'
      && typeof s.servicio.descripcion === 'string' && typeof s.servicio.unidadMedida === 'string');
}
export function isExtra(v: unknown): v is Extra {
  return record(v) && Number.isSafeInteger(v.id) && Number(v.id) > 0 && typeof v.nombre === 'string'
    && (v.descripcion === null || typeof v.descripcion === 'string') && typeof v.unidadMedida === 'string'
    && amount(v.cantidadIncluida) && amount(v.cantidadPersonas) && amount(v.precioVentaColones)
    && record(v.productoAdicional) && Number.isSafeInteger(v.productoAdicional.id)
    && typeof v.productoAdicional.nombre === 'string' && typeof v.productoAdicional.descripcion === 'string'
    && (v.productoAdicional.imagenUrl === null || typeof v.productoAdicional.imagenUrl === 'string');
}
async function get<T>(path: string, valid: (value: unknown) => value is T, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try { response = await fetch(`/consulta${path}`, { method: 'GET', credentials: 'omit', signal, headers: { Accept: 'application/json' } }); }
  catch (error) {
    if (signal?.aborted) throw error;
    throw new ApiError('No se pudo conectar con Villa Peñas. Comprueba tu conexión e inténtalo de nuevo.');
  }
  if (!response.ok) throw new ApiError(`La consulta no se completó (HTTP ${response.status}). Inténtalo de nuevo.`, response.status);
  let data: unknown;
  try { data = await response.json(); } catch { throw new ApiError('El servicio no devolvió una respuesta JSON válida.'); }
  if (!valid(data)) throw new ApiError('La respuesta del servicio tiene un formato inesperado.');
  return data;
}
export const getPackages = (signal?: AbortSignal) => get('/public/paquetes', (v): v is Package[] => Array.isArray(v) && v.every(isPackage), signal);
export const getExtras = (signal?: AbortSignal) => get('/public/opciones-productos-adicionales', (v): v is Extra[] => Array.isArray(v) && v.every(isExtra), signal);
export const getPackage = (id: number, signal?: AbortSignal) => {
  if (!Number.isSafeInteger(id) || id <= 0) return Promise.reject(new ApiError('El identificador de paquete no es válido.'));
  return get(`/public/paquetes/${id}`, (v): v is Package => isPackage(v) && v.id === id, signal);
};
