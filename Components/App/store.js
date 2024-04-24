import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Service/authApi";
import authReducer from "./../Features/Auth/authSlice";
import { productoApi } from "./Service/ProductosApi";
import {puestosApi} from "./Service/PuestosApi"
import modoOscuroReducer from "../Features/modoOscuro/modoOscuroSlice";
import counterReducer from "./../Features/counter/counterSlice"
import { eventosApi } from "./Service/EventosApi";
import carritoReducer from "../Features/carrito/carritoSlice"
import { pedidoApi } from "./Service/PedidosApi";

export default configureStore({
  reducer: {
    auth: authReducer,
    modoOscuro: modoOscuroReducer,
    counter: counterReducer,
    carrito: carritoReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productoApi.reducerPath]: productoApi.reducer,
    [eventosApi.reducerPath]: eventosApi.reducer,
    [puestosApi.reducerPath]: puestosApi.reducer,
    [pedidoApi.reducerPath]: pedidoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productoApi.middleware,
      eventosApi.middleware,
      puestosApi.middleware,
      pedidoApi.middleware
    ),
});