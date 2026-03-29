import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEY = "authUserSession";

const initialState = {
  email: "",
  idToken: "",
  tipoUsuario: "",
  usuario: "",
  consumidorId: "",
  id: "", //user id
  sessionId: "",
  nombre: "",
  apellido: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => (state = actions.payload),
    clearUser: () => initialState,
  },
});

export const inicializarSesion = () => async (dispatch) => {
  try {
    const sesionGuardada = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (!sesionGuardada) {
      return;
    }

    const usuario = JSON.parse(sesionGuardada);
    if (usuario?.idToken) {
      dispatch(setUser(usuario));
    }
  } catch (error) {
    console.log("No se pudo cargar la sesion guardada:", error);
  }
};

export const guardarSesionUsuario = (usuario) => async (dispatch) => {
  dispatch(setUser(usuario));

  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(usuario));
  } catch (error) {
    console.log("No se pudo guardar la sesion:", error);
  }
};

export const cerrarSesionPersistida = () => async (dispatch) => {
  dispatch(clearUser());

  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.log("No se pudo limpiar la sesion guardada:", error);
  }
};

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
