import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from "@env";

export const pedidoApi = createApi({
  reducerPath: "pedidoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}` }),
  endpoints: (builder) => ({
    createPedido: builder.mutation({
      query: (orderData) => ({
        url: "/pedido/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      }),
    }),
    getPedidos: builder.query({
      query: (consumidorid) => ({
        url: "/pedido/",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'consumidorid': consumidorid
        }
      }),
    }),
    // Repartidor endpoints
    getPedidosRepartidor: builder.query({
      // Hits the backend endpoint that returns pedidos asignados a un repartidor
      query: (repartidorid) => ({
        url: "/pedido/repartidor",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          // example usage: backend expects 'consumidorid' header per API examples
          'consumidorid': repartidorid
        }
      }),
    }),
    // For historial we fetch /pedido/ and filter entregados client-side
    getHistorialPedidosRepartidor: builder.query({
      query: (repartidorid) => ({
        url: "/pedido/",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'consumidorid': repartidorid
        }
      }),
    }),
  }),
});

export const { useCreatePedidoMutation, useGetPedidosQuery, useGetPedidosRepartidorQuery, useGetHistorialPedidosRepartidorQuery } = pedidoApi;
