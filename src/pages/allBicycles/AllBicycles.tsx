import ItemsCard, { ItemData } from "@/components/shared/ItemsCard";
import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../../components/home/Navbar";

const AllBicycles = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  console.log(data?.data);
  const products = data?.data;
  if (isLoading) return <Loading />;
  if (isError) return toast.error("Error fetching bicycles");

  return (
    <div className="container mx-auto min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-6 lg:px-8">
      <Navbar />

      <div className=" w-full min-h-[45vh] sm:min-h-[55vh] lg:min-h-[60vh] rounded-4xl shadow-purple-600 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16">
        {/* header */}
        <header className="flex h-full flex-col gap-12 lg:gap-0 lg:flex-row justify-center items-center lg:mt-3">
          <div className="px-6 sm:px-8 mt-8 lg:mt-0 w-full lg:w-[50%] space-y-6">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[60px] leading-[40px] sm:leading-[45px] lg:leading-[65px] font-[500] w-full text-center">
              All Bicycles
            </h1>

            <p className="text-[16px] mt-2 w-full text-center">
              <Link to="/">Home</Link> / All Bicycles
            </p>
          </div>
        </header>

        {/* grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 mt-10"
          id="featured"
        >
          {products?.map((product: ItemData) => (
            <ItemsCard key={product._id} data={product} isPending={isLoading} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBicycles;
