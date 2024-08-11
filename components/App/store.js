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
import { valoracionApi } from "./Service/ValoracionApi";
import { perfilApi } from "./Service/PerfilApi";
import { puntosEncuentroApi } from "./Service/PuntosEncuentroApi";
import { asociacionesApi } from "./Service/AsociacionesApi"
import {asignacionesApi} from "./Service/AsignacionesApi"

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
    [valoracionApi.reducerPath]:valoracionApi.reducer,
    [perfilApi.reducerPath]:perfilApi.reducer,
    [puntosEncuentroApi.reducerPath]:puntosEncuentroApi.reducer,
    [asociacionesApi.reducerPath]:asociacionesApi.reducer,
    [asignacionesApi.reducerPath]:asignacionesApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      productoApi.middleware,
      eventosApi.middleware,
      puestosApi.middleware,
      pedidoApi.middleware,
      valoracionApi.middleware,
      perfilApi.middleware,
      puntosEncuentroApi.middleware,
      asociacionesApi.middleware,
      asignacionesApi.middleware
    ),
});