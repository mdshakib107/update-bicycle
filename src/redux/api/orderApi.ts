import { Order } from "@/utils/types";
import baseApi from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all orders (GET)
    getAllOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    // Create a new order (POST)
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (orderData) => ({
        url: "/orders/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // Update an order (PATCH)
    updateOrder: builder.mutation<
      Order,
      { orderId: string; updateData: Partial<Order> }
    >({
      query: ({ orderId, updateData }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Orders", id: orderId },
      ],
    }),

    // Delete an order (DELETE)
    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;


/*
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
*/