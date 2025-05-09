/* eslint-disable @typescript-eslint/no-explicit-any */

import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { Card } from "@/components/ui/card"; // ✅ Added for consistent layout
import { Pagination, Table, Typography, Statistic } from "antd";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react"; // ✅ Added icons to match style
import { useState } from "react";

const { Title, Text } = Typography;

const AllProductsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const { data, isLoading, isError } = useGetAllProductsQuery({
    page,
    limit: pageSize,
  });

  // ✅ Handle pagination updates
  const handlePageChange = (page: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const products = data?.data?.result || [];

  // ✅ Table columns styled similarly to order table
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
  ];

  return (
    <div className="w-full p-6">
      <div className="space-y-6">
        {/* ✅ Page Header & Title */}
        <div className="flex flex-col">
          <Title level={2} className="!mb-1">
            All Bicycles
          </Title>
          <Text type="secondary">Browse and manage all available bicycles</Text>
        </div>

        {/* ✅ Placeholder Stat Section — you can update with actual values later */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Statistic
            title={<span className="text-gray-600 text-base">Total Products</span>}
            value={data?.data?.meta?.total || 0}
            prefix={<ShoppingCart />}
            className="bg-gradient-to-br from-purple-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100"
            valueStyle={{ color: "#6B46C1", fontWeight: "bold" }}
          />
        </div>

        {/* ✅ Main Table/Card Content */}
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
              {/* ✅ Desktop Table */}
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

              {/* ✅ Mobile Cards */}
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

              {/* ✅ Pagination */}
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
    </div>
  );
};

export default AllProductsPage;