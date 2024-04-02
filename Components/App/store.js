import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './Service/authApi'
import authReducer from "./../Features/Auth/authSlice"
import { productoApi } from './Service/ProductosApi'
import { eventosApi } from './Service/EventosApi'
import { puestosApi } from './Service/PuestosApi'

export default configureStore({
  reducer: { 
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productoApi.reducerPath]: productoApi.reducer,
    [eventosApi.reducerPath]: eventosApi.reducer,
    [puestosApi.reducerPath]: puestosApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,productoApi.middleware,eventosApi.middleware,puestosApi.middleware),

})