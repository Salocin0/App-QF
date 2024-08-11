import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const asignacionesApi = createApi({
  reducerPath: 'asignacionesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_API_URL}` }),
  endpoints: (builder) => ({
    getAsignaciones: builder.query({
      query: (consumidorid) => ({
        url: '/asignaciones/',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'consumidorid': consumidorid,
        },
      }),
    }),
    refetchAsignaciones: builder.query({
      query: (consumidorid) => ({
        url: '/asignaciones/',
        headers: {
          "Content-Type": "application/json",
          'consumidorid': consumidorid,
        },
      }),
    }),
    acceptAsignacion: builder.mutation({
      query: (id) => ({
        url: `/asignaciones/aceptar/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    rejectAsignacion: builder.mutation({
      query: (id) => ({
        url: `/asignaciones/rechazar/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
});

export const {
  useGetAsignacionesQuery,
  useLazyRefetchAsignacionesQuery,
  useAcceptAsignacionMutation,
  useRejectAsignacionMutation,
} = asignacionesApi;

export const usePollingAsignacionesQuery = (consumidorid) => {
  const { data, error, isLoading, refetch } = useGetAsignacionesQuery(consumidorid, {
    pollingInterval: 5000,
  });

  return { data, error, isLoading, refetch };
};
