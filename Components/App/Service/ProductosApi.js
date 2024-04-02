import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import data from './../../../data/productos.json'; 

export const productoApi = createApi({
  reducerPath: "productoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reactnativecoder-d3ff9-default-rtdb.firebaseio.com/" }),
  endpoints: (builder) => ({
    getProductsByPuestoJson: builder.query({
      query: (category) => {
        const filteredProducts = data.products.filter(product => product.category === category);
        return filteredProducts;
      },
      transformResponse: (response) => {
        return response;
      }
    }),
    getProductsByPuesto: builder.query({
      query: (category) => `/products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      }
    }),
    getPuestosJson: builder.query({
      query: () => {
        return data.puestos;
      }
    }),
    getPuestos: builder.query({
      query: () => "/puestos.json"
    }),
    getProductJson: builder.query({
      query: (id) => {
        return data.products.find(product => product.id === id);
      }
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}.json`
    })
  })
});

export const { useGetPuestosQuery, useGetProductsByPuestoQuery, useGetProductQuery, useGetPuestosJsonQuery, useGetProductsByPuestoJsonQuery, useGetProductJsonQuery } = productoApi;
