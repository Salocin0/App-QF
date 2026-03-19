import { createSlice } from "@reduxjs/toolkit";

const modoOscuroSlice = createSlice({
  name: "modoOscuro",
  initialState: {
    modoOscuroActivo: false,
  },
  reducers: {
    activarModoOscuro: (state) => {
      state.modoOscuroActivo = true;
    },
    desactivarModoOscuro: (state) => {
      state.modoOscuroActivo = false;
    },
  },
});

export const { activarModoOscuro, desactivarModoOscuro } =
  modoOscuroSlice.actions;
export default modoOscuroSlice.reducer;
