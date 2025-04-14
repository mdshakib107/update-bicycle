import ItemsCard, { ItemData } from "@/components/shared/ItemsCard";
import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { setFilter } from "@/redux/features/filterSlice/filterSlice";
import { RootState } from "@/redux/store";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Pagination } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AllBicycleFilter from "./AllBicycleFilter";

const AllBicycles = () => {
  const dispatch = useDispatch(); // Redux dispatch function
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const { data, isLoading, isError } = useGetAllProductsQuery({ page, limit });
  const meta = data?.data?.meta;
  const products = data?.data?.result;

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
    setIsFilterApplied(true);
  };

  const filters = useSelector((state: RootState) => state.filter);
  if (isLoading) return <Loading />;
  if (isError) return toast.error("Failed to load products");

  const filteredProducts = isFilterApplied
    ? products?.filter((product: ItemData) => {
        const matchSearch =
          !filters.search ||
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.brand.toLowerCase().includes(filters.search.toLowerCase());

        const matchPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];

        const matchType =
          !filters.type ||
          product.type.toLowerCase() === filters.type.toLowerCase();

        const matchBrand =
          !filters.brand ||
          product.brand.toLowerCase() === filters.brand.toLowerCase();

        const matchAvailability = filters.availability
          ? product.inStock === true
          : true;

        return (
          matchSearch &&
          matchPrice &&
          matchType &&
          matchBrand &&
          matchAvailability
        );
      })
    : products;

  return (
    <div className="w-full">
      {/* Filter Button on Mobile */}
      <div className="flex justify-end px-4 mt-4 lg:hidden">
        <Button icon={<MenuOutlined />} onClick={() => setFilterOpen(true)}>
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-4 mt-6">
        {/* Products */}
        <div className="lg:col-span-4 col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product: ItemData) => (
              <ItemsCard
                key={product._id}
                data={product}
                isPending={isLoading}
              />
            ))}
          </div>

          {/* Pagination */}
          {meta?.totalPage && meta?.totalPage > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={meta.page}
                pageSize={meta.limit}
                total={meta.total}
                onChange={(p) => setPage(p)}
                className="mt-6"
              />
            </div>
          )}
        </div>

        {/* Filter for large screens */}
        <div className="hidden lg:block lg:col-span-1">
          <AllBicycleFilter handleChange={handleFilterChange} />
        </div>
      </div>

      {/* Drawer Filter for small screens */}
      <Drawer
        title="Filter"
        placement="left"
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
      >
        <AllBicycleFilter
          handleChange={handleFilterChange} // Pass the handleFilterChange function to the filter component
        />
      </Drawer>
    </div>
  );
};

export default AllBicycles;
