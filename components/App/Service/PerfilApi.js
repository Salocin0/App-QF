import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from '@env';


// Definir la API para obtener y actualizar datos del perfil del usuario
export const perfilApi = createApi({
  reducerPath: "perfilApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}` }),
  endpoints: (builder) => ({
    getPerfil: builder.query({
      query: (id) => ({
        url: `/consumidor/${id}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
    }),
    updateConsumidor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/consumidor/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.code;
        }
      },
    }),
    updateProductor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/productor/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.code;
        }
      },
    }),
    updateEncargado: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/encargado/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.code;
        }
      },
    }),
  }),
});

export const {
  useGetPerfilQuery,
  useUpdateConsumidorMutation,
  useUpdateProductorMutation,
  useUpdateEncargadoMutation,
} = perfilApi;
