import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const asociacionesApi = createApi({
  reducerPath: "asociacionesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"}`, forceRefetch: true }),
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
    getAsociacionesPuestos: builder.query({
      query: (consumidorId) => ({
        url: `/asociacion/buscar/${consumidorId}`,
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
    // Nuevo método para obtener todas las asociaciones de un evento
    getAsociacionesEvento: builder.query({
      query: (eventoId) => ({
        url: `/asociacion/evento/${eventoId}`,
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
    // Nuevo método para cambiar el estado de una asociación
    cambiarEstadoAsociacion: builder.mutation({
      query: ({ asociacionId, accion }) => ({
        url: `/asociacion/cambiarEstado/${asociacionId}/${accion}`,
        method: 'POST', // Suponiendo que cambias el estado usando PATCH, puedes cambiarlo a POST o PUT si es necesario
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

// Exporta los hooks generados
export const {
  useGetAsociacionesQuery,
  useCreateAsociacionMutation,
  useGetAsociacionesPuestosQuery,
  useGetAsociacionesEventoQuery, // Hook para obtener asociaciones de un evento
  useCambiarEstadoAsociacionMutation, // Hook para cambiar el estado de una asociación
} = asociacionesApi;
