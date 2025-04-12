/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../components/shared/CustomButton";
import ItemsCard, { ItemData } from "../../components/shared/ItemsCard";
import Loading from "../../components/shared/Loading";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const FeaturedBicycles = () => {
  // axios hook
  const axiosCommon = useAxiosCommon();

  // navigation
  const navigate = useNavigate();

  // fetching the featured Bicycles
  const { isPending, data } = useQuery({
    queryKey: ["featuredBicycles"],
    queryFn: async () => {
      try {
        // const response = await axios(`${import.meta.env.VITE_SERVER}/api/products`);
        const response = await axiosCommon(`/api/products`);
        // console.log("response ==>",response);

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // return the featured Bicycles
        return response.data.data;
      } catch (error: any) {
        console.error("Error fetching featured bicycles:", error);

        // toast
        toast.error(error.message);
        throw error;
      }
    },
  });


  // handle click to navigate to #featured
  const handleClick = () => {
    navigate("/AllBicycles");
    toast.success("Navigating to Featured Section!");
  };

  // If the data is still loading
  if (isPending) return <Loading />;
  // console.log(isPending);
  // console.log("product data ==>", data);

  //   if (error) return 'An error has occurred: ' + error.message + console.log(error, data)

  return (
    <div className="w-full min-h-[45vh] sm:min-h-[55vh] lg:min-h-[60vh] rounded-4xl shadow-purple-600 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16">
      {/* header */}
      <header className="flex h-full flex-col gap-12 lg:gap-0 lg:flex-row justify-center items-center lg:mt-3">
        <div className="px-6 sm:px-8 mt-8 lg:mt-0 w-full lg:w-[50%] space-y-6">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[60px] leading-[40px] sm:leading-[45px] lg:leading-[65px] font-[500] w-full text-center">
            Featured Bicycles
          </h1>

          <p className="text-[16px] mt-2 w-full text-center">
            Check out our new and exciting bicycles.
          </p>

          <div className="text-center">
            <CustomButton
              textName="View All Bicycles" 
              handleAnything={handleClick}
            />
          </div>
        </div>
      </header>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 mt-10" id="featured">
        {data?.map((d: ItemData) => (
          <ItemsCard key={d._id} data={d} isPending={isPending} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedBicycles;
