import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const puntosEncuentroApi = createApi({
  reducerPath: "puntosEncuentroApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getAllPuntosEncuentro: builder.query({
      query: () => ({
        url: "/puntosEncuentro/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        return []; // Return empty array if response is not successful
      },
      keepUnusedDataFor: 60, // Cache data for 60 seconds
    }),
    getPuntosEncuentroByEventoId: builder.query({
      query: (eventoId) => ({
        url: `/puntosEncuentro/${eventoId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        return []; // Return empty array if response is not successful
      },
      keepUnusedDataFor: 60, // Cache data for 60 seconds
    }),
    getPuntoEncuentroById: builder.query({
      query: (id) => ({
        url: `/puntosEncuentro/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        return null; // Return null if response is not successful
      },
      keepUnusedDataFor: 60, // Cache data for 60 seconds
    }),
    updatePuntoEncuentroById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/puntosEncuentro/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        return null; // Return null if response is not successful
      },
    }),
    createPuntoEncuentro: builder.mutation({
      query: (data) => ({
        url: "/puntosEncuentro/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        return null; // Return null if response is not successful
      },
    }),
    deletePuntoEncuentroById: builder.mutation({
      query: (id) => ({
        url: `/puntosEncuentro/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        return null; // Return null if response is not successful
      },
    }),
  }),
});

export const {
  useGetAllPuntosEncuentroQuery,
  useGetPuntosEncuentroByEventoIdQuery,
  useGetPuntoEncuentroByIdQuery,
  useUpdatePuntoEncuentroByIdMutation,
  useCreatePuntoEncuentroMutation,
  useDeletePuntoEncuentroByIdMutation,
} = puntosEncuentroApi;
