import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ackApi = createApi({
  reducerPath: "ackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
  tagTypes: ["Ack"],
  endpoints: (builder) => ({
    getAcks: builder.query({
      query: () => "ack",
      providesTags: ["Ack"],
    }),
    addAck: builder.mutation({
      query: (body) => ({
        url: "ack",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ack"],
    }),
    updateAck: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `ack/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Ack"],
    }),
    deleteAck: builder.mutation({
      query: (id) => ({
        url: `ack/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ack"],
    }),
  }),
});

export const {
  useGetAcksQuery,
  useAddAckMutation,
  useUpdateAckMutation,
  useDeleteAckMutation,
} = ackApi;
