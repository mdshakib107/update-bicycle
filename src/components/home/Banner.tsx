/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import Slider from "../shared/Slider";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { toast } from "sonner";
import Loading from "../shared/Loading";

const Banner = () => {

  // axios hook
  const axiosCommon = useAxiosCommon();

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

  // If the data is still loading
  if (isPending) return <Loading />;

  return (
    <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl">
      <Slider data={data} isPending={isPending}/>
    </div>
  );
};

export default Banner;
