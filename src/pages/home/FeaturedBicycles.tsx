/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../components/shared/CustomButton";
import ItemsCard, { ItemData } from "../../components/shared/ItemsCard";
import Loading from "../../components/shared/Loading";
import useAxiosCommon from "../../hooks/useAxiosCommon";

// Utility function: group items in chunks of 4

const chunkArray = (array: any[], size: number) => {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
};

const FeaturedBicycles = () => {
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["featuredBicycles"],
    queryFn: async () => {
      try {
        const response = await axiosCommon(`/api/products`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data.data;
      } catch (error: any) {
        console.error("Error fetching featured bicycles:", error);
        toast.error(error.message);
        throw error;
      }
    },
  });

  const handleClick = () => {
    navigate("/AllBicycles");
    toast.success("Navigating to Featured Section!");
  };

  if (isPending) return <Loading />;

  // Sort, slice, and chunk data
  const featuredItemsChunks = chunkArray(
    data?.result
      ?.sort((a: any, b: any) => {
        if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
        return b.price - a.price;
      })
      ?.slice(0, 8) || [], // Slice to max 12 items (3 slides with 4 items each)
    4 // 4 items per slide
  );

  return (
    <div className="w-full min-h-[55vh] sm:p-5">
      <header className="flex h-full flex-col gap-12 lg:gap-0 lg:flex-row justify-center items-center lg:mt-3">
        <div className="px-6 sm:px-8 mt-8 lg:mt-0 w-full lg:w-[50%] space-y-6">
          <h1 className=" text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Featured Bicycles
          </h1>
          <p className="text-center text-black mb-12 text-1xl">
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

      <div className="px-4 sm:px-6 mt-10" id="featured">
        <Carousel autoplay dots>
          {featuredItemsChunks.map((group, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.map((item: ItemData) => (
                  <ItemsCard key={item._id} data={item} isPending={false} />
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedBicycles;
