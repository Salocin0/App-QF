import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventosApi = createApi({
  reducerPath: "eventosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"}`,
  }),
  tagTypes: ["Evento"], // Define tags to associate with queries
  endpoints: (builder) => ({
    getEventos: builder.query({
      query: (estadoEvento) => ({
        url: `/evento/enEstado/${estadoEvento}/`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
      providesTags: ["Evento"], // Mark this query with "Evento" tag
    }),
    getAllEventos: builder.query({
      query: ({ consumidorId }) => ({
        url: "/evento/all",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          consumidorid: consumidorId,
        },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
      providesTags: ["Evento"], // Mark this query with "Evento" tag
    }),
    getEventosEnPreparacion: builder.query({
      query: () => ({
        url: "/evento/enEstado/EnPreparacion/",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
      providesTags: ["Evento"], // Mark this query with "Evento" tag
    }),
    getEventosSinAsociacionValida: builder.query({
      query: ({ estado, idConsumidor }) => ({
        url: `/evento/enEstado/${estado}/sinAsociacionValida/${idConsumidor}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
      providesTags: ["Evento"], // Mark this query with "Evento" tag
    }),
    getEventosSinAsociacionValidaPuesto: builder.query({
      query: ({ estado, idConsumidor, idPuesto }) => ({
        url: `/evento/enEstado/${estado}/sinAsociacionValida/${idConsumidor}/puesto/${idPuesto}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
      providesTags: ["Evento"], // Mark this query with "Evento" tag
    }),
    cambiarEstadoEvento: builder.mutation({
      query: ({ id, accion }) => ({
        url: `/evento/cambiarEstado/${id}/${accion}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
      // Invalidate queries with the "Evento" tag so that they refetch after mutation
      invalidatesTags: ["Evento"],
    }),
  }),
});

export const {
  useGetEventosQuery,
  useGetAllEventosQuery,
  useGetEventosEnPreparacionQuery,
  useGetEventosSinAsociacionValidaQuery,
  useGetEventosSinAsociacionValidaPuestoQuery,
  useCambiarEstadoEventoMutation, // Mutation for changing event status
} = eventosApi;
