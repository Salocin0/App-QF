import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from '@env';


export const eventosApi = createApi({
  reducerPath: "eventosApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}`, forceRefetch: true }),
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
      query: ({consumidorId}) => ({
        url: "/evento/all",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'consumidorid': consumidorId,
        },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
    }),
  }),
});

export const { useGetEventosQuery, useGetAllEventosQuery } = eventosApi;
