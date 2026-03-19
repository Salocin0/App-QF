import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Crea la API para manejar las ubicaciones
export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"}`, // Asegúrate de tener esta variable configurada
  }),
  endpoints: (builder) => ({
    // Endpoint para actualizar la ubicación del usuario
    updateUbicacion: builder.mutation({
      query: ({ idUsuario, latitud, longitud }) => ({
        url: `/user/newUbicacion`, // Ruta en el backend para actualizar la ubicación
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { idUsuario, latitud, longitud }, // Enviar la ubicación en el cuerpo de la solicitud
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data; // Retorna los datos del servidor si la actualización es exitosa
        } else {
          console.error("Error al actualizar la ubicación");
          return null;
        }
      },
    }),
  }),
});

export const { useUpdateUbicacionMutation } = locationApi;
