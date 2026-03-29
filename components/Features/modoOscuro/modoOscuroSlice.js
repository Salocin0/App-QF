import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MODO_OSCURO_STORAGE_KEY = "modoOscuroActivo";

const modoOscuroSlice = createSlice({
  name: "modoOscuro",
  initialState: {
    modoOscuroActivo: true,
  },
  reducers: {
    setModoOscuro: (state, action) => {
      state.modoOscuroActivo = action.payload;
    },
    activarModoOscuro: (state) => {
      state.modoOscuroActivo = true;
    },
    desactivarModoOscuro: (state) => {
      state.modoOscuroActivo = false;
    },
  },
});

export const inicializarModoOscuro = () => async (dispatch) => {
  try {
    const modoGuardado = await AsyncStorage.getItem(MODO_OSCURO_STORAGE_KEY);
    if (modoGuardado !== null) {
      dispatch(setModoOscuro(modoGuardado === "true"));
    }
  } catch (error) {
    console.log("No se pudo cargar el modo oscuro guardado:", error);
  }
};

export const cambiarModoOscuro = () => async (dispatch, getState) => {
  const modoActual = getState().modoOscuro.modoOscuroActivo;
  const nuevoModo = !modoActual;

  dispatch(setModoOscuro(nuevoModo));

  try {
    await AsyncStorage.setItem(MODO_OSCURO_STORAGE_KEY, String(nuevoModo));
  } catch (error) {
    console.log("No se pudo guardar el modo oscuro:", error);
  }
};

export const { setModoOscuro, activarModoOscuro, desactivarModoOscuro } =
  modoOscuroSlice.actions;
export default modoOscuroSlice.reducer;
