import { useState } from 'react';
import { Gift, Users } from 'lucide-react';
import type { Extra } from '../types';
import { ORIGIN } from '../services/api';
import { money } from '../format';
export function ExtraCard({ item }: { item: Extra }) {
  const [failed, setFailed] = useState(false);
  const image = item.productoAdicional.imagenUrl;
  return <article className="extra-card"><div className="extra-photo">{image && !failed ? <img src={new URL(image, ORIGIN).href} alt={item.productoAdicional.nombre} loading="lazy" onError={() => setFailed(true)}/> : <Gift size={36}/>}</div><div className="extra-body"><p className="extra-category">{item.productoAdicional.nombre}</p><h3>{item.nombre}</h3><p>{item.descripcion ?? item.productoAdicional.descripcion}</p><div className="extra-meta"><span><Users size={15}/> {item.cantidadPersonas} personas</span><span>{item.cantidadIncluida} · {item.unidadMedida}</span></div><strong className="extra-price">{money(item.precioVentaColones)}</strong></div></article>;
}
