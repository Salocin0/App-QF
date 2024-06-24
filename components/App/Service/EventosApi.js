import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from "@env";

export const eventosApi = createApi({
  reducerPath: "eventosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BACK_URL}`,
    forceRefetch: true,
  }),
  endpoints: (builder) => ({
    getEventos: builder.query({
      query: () => ({
        url: "/evento/enEstado/EnCurso/",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
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
    }),
  }),
});

export const {
  useGetEventosQuery,
  useGetAllEventosQuery,
  useGetEventosEnPreparacionQuery,
  useGetEventosSinAsociacionValidaQuery,
  useGetEventosSinAsociacionValidaPuestoQuery,
} = eventosApi;
