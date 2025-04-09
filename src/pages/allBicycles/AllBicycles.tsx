import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import Navbar from "../../components/home/Navbar";

const AllBicycles = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  //   console.log(data);

  return (
    <div>
      <div className="container mx-auto min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-6 lg:px-8">
        <Navbar />
        all Bicyckes
      </div>
    </div>
  );
};

export default AllBicycles;
