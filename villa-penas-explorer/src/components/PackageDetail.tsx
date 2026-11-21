import { useCallback, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { getPackage } from '../services/api';
import { useResource } from '../hooks/useResource';
import { money } from '../format';
import { Empty, ErrorState, Loading } from './States';
export function PackageDetail({ id, close }: { id: number; close: () => void }) {
  const load = useCallback((signal: AbortSignal) => getPackage(id, signal), [id]);
  const resource = useResource(`package-${id}`, load);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const focus = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => { dialog.close(); focus?.focus(); };
  }, []);
  return <dialog ref={ref} aria-labelledby="detail-title" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><div className="dialog-inner"><div className="detail-heading"><span className="eyebrow">CONOCE CADA DETALLE</span><button className="icon-button" aria-label="Cerrar detalle" onClick={close}><X/></button></div><h2 id="detail-title">{resource.data?.nombre ?? 'Detalle del paquete'}</h2>{resource.status === 'loading' ? <Loading label="Consultando el detalle actualizado…"/> : resource.status === 'error' ? <ErrorState message={resource.error!} retry={resource.retry}/> : resource.data ? <><p className="detail-description">{resource.data.descripcion}</p><div className="detail-price">{money(resource.data.precioColones)}<span>Precio publicado en colones</span></div><h3>Servicios incluidos</h3>{resource.data.paquetesServicios.length === 0 ? <Empty/> : <ul className="service-list">{[...resource.data.paquetesServicios].sort((a, b) => a.orden - b.orden).map(s => <li key={s.id}><Check size={20}/><div><strong>{s.servicio.nombre}</strong><p>{s.servicio.descripcion}</p>{s.cantidad !== null && <small>Cantidad: {s.cantidad} · {s.servicio.unidadMedida}</small>}{s.detalle && <p>{s.detalle}</p>}</div></li>)}</ul>}<p className="source-note">Detalle consultado en tiempo real · GET /public/paquetes/{id}</p></> : null}</div></dialog>;
}
