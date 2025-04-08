import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bicycle-store-ts-node.vercel.app/api",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
