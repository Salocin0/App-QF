import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = [];
const CARRITO_STORAGE_KEY = "carritoPersistido";

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    setCarrito: (state, action) => action.payload,
    agregarProducto: (state, action) => {
      const { id, fecha, preventa, producto, puesto, puestoNombre } = action.payload;
      const cantidadAAgregar = Number(action.payload.cantidad) > 0 ? Number(action.payload.cantidad) : 1;
      const conjunto = state.find(
        (item) => item.id === id && item.fecha === fecha && item.preventa === preventa && item.puesto === puesto
      );

      if (conjunto) {
        if (!conjunto.puestoNombre && puestoNombre) {
          conjunto.puestoNombre = puestoNombre;
        }
        const existingProduct = conjunto.productos.find(
          (p) => p.id === producto.id
        );
        if (existingProduct) {
          existingProduct.cantidad += cantidadAAgregar;
        } else {
          conjunto.productos.push({ ...producto, cantidad: cantidadAAgregar });
        }
      } else {
        state.push({
          id,
          fecha,
          preventa,
          puesto,
          puestoNombre,
          productos: [{ ...producto, cantidad: cantidadAAgregar }],
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

export const inicializarCarrito = () => async (dispatch) => {
  try {
    const carritoGuardado = await AsyncStorage.getItem(CARRITO_STORAGE_KEY);
    if (!carritoGuardado) {
      return;
    }

    const carrito = JSON.parse(carritoGuardado);
    if (Array.isArray(carrito)) {
      dispatch(setCarrito(carrito));
    }
  } catch (error) {
    console.log("No se pudo cargar el carrito guardado:", error);
  }
};

export const guardarCarritoPersistido = (carrito) => async () => {
  try {
    await AsyncStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito || []));
  } catch (error) {
    console.log("No se pudo guardar el carrito:", error);
  }
};

export const {
  setCarrito,
  agregarProducto,
  restarProducto,
  eliminarProducto,
  eliminarConjunto,
} = carritoSlice.actions;

export default carritoSlice.reducer;
