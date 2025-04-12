


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const orderApi = createApi({
    reducerPath: "order",
    baseQuery: fetchBaseQuery({ baseUrl:  import.meta.env.VITE_SERVER}),
    // tagTypes: ["order"],
    endpoints: (builder) => ({
        addOrderApi: builder.mutation({
            query: (body) => ({
                url: `/api/create-order`,
                method: "POST",
                body
            }),
        })
    })
})

export const { useAddOrderApiMutation } = orderApi;