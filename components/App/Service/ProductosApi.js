import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_BACK_URL } from '@env';


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
        if (response.status="success"){
          return response.data;
        }else{
          console.log("error")
        }
      }
    }),
  })
});

export const { useGetProductosQuery } = productoApi;
