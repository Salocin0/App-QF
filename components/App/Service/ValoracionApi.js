import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const valoracionApi = createApi({
  reducerPath: "valoracionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_API_URL}` }),
  endpoints: (builder) => ({
    createValoracion: builder.mutation({
      query: (data) => {
        const url = `/valoracion/${data.idPuesto}`;
        console.log("URL de la solicitud:", url);
        console.log("Datos de la valoración:", data.valoracion);
        
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
