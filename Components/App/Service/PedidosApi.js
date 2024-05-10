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
  }),
});

export const { useCreatePedidoMutation, useGetPedidosQuery } = pedidoApi;
