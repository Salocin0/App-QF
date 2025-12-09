import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from "@env";

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
        // Defensive parsing: accept API shape { status: 'success', data: [...] }
        if (!response) return [];
        if (response && response.status === "success" && response.data) return response.data;
        if (Array.isArray(response)) return response;
        return [];
      },
    }),
  }),
});

export const { useGetPuestosPorEventoQuery } = puestosApi;
