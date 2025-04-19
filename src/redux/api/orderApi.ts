import { Order, OrderResponse } from "@/utils/types";
import baseApi from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all orders (GET)
    getAllOrders: builder.query<OrderResponse, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/orders",
        params,
      }),
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
      OrderResponse,
      { orderId: string; updateData: Partial<Order> }
    >({
      query: ({ orderId, updateData }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // Delete an order (DELETE)
    deleteOrder: builder.mutation<OrderResponse, string>({
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
