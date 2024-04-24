import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  idToken: "",
  tipoUsuario: "",
  usuario: "",
  consumidorId: "",
  id: "", //user id
  sessionId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => (state = actions.payload),
    clearUser: (state) => (state = { email: "", idToken: "", tipoUsuario: "", usuario: "", consumidorId: "", id: "", sessionId: "" }),
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
