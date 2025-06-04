import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const operatorsApi = createApi({
  reducerPath: "operatorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
  tagTypes: ["Operator"],
  endpoints: (builder) => ({
    getOperators: builder.query({
      query: () => "operators",
      providesTags: ["Operator"],
    }),
    addOperator: builder.mutation({
      query: (body) => ({
        url: "operators",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Operator"],
    }),
    updateOperator: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `operators/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Operator"],
    }),
    deleteOperator: builder.mutation({
      query: (id) => ({
        url: `operators/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Operator"],
    }),
  }),
});

export const {
  useGetOperatorsQuery,
  useAddOperatorMutation,
  useUpdateOperatorMutation,
  useDeleteOperatorMutation,
} = operatorsApi;
