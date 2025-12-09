import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from "@env";

export const eventosApi = createApi({
  reducerPath: "eventosApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}`, forceRefetch: true }),
  endpoints: (builder) => ({
    getEventos: builder.query({
      query: () => ({
        // Removed trailing slash to match backend routing
        url: "/evento/enEstado/EnCurso",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        console.debug("EventosApi.getEventos: respuesta no exitosa", response);
        return [];
      },
    }),
    getAllEventos: builder.query({
      // consumerId passed directly from components: useGetAllEventosQuery(userId)
      query: (consumidorId) => ({
        url: "/evento/all",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          consumidorid: consumidorId,
        },
      }),
      transformResponse: (response) => {
        if (response && response.status === "success") {
          return response.data;
        }
        // return empty array as fallback so components can handle no-data gracefully
        return [];
      },
    }),
  }),
});

export const { useGetEventosQuery, useGetAllEventosQuery } = eventosApi;
