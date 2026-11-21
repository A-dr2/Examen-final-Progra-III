import { Check, Layers3 } from 'lucide-react';
import type { Package } from '../types';
import { money } from '../format';
export function PackageCard({ item, open }: { item: Package; open: (id: number) => void }) {
  const services = [...item.paquetesServicios].sort((a, b) => a.orden - b.orden);
  return <article className="package-card"><div className="card-top"><span className="card-icon"><Layers3 size={23}/></span><span className="tag">Paquete disponible</span></div><h3>{item.nombre}</h3><p className="description">{item.descripcion}</p><div className="price">{money(item.precioColones)}<span>precio del paquete</span></div><div className="included"><span>UN POCO DE LO QUE INCLUYE</span><ul>{services.slice(0, 3).map(s => <li key={s.id}><Check size={16}/>{s.servicio.nombre}</li>)}</ul>{services.length > 3 && <p>+ {services.length - 3} servicios más en el detalle</p>}</div><button className="button primary" onClick={() => open(item.id)}>Explorar paquete</button></article>;
}
