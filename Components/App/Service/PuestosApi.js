import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import data from './../../../data/puestos.json';

export const puestosApi = createApi({
  reducerPath: "puestosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reactnativecoder-d3ff9-default-rtdb.firebaseio.com/" }),
  endpoints: (builder) => ({
    getPuestosJson: builder.query({
      query: () => {
        return data.puestos;
      }
    }),
    getPuestos: builder.query({
      query: () => "/puestos.json"
    })
  })
});

export const { useGetPuestosQuery, useGetPuestosJsonQuery } = puestosApi;
