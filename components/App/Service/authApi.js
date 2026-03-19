import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"}` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
    recuperarContrasenia: builder.mutation({
      query: (correoElectronico) => ({
        url: "/user/recuperarcontrasenia",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correoElectronico }),
      }),
      transformResponse: (response) => {
        return response.status === "success";
      },
    }),
    nuevaContraseña: builder.mutation({
      query: ({ contraseña, codigo }) => ({
        url: `/user/recuperarcontrasenia/${codigo}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contraseña }),
      }),
      transformResponse: (response) => {
        return response.status === "success";
      },
    }),
    cerrarMobile: builder.mutation({
      query: (id) => ({
        url: `/user/cerrarMobile`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }),
      transformResponse: (response) => {
        return response.status === "success";
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useDeleteUserMutation,
  useRecuperarContraseniaMutation,
  useNuevaContraseñaMutation,
  useCerrarMobileMutation,
} = authApi;
