import { baseApi } from "../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = userManagementApi;

//আমার মনে হচ্ছে এই কোড রিপিট হচ্ছে authApi এর সাথে। authApi তে সেম কোড আছে।
