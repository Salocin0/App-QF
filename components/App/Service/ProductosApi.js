import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productoApi = createApi({
  reducerPath: "productoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_API_URL}` }),
  endpoints: (builder) => ({
    getProductos: builder.query({
      query: (puestoId) => ({
        url: `/producto`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'puestoid': puestoId
        }
      }),
      transformResponse: (response) => {
        if (response.status === "success") { // Corregido el operador de comparación
          return response.data;
        } else {
          console.log("error");
          return []; // Asegúrate de retornar un valor predeterminado en caso de error
        }
      }
    }),
  })
});

export const { useGetProductosQuery, useLazyGetProductosQuery } = productoApi;
