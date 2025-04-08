import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
        query: (credentials: { email: string; password: string }) => ({
            url: "/auth/login",
            method: "POST",
            body: credentials,
        }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
export default authApi;