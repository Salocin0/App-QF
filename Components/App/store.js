import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './Service/authApi'
import authReducer from "./../Features/Auth/authSlice"

export default configureStore({
  reducer: { 
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),

})