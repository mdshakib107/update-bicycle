/* eslint-disable @typescript-eslint/no-explicit-any */

import Loading from "@/components/shared/Loading";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { Card } from "@/components/ui/card"; // Added for consistent layout
import { ItemData } from "@/components/shared/ItemsCard";
import {
  Pagination,
  Table,
  Typography,
  Statistic,
  Modal,
  Popconfirm,
} from "antd";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react"; // Added icons to match style
import { useState } from "react";
import { toast } from "sonner";

const { Title, Text } = Typography;

const AllProductsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  //* Delete product
  const [deleteProduct] = useDeleteProductMutation();

  //* update product
  const [updateProduct] = useUpdateProductMutation();

  //* modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ItemData | null>(null);

  const { data, isLoading, isError, refetch } = useGetAllProductsQuery({
    page,
    limit: pageSize,
  });

  //* Handle pagination updates
  const handlePageChange = (page: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const products = data?.data?.result || [];

  //* Confirm and delete
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      await refetch(); //? refetch product list
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  //* update product
  const handleUpdate = async () => {
    if (!selectedProduct?._id) return;
    try {
      await updateProduct({
        productId: selectedProduct._id,
        updateData: {
          price: selectedProduct.price,
          quantity: selectedProduct.quantity,
          inStock: selectedProduct.inStock,
        },
      }).unwrap();

      await refetch(); //? refetch product list

      toast.success("Product updated successfully!");
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    }
  };

  //* Table columns styled similarly to order table
  const columns = [
    {
      title: "Image",
      dataIndex: "Img",
      key: "Img",
      render: (img: string) => (
        <img
          src={img || "https://via.placeholder.com/100"}
          alt="Product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {inStock ? (
            <CheckCircle className="inline-block mr-1 w-4 h-4" />
          ) : (
            <XCircle className="inline-block mr-1 w-4 h-4" />
          )}
          {inStock ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ItemData) => (
        <div className="flex gap-2">
          {/* Edit Button */}
          <button
            onClick={() => {
              setSelectedProduct(record);
              setIsEditModalOpen(true);
            }}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          >
            Edit
          </button>

          {/* Delete Button with Popconfirm */}
          <Popconfirm
            title="Delete Product"
            description={
              <div className="space-y-2">
                <p>Are you sure you want to delete this product?</p>
                <p className="text-red-500 font-medium">{record.name}</p>
                <p className="text-gray-500 text-sm">
                  This action cannot be undone.
                </p>
              </div>
            }
            onConfirm={() => handleDelete(record._id!)}
            okText="Yes, Delete"
            cancelText="No, Cancel"
            okButtonProps={{
              danger: true,
              className: "bg-red-600 hover:bg-red-700",
            }}
            cancelButtonProps={{
              className: "hover:bg-gray-100",
            }}
          >
            <button className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-all">
              Delete
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-6">
      <div className="space-y-6">
        {/* Page Header & Title */}
        <div className="flex flex-col">
          <Title level={2} className="!mb-1">
            All Bicycles
          </Title>
          <Text type="secondary">Browse and manage all available bicycles</Text>
        </div>

        {/* Placeholder Stat Section — you can update with actual values later */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Statistic
            title={
              <span className="text-gray-600 text-base">Total Products</span>
            }
            value={data?.data?.meta?.total || 0}
            prefix={<ShoppingCart />}
            className="bg-gradient-to-br from-purple-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100"
            valueStyle={{ color: "#6B46C1", fontWeight: "bold" }}
          />
        </div>

        {/* Main Table/Card Content */}
        <Card className="p-6 border-0 shadow-lg">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loading />
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-red-500 text-lg">Failed to load products.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table
                  columns={columns}
                  dataSource={products.map((item: any) => ({
                    ...item,
                    key: item._id,
                  }))}
                  pagination={false}
                  bordered
                  scroll={{ x: true }}
                  className="rounded-lg"
                />
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
                {products.map((item: any) => (
                  <div key={item._id} className="border p-4 rounded shadow-md">
                    <img
                      src={item.Img || "https://via.placeholder.com/300"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{item.brand}</p>
                    <p className="text-sm text-gray-700 font-medium">
                      ${item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <Pagination
                  current={page}
                  pageSize={pageSize}
                  total={data?.data?.meta?.total || 0}
                  onChange={handlePageChange}
                  showSizeChanger
                  showQuickJumper
                  className="px-4"
                />
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onOk={handleUpdate}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Price ($)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              className="w-full px-3 py-2 border rounded"
              value={selectedProduct?.price || ""}
              onChange={(e) =>
                setSelectedProduct((prev) =>
                  prev ? { ...prev, price: parseFloat(e.target.value) } : prev,
                )
              }
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm text-gray-600">Quantity</label>
            <input
              type="number"
              min={0}
              className="w-full px-3 py-2 border rounded"
              value={selectedProduct?.quantity || ""}
              onChange={(e) =>
                setSelectedProduct((prev) =>
                  prev ? { ...prev, quantity: parseInt(e.target.value) } : prev,
                )
              }
            />
          </div>

          {/* In Stock */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">In Stock</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={selectedProduct?.inStock ? "yes" : "no"}
              onChange={(e) =>
                setSelectedProduct((prev) =>
                  prev ? { ...prev, inStock: e.target.value === "yes" } : prev,
                )
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllProductsPage;
