import { AlertCircle, SearchX, RefreshCw } from "lucide-react";
export function Loading({
  label = "Consultando el catálogo de Villa Peñas…",
}: {
  label?: string;
}) {
  return (
    <div className="state" role="status">
      <RefreshCw className="spin" size={26} />
      <h3>Cargando información</h3>
      <p>{label}</p>
    </div>
  );
}
export function ErrorState({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) {
  return (
    <div className="state error" role="alert">
      <AlertCircle size={28} />
      <h3>No pudimos cargar la información</h3>
      <p>{message}</p>
      <button className="button primary" onClick={retry}>
        Reintentar consulta
      </button>
    </div>
  );
}
export function Empty({ reset }: { reset?: () => void }) {
  return (
    <div className="state" role="status">
      <SearchX size={30} />
      <h3>No encontramos resultados</h3>
      <p>
        {reset
          ? "Prueba otra búsqueda o amplía tu presupuesto."
          : "El catálogo público no tiene registros disponibles."}
      </p>
      {reset && (
        <button className="button" onClick={reset}>
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
