import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from "@env";

// Definir la API para obtener datos del perfil del usuario
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
  }),
});

// Exportar el hook para utilizar la consulta
export const { useGetPerfilQuery } = perfilApi;
