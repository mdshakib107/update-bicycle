import ItemsCard, { ItemData } from "@/components/shared/ItemsCard";
import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import AllBicycleFilter from "./AllBicycleFilter";

const AllBicycles = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  // console.log("AllBicycles data", data);
  const products = data?.data;

  const filters = useSelector((state: RootState) => state.filter);
  if (isLoading) return <Loading />;
  if (isError) return toast.error("Failed to load products");

  const filteredProducts = products?.filter((product: ItemData) => {
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

    const matchAvailability = !filters.availability || product.inStock;

    const isMatched =
      matchSearch && matchPrice && matchType && matchBrand && matchAvailability;
    return isMatched;
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-6 px-4 mt-10">
        <div className="col-span-5 lg:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product: ItemData) => (
              <ItemsCard
                key={product._id}
                data={product}
                isPending={isLoading}
              />
            ))}
          </div>
        </div>
        <div className="col-span-5 lg:col-span-1">
          <AllBicycleFilter />
        </div>
      </div>
    </div>
  );
};

export default AllBicycles;
