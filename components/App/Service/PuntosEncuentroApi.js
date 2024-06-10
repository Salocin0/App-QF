import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const REACT_APP_BACK_URL = process.env.REACT_APP_BACK_URL

export const puntosEncuentroApi = createApi({
  reducerPath: "puntosEncuentroApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}` }),
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
        if (response.status === "success") {
          return response.data;
        }
        return [];
      },
    }),
    getPuntosEncuentroByEventoId: builder.query({
      query: (eventoId) => ({
        url: `/puntosEncuentro/${eventoId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
      },
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
        if (response.status === "success") {
          return response.data;
        }
        return null;
      },
    }),
    updatePuntoEncuentroById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/puntosEncuentro/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        }
        return null;
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
        if (response.status === "success") {
          return response.data;
        }
        return null;
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
        if (response.status === "success") {
          return response.data;
        }
        return null;
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
