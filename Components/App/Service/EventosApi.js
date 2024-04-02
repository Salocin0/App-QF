import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import eventosData from './../../../data/eventos.json';

const baseQueryFn = fetchBaseQuery({});

export const eventosApi = createApi({
  reducerPath: "eventosApi",
  baseQuery: baseQueryFn,
  endpoints: (builder) => ({
    getEventosJson: builder.query({
      query: () => {
        return eventosData;
      }
    })
  })
});


export const { useGetEventosJsonQuery } = eventosApi;
