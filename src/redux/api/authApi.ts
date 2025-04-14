import { baseApi } from "./baseApi";

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

    // changePassword
    changePassword: builder.mutation({
      query: (payload: { oldPassword: string; newPassword: string }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
} = authApi;
export default authApi;