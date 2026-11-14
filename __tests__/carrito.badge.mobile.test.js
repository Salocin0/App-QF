import reducer, { agregarProducto, eliminarProducto, contarUnidadesCarrito } from "../components/Features/carrito/carritoSlice";

const base = { id: 1, fecha: undefined, preventa: false, puesto: 3, puestoNombre: "Parrilla", eventoId: 12 };

describe("badge del carrito", () => {
  it("cuenta las unidades de todos los productos y puestos", () => {
    let state = reducer(undefined, { type: "@@init" });
    expect(contarUnidadesCarrito(state)).toBe(0);

    state = reducer(state, agregarProducto({ ...base, producto: { id: 7, precio: 100 }, cantidad: 2 }));
    state = reducer(state, agregarProducto({ ...base, producto: { id: 8, precio: 50 } }));
    state = reducer(state, agregarProducto({ ...base, puesto: 4, producto: { id: 9, precio: 10 }, cantidad: 3 }));
    expect(contarUnidadesCarrito(state)).toBe(6);

    state = reducer(state, eliminarProducto({ ...base, productoId: 7 }));
    expect(contarUnidadesCarrito(state)).toBe(4);
  });

  it("tolera carritos vacíos o mal formados", () => {
    expect(contarUnidadesCarrito(undefined)).toBe(0);
    expect(contarUnidadesCarrito([{ productos: null }, { productos: [{ cantidad: "2" }, {}] }])).toBe(2);
  });
});
