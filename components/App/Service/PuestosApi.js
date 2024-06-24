import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from "@env";

export const puestosApi = createApi({
  reducerPath: "puestosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BACK_URL}`,
    forceRefetch: true,
  }),
  endpoints: (builder) => ({
    getPuestosPorEvento: builder.query({
      query: (eventoId) => ({
        url: `/puesto/evento/${eventoId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
    }),
    getPuestosAsociacionValida: builder.query({
      query: ({ estado, idConsumidor }) => ({
        url: `/puesto/sinAsociacion/valida/eventos/${estado}/${idConsumidor}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
    }),
    getPuestosEncargado: builder.query({
      query: (consumidorId) => ({
        url: `/puesto/`,
        method: "GET",
        headers: { "Content-Type": "application/json", "consumidorid": consumidorId },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
    }),
  }),
});

export const {
  useGetPuestosPorEventoQuery,
  useGetPuestosAsociacionValidaQuery,
  useGetPuestosEncargadoQuery
} = puestosApi;
