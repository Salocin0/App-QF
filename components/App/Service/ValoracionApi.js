import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const valoracionApi = createApi({
  reducerPath: "valoracionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"}` }),
  endpoints: (builder) => ({
    createValoracion: builder.mutation({
      query: (data) => {
        const url = `/valoracion/${data.idPuesto}`;
        return {
          url,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.valoracion),
        };
      },
    }),
  }),
});

export const { useCreateValoracionMutation } = valoracionApi;
