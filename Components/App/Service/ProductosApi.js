import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_BACK_URL } from "@env";

export const productoApi = createApi({
  reducerPath: "productoApi",
  baseQuery: fetchBaseQuery({ baseUrl:`${REACT_APP_BACK_URL}`, forceRefetch: true  }),
  endpoints: (builder) => ({
    getProductos: builder.query({
      query: (puestoId) => ({
        url: `/producto`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'puestoid': puestoId
        }
      }),
      transformResponse: (response) => {
        try {
          if (!response) return [];
          if (response && response.status === "success" && response.data) return response.data;
          if (Array.isArray(response)) return response;
        } catch (e) {
          console.warn('ProductosApi.transformResponse failed', e);
        }
        return [];
      }
    }),
  })
});

export const { useGetProductosQuery } = productoApi;
