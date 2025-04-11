import { ItemData } from "@/components/shared/ItemsCard";
import baseApi from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all products (GET)
    getAllProducts: builder.query<ItemData[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    // Fetch a specific product by ID (GET)
    getProductById: builder.query<ItemData, string>({
      query: (productId) => `/products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
    }),

    // Create a new product (POST)
    createProduct: builder.mutation<ItemData, ItemData>({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update an existing product (PUT)
    updateProduct: builder.mutation<
      ItemData,
      { productId: string; updateData: ItemData }
    >({
      query: ({ productId, updateData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Products", id: productId },
      ],
    }),

    // Delete a product (DELETE)
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
