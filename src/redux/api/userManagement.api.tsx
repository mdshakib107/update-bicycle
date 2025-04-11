

import { baseApi } from '../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
} = userManagementApi;