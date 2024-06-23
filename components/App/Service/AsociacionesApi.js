import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_BACK_URL } from '@env';

export const asociacionesApi = createApi({
  reducerPath: "asociacionesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}`, forceRefetch: true }),
  endpoints: (builder) => ({
    getAsociaciones: builder.query({
      query: (consumidorId) => ({
        url: `/asociacion/buscarR/${consumidorId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          console.log("error");
        }
      }
    }),
    createAsociacion: builder.mutation({
      query: ({ eventoId, puestoId, consumidorId }) => ({
        url: `/asociacion/evento/${eventoId}/asociarSimple/${puestoId}/${consumidorId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          console.log("error");
        }
      }
    }),
  })
});

export const { useGetAsociacionesQuery, useCreateAsociacionMutation } = asociacionesApi;
