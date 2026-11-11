import carritoReducer, { agregarProducto, eliminarConjunto } from '../components/Features/carrito/carritoSlice';

const base = { puesto: 1, puestoNombre: 'Don Choripan', preventa: false, fecha: undefined };
const choripan = { id: 10, nombre: 'Choripan', precio: 3500 };

describe('carrito: el mismo puesto en distintos eventos', () => {
  it('no mezcla productos de eventos distintos en un mismo conjunto', () => {
    let state = carritoReducer([], agregarProducto({ ...base, eventoId: 3, producto: choripan, cantidad: 1 }));
    state = carritoReducer(state, agregarProducto({ ...base, eventoId: 9, producto: choripan, cantidad: 1 }));
    expect(state.map((c) => c.eventoId)).toEqual([3, 9]);
  });

  it('suma cantidades dentro del mismo evento', () => {
    let state = carritoReducer([], agregarProducto({ ...base, eventoId: 9, producto: choripan, cantidad: 1 }));
    state = carritoReducer(state, agregarProducto({ ...base, eventoId: 9, producto: choripan, cantidad: 2 }));
    expect(state).toHaveLength(1);
    expect(state[0].productos[0].cantidad).toBe(3);
  });

  it('completa el evento de un conjunto guardado sin eventoId', () => {
    const legacy = [{ ...base, productos: [{ ...choripan, cantidad: 1 }] }];
    const state = carritoReducer(legacy, agregarProducto({ ...base, eventoId: 9, producto: choripan, cantidad: 1 }));
    expect(state).toHaveLength(1);
    expect(state[0].eventoId).toBe(9);
  });

  it('eliminarConjunto quita solo el conjunto del evento indicado', () => {
    let state = carritoReducer([], agregarProducto({ ...base, eventoId: 3, producto: choripan, cantidad: 1 }));
    state = carritoReducer(state, agregarProducto({ ...base, eventoId: 9, producto: choripan, cantidad: 1 }));
    state = carritoReducer(state, eliminarConjunto({ ...base, eventoId: 3 }));
    expect(state.map((c) => c.eventoId)).toEqual([9]);
  });
});

describe('carrito: botón "+" del carrito', () => {
  const base = { puesto: 1, puestoNombre: 'Don Choripan', preventa: false, fecha: undefined };
  const choripan = { id: 10, nombre: 'Choripan', precio: 3500 };

  it('suma una unidad al conjunto del mismo evento', () => {
    let state = carritoReducer([], agregarProducto({ ...base, eventoId: 9, producto: choripan, cantidad: 1 }));
    state = carritoReducer(state, agregarProducto({ ...base, eventoId: 9, producto: { id: 10 }, soloSiExiste: true }));
    expect(state).toHaveLength(1);
    expect(state[0].productos[0]).toMatchObject({ id: 10, precio: 3500, cantidad: 2 });
  });

  it('no crea un conjunto con un producto sin precio si no encuentra el conjunto', () => {
    const state = carritoReducer([], agregarProducto({ ...base, eventoId: 9, producto: { id: 10 }, soloSiExiste: true }));
    expect(state).toEqual([]);
  });
});
