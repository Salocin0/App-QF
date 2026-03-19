import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pedidoApi = createApi({
  reducerPath: "pedidoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"}` }),
  tagTypes: ["Pedido", "PedidoRepartidor"], // Define las etiquetas

  endpoints: (builder) => ({
    createPedido: builder.mutation({
      query: (orderData) => ({
        url: "/pedido/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      }),
      invalidatesTags: ["Pedido"], // Invalida la consulta para actualizar los pedidos después de la creación
    }),

    getPedidos: builder.query({
      query: (consumidorid) => ({
        url: "/pedido/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "consumidorid": consumidorid,
        },
      }),
      providesTags: ["Pedido"], // Proporciona una etiqueta para poder invalidarla después
    }),

    getPedidosRepartidor: builder.query({
      query: (consumidorid) => ({
        url: `/pedido/repartidor`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "consumidorid": consumidorid,
        },
      }),
      providesTags: ["PedidoRepartidor"], // Proporciona una etiqueta para invalidar
    }),

    cambiarEstadoPedido: builder.mutation({
      query: ({ id, accion }) => ({
        url: `/pedido/cambiarEstado/${id}/${accion}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
      // Invalida las etiquetas para forzar la recarga de pedidos y pedidos del repartidor
      invalidatesTags: ["Pedido", "PedidoRepartidor"],
    }),
  }),
});

export const {
  useCreatePedidoMutation,
  useGetPedidosQuery,
  useGetPedidosRepartidorQuery,
  useCambiarEstadoPedidoMutation,
} = pedidoApi;
