import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProductTag {
  type: "Products";
  id: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}api`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Products"],
});

export default baseApi;
