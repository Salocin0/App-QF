import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    agregarProducto: (state, action) => {
      const { id, fecha, preventa, producto, puesto } = action.payload;
      const conjunto = state.find(
        (item) => item.id === id && item.fecha === fecha && item.preventa === preventa && item.puesto === puesto
      );

      if (conjunto) {
        const existingProduct = conjunto.productos.find(
          (p) => p.id === producto.id
        );
        if (existingProduct) {
          existingProduct.cantidad += 1;
        } else {
          conjunto.productos.push({ ...producto, cantidad: 1 });
        }
      } else {
        state.push({
          id,
          fecha,
          preventa,
          puesto,
          productos: [{ ...producto, cantidad: 1 }],
        });
      }
    },
    restarProducto: (state, action) => {
      const { id, fecha, preventa, productoId, puesto } = action.payload;
      const conjunto = state.find(
        (item) => item.id === id && item.fecha === fecha && item.preventa === preventa && item.puesto === puesto
      );

      if (conjunto) {
        const product = conjunto.productos.find((p) => p.id === productoId);
        if (product && product.cantidad > 1) {
          product.cantidad -= 1;
        }
        // If quantity is 1, it cannot be decreased further
      }
    },
    eliminarProducto: (state, action) => {
      const { id, fecha, preventa, productoId, puesto } = action.payload;
      const conjunto = state.find(
        (item) => item.id === id && item.fecha === fecha && item.preventa === preventa && item.puesto === puesto
      );

      if (conjunto) {
        conjunto.productos = conjunto.productos.filter((p) => p.id !== productoId);
        if (conjunto.productos.length === 0) {
          const index = state.findIndex(
            (item) => item.id === id && item.fecha === fecha && item.preventa === preventa && item.puesto === puesto
          );
          state.splice(index, 1); // Remove the empty set
        }
      }
    },
    eliminarConjunto: (state, action) => {
      const { id, fecha, preventa, puesto } = action.payload;
      const index = state.findIndex(
        (item) => item.id === id && item.fecha === fecha && item.preventa === preventa && item.puesto === puesto
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {
  agregarProducto,
  restarProducto,
  eliminarProducto,
  eliminarConjunto,
} = carritoSlice.actions;

export default carritoSlice.reducer;
