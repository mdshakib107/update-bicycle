/* eslint-disable @typescript-eslint/no-explicit-any */

import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { Pagination, Table, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const AllProductsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const { data, isLoading, isError } = useGetAllProductsQuery({
    page,
    limit: pageSize,
  });

  // handle page change
  const handlePageChange = (page: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // const handlePageChange = (newPage: number, newPageSize: number) => {
  //   if (newPageSize !== pageSize) {
  //     setPage(1);
  //   } else {
  //     setPage(newPage);
  //   }
  //   setPageSize(newPageSize);
  // };

  const columns = [
    {
      title: "Image",
      dataIndex: "Img",
      key: "Img",
      render: (img: string) => (
        <img
          src={img || "https://via.placeholder.com/100"}
          alt="Product"
          className="w-16 h-16 object-fit rounded"
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
        <span className={inStock ? "text-green-600" : "text-red-500"}>
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

  const products = data?.data?.result || [];

  return (
    <div className="px-4 md:px-8 py-6">
      <Title
        level={2}
        className="text-center mb-6 text-2xl sm:text-3xl md:text-4xl"
      >
        All Bicycles
      </Title>

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loading />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-red-500 text-lg">Failed to load products.</p>
        </div>
      ) : (
        <>
          {/* mid+ screen */}
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
            />
          </div>

          {/* mobile screen */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-4">
              {products.map((item: any) => (
                <div key={item._id} className="border p-4 rounded shadow">
                  {/* Product Image */}
                  <img
                    src={item.Img} // Make sure this key exists in your product object
                    alt={item.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />

                  {/* Product Name */}
                  <h3 className="text-lg font-semibold">{item.name}</h3>

                  {/* Product Description */}
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={data?.data?.meta?.total || 0}
              onChange={handlePageChange}
              // showSizeChanger
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllProductsPage;
