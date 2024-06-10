import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const REACT_APP_BACK_URL = process.env.REACT_APP_BACK_URL

export const puestosApi = createApi({
  reducerPath: "puestosApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}`, forceRefetch: true }),
  endpoints: (builder) => ({
    getPuestosPorEvento: builder.query({
      query: (eventoId) => ({
        url: `/puesto/evento/${eventoId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status="success"){
          return response.data;
        }         
      },
    }),
  }),
});

export const { useGetPuestosPorEventoQuery } = puestosApi;
