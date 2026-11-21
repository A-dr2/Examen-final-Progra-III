import { describe, it, expect, vi } from "vitest";
import {
  ApiError,
  getExtras,
  getPackage,
  getPackages,
  isExtra,
  isPackage,
} from "../src/services/api";
import { matches } from "../src/format";
// Respuestas mínimas controladas exclusivamente para verificar errores de contrato.
const pkg = {
  id: 7,
  nombre: "Prueba",
  descripcion: "",
  precioColones: 60000,
  activo: true,
  paquetesServicios: [],
};
describe("contrato HTTP y aislamiento de errores", () => {
  it("consulta GET sin credenciales y usa la ruta pública", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify([pkg])));
    expect(await getPackages()).toEqual([pkg]);
    expect(fetchMock).toHaveBeenCalledWith(
      "/consulta/public/paquetes",
      expect.objectContaining({ method: "GET", credentials: "omit" }),
    );
  });
  it("acepta un catálogo realmente vacío", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]"));
    expect(await getExtras()).toEqual([]);
  });
  it("conserva el estado HTTP para una consulta fallida", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{}", { status: 503 }),
    );
    await expect(getPackages()).rejects.toMatchObject({ status: 503 });
  });
  it("rechaza HTML y objetos mal formados sin presentarlos como catálogos vacíos", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("<html>error</html>"))
      .mockResolvedValueOnce(new Response("{}"));
    await expect(getPackages()).rejects.toThrow("JSON");
    await expect(getExtras()).rejects.toThrow("formato");
  });
  it("detecta un detalle de otro identificador", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(pkg)),
    );
    await expect(getPackage(8)).rejects.toThrow("formato");
  });
  it("rechaza identificadores inválidos sin HTTP", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    await expect(getPackage(-1)).rejects.toBeInstanceOf(ApiError);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("convierte fallos de red en un error entendible", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );
    await expect(getPackages()).rejects.toThrow("conexión");
  });
  it("valida los campos consumidos sin aceptar precios nulos o negativos", () => {
    expect(isPackage(pkg)).toBe(true);
    expect(isPackage({ ...pkg, precioColones: null })).toBe(false);
    expect(isPackage({ ...pkg, precioColones: -1 })).toBe(false);
    expect(isExtra({ id: 1 })).toBe(false);
  });
  it("busca sin distinguir tildes, espacios externos ni mayúsculas", () => {
    expect(matches("Micrófonos inalámbricos", "  MICROFONOS ")).toBe(true);
    expect(matches("Piscina", "parrilla")).toBe(false);
  });
});
