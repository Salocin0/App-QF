import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Service/authApi";
import authReducer from "./../Features/Auth/authSlice";
import { productoApi } from "./Service/ProductosApi";
import { eventosApi } from "./Service/EventosApi";
import { puestosApi } from "./Service/PuestosApi";
import modoOscuroReducer from "../Features/modoOscuro/modoOscuroSlice";
import counterReducer from "./../Features/counter/counterSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    modoOscuro: modoOscuroReducer,
    counter: counterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productoApi.reducerPath]: productoApi.reducer,
    [eventosApi.reducerPath]: eventosApi.reducer,
    [puestosApi.reducerPath]: puestosApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productoApi.middleware,
      eventosApi.middleware,
      puestosApi.middleware
    ),
});
