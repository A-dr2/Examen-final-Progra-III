export interface Service {
  id: number;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
}
export interface PackageService {
  id: number;
  cantidad: number | null;
  detalle: string | null;
  orden: number;
  servicio: Service;
}
export interface Package {
  id: number;
  nombre: string;
  descripcion: string;
  precioColones: number;
  activo: boolean;
  paquetesServicios: PackageService[];
}
export interface Extra {
  id: number;
  nombre: string;
  descripcion: string | null;
  unidadMedida: string;
  cantidadIncluida: number;
  cantidadPersonas: number;
  precioVentaColones: number;
  productoAdicional: {
    id: number;
    nombre: string;
    descripcion: string;
    imagenUrl: string | null;
  };
}
