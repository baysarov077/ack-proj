import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const constantsApi = createApi({
  reducerPath: "constantsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getContractTypes: builder.query({
      query: () => "constants/contract-types",
    }),
    getStatusTypes: builder.query({
      query: () => "constants/status-types",
    }),
    getSpeeds: builder.query({
      query: () => "constants/speeds",
    }),
    getVlanRanges: builder.query({
      query: () => "constants/vlan-ranges",
    }),
    getIpRanges: builder.query({
      query: () => "constants/ip-ranges",
    }),
    getVrfSettings: builder.query({
      query: () => "constants/vrf-settings",
    }),
  }),
});

export const {
  useGetContractTypesQuery,
  useGetStatusTypesQuery,
  useGetSpeedsQuery,
  useGetVlanRangesQuery,
  useGetIpRangesQuery,
  useGetVrfSettingsQuery,
} = constantsApi;
