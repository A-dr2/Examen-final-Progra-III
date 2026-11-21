import { useState } from "react";
import {
  ChevronDown,
  Flower2,
  Leaf,
  Search,
  RefreshCw,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { getExtras, getPackages } from "./services/api";
import { useResource } from "./hooks/useResource";
import { matches } from "./format";
import { PackageCard } from "./components/PackageCard";
import { ExtraCard } from "./components/ExtraCard";
import { PackageDetail } from "./components/PackageDetail";
import { Empty, ErrorState, Loading } from "./components/States";
export default function App() {
  const packages = useResource("packages", getPackages);
  const extras = useResource("extras", getExtras);
  const [tab, setTab] = useState<"packages" | "extras">("packages");
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [order, setOrder] = useState("name");
  const [selected, setSelected] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const reset = () => {
    setQuery("");
    setBudget("");
    setCategory("");
    setOrder("name");
  };
  const filteredPackages = (packages.data ?? [])
    .filter(
      (p) =>
        matches(
          [
            p.nombre,
            p.descripcion,
            ...p.paquetesServicios.map((s) => s.servicio.nombre),
          ].join(" "),
          query,
        ) &&
        (!budget || p.precioColones <= Number(budget)),
    )
    .sort((a, b) =>
      order === "low"
        ? a.precioColones - b.precioColones
        : order === "high"
          ? b.precioColones - a.precioColones
          : a.nombre.localeCompare(b.nombre, "es"),
    );
  const filteredExtras = (extras.data ?? [])
    .filter(
      (p) =>
        matches(
          [
            p.nombre,
            p.descripcion,
            p.productoAdicional.nombre,
            p.productoAdicional.descripcion,
          ].join(" "),
          query,
        ) &&
        (!budget || p.precioVentaColones <= Number(budget)) &&
        (!category || String(p.productoAdicional.id) === category),
    )
    .sort((a, b) =>
      order === "low"
        ? a.precioVentaColones - b.precioVentaColones
        : order === "high"
          ? b.precioVentaColones - a.precioVentaColones
          : a.productoAdicional.nombre.localeCompare(
              b.productoAdicional.nombre,
              "es",
            ) || a.id - b.id,
    );
  const categories = [
    ...new Map(
      (extras.data ?? []).map((e) => [
        e.productoAdicional.id,
        e.productoAdicional,
      ]),
    ).values(),
  ];
  const resource = tab === "packages" ? packages : extras;
  const count =
    tab === "packages" ? filteredPackages.length : filteredExtras.length;
  const hasFilters = Boolean(query || budget || category);
  return (
    <>
      <a className="skip" href="#catalogo">
        Saltar al catálogo
      </a>
      <header className="header">
        <a className="brand" href="#">
          <span className="brand-mark">
            <Flower2 size={29} />
          </span>
          <span>
            villa peñas<small>ESPACIOS PARA DISFRUTAR</small>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a className="nav-active" href="#catalogo">
            Explorar experiencias
          </a>
          <a href="#como-funciona">Cómo funciona</a>
        </nav>
        <span className="header-label">
          <Leaf size={16} /> Tu próximo buen recuerdo
        </span>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="little-line" /> SAL DE LA RUTINA
            </span>
            <h1>
              Los mejores momentos
              <br />
              empiezan <em>aquí.</em>
            </h1>
            <p>
              Un espacio para reunirse, celebrar y disfrutar.
              <br className="desktop-break" /> Encuentra el paquete que va
              contigo y hazlo tuyo.
            </p>
            <a className="button hero-button" href="#catalogo">
              Encuentra tu plan
            </a>
            <div className="hero-note">
              <ShieldCheck size={18} /> Información directa del catálogo de
              Villa Peñas
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun" />
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            <div className="pool">
              <div />
              <div />
              <div />
            </div>
            <div className="plant plant-one">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="plant plant-two">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="art-label">Más momentos juntos.</span>
            <span className="art-caption">
              Una pausa que se convierte en recuerdo
            </span>
          </div>
        </section>
        <section id="catalogo" className="catalog">
          <div className="section-heading">
            <div>
              <span className="eyebrow">DISEÑA TU DÍA</span>
              <h2>Un plan a tu medida</h2>
              <p>
                Explora lo que incluye cada paquete y descubre los pequeños
                extras.
              </p>
            </div>
            <button
              className="button refresh"
              onClick={() => {
                packages.retry();
                extras.retry();
              }}
              disabled={
                packages.status === "loading" || extras.status === "loading"
              }
            >
              <RefreshCw size={16} /> Actualizar catálogo
            </button>
          </div>
          <div className="tabs" role="tablist" aria-label="Catálogos">
            <button
              id="packages-tab"
              role="tab"
              aria-selected={tab === "packages"}
              aria-controls="catalog-results"
              onClick={() => {
                setTab("packages");
                reset();
              }}
            >
              Paquetes <span>{packages.data?.length ?? "—"}</span>
            </button>
            <button
              id="extras-tab"
              role="tab"
              aria-selected={tab === "extras"}
              aria-controls="catalog-results"
              onClick={() => {
                setTab("extras");
                reset();
              }}
            >
              Productos adicionales <span>{extras.data?.length ?? "—"}</span>
            </button>
          </div>
          <div className="filters">
            <label className="search-box">
              <Search size={20} />
              <span className="sr-only">Buscar en el catálogo</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  tab === "packages"
                    ? "Busca un paquete o servicio…"
                    : "Busca un producto adicional…"
                }
              />
              {query && (
                <button
                  aria-label="Limpiar búsqueda"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              )}
            </label>
            <label className="select-wrap">
              <SlidersHorizontal size={16} />
              <span className="sr-only">Presupuesto máximo</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Cualquier presupuesto</option>
                <option value="20000">Hasta ₡20.000</option>
                <option value="60000">Hasta ₡60.000</option>
                <option value="80000">Hasta ₡80.000</option>
              </select>
              <ChevronDown size={15} />
            </label>
            <label className="select-wrap">
              <span className="sr-only">Ordenar resultados</span>
              <select value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="name">Ordenar por nombre</option>
                <option value="low">Menor precio primero</option>
                <option value="high">Mayor precio primero</option>
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
          {tab === "extras" && (
            <div className="category-filters" aria-label="Tipo de producto">
              <button aria-pressed={!category} onClick={() => setCategory("")}>
                Todos los productos
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  aria-pressed={category === String(c.id)}
                  onClick={() => setCategory(String(c.id))}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
          )}
          <div
            id="catalog-results"
            role="tabpanel"
            aria-labelledby={tab === "packages" ? "packages-tab" : "extras-tab"}
          >
            <div className="results-line">
              <p role="status">
                {resource.status === "success"
                  ? `${count} ${count === 1 ? "opción disponible" : "opciones disponibles"}`
                  : "Consultando disponibilidad del catálogo"}
              </p>
              <span>Precios en colones costarricenses</span>
            </div>
            {resource.status === "loading" ? (
              <Loading />
            ) : resource.status === "error" ? (
              <ErrorState message={resource.error!} retry={resource.retry} />
            ) : count === 0 ? (
              <Empty reset={hasFilters ? reset : undefined} />
            ) : tab === "packages" ? (
              <div className="package-grid">
                {filteredPackages.map((p) => (
                  <PackageCard key={p.id} item={p} open={setSelected} />
                ))}
              </div>
            ) : (
              <div className="extras-grid">
                {filteredExtras.map((p) => (
                  <ExtraCard key={p.id} item={p} />
                ))}
              </div>
            )}
          </div>
          <p className="catalog-note">
            <ShieldCheck size={16} /> Catálogo de consulta. Los precios y
            servicios se muestran tal como los publica Villa Peñas.
          </p>
        </section>
        <section className="how" id="como-funciona">
          <div className="how-intro">
            <Sparkles size={25} />
            <h2>
              Disfrutar empieza
              <br />
              con un buen plan.
            </h2>
          </div>
          <div>
            <h3>Explora las opciones</h3>
            <p>Busca por nombre o servicio y filtra según tu presupuesto.</p>
          </div>
          <div>
            <h3>Conoce lo que incluye</h3>
            <p>Abre un paquete para consultar sus servicios actualizados.</p>
          </div>
          <div>
            <h3>Dale tu toque</h3>
            <p>Descubre productos adicionales para complementar tu día.</p>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand footer-brand" href="#">
          <Flower2 size={24} /> villa peñas
        </a>
        <p>Explorador del catálogo público · Proyecto académico</p>
        <a
          href="https://villa-penas-production.up.railway.app/api/docs"
          target="_blank"
          rel="noreferrer"
        >
          Documentación de la API
        </a>
      </footer>
      {selected !== null && (
        <PackageDetail
          key={selected}
          id={selected}
          close={() => setSelected(null)}
        />
      )}
    </>
  );
}
