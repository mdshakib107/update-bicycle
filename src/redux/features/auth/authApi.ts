import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // Login mutation
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Register mutation
    register: builder.mutation({
      query: (credentials: {
        name: string;
        email: string;
        password: string;
      }) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
export default authApi;