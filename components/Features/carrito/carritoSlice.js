import { createSlice } from "@reduxjs/toolkit";

export const carritoSlice = createSlice({
  name: "carrito",
  initialState: [],
  reducers: {
    agregarProducto: (state, action) => {
      const { producto, puesto, cantidad } = action.payload;
      const existingProduct = state.find(item => item.id === producto.id && item.puesto === puesto);
      if (existingProduct) {
        existingProduct.cantidad += cantidad;
      } else {
        state.push({ ...producto, puesto, cantidad });
      }
    },
    vaciarCarrito: (state) => {
      state.splice(0, state.length);
    },    
    eliminarProductosPorPuesto: (state, action) => {
      const puestoId = action.payload.puestoId;
      return state.filter(item => item.puesto !== Number(puestoId));
    },
     
  },
});

export const { agregarProducto, vaciarCarrito, eliminarProductosPorPuesto } = carritoSlice.actions;

export default carritoSlice.reducer;
