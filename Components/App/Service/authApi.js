import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_BACK_URL } from "@env";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACK_URL}` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLoginUserMutation, useDeleteUserMutation } = authApi;
