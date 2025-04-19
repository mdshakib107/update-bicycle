/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel } from "antd";

// import image
import cycle from "../../assets/images/img/bicycle.jpg";
import { ItemData } from "./ItemsCard";
import Loading from "./Loading";
import { ApiResponse } from "@/utils/types";

interface ApiResponseWithIsPending {
  data: ApiResponse;
  isPending: boolean;
}

const Slider: React.FC<ApiResponseWithIsPending> = ({ data, isPending }) => {
  // console.log(isPending);
  // console.log("product data ==>", data.result);

  // If the data is still loading
  if (isPending) return <Loading />;

  return (
    <Carousel
      autoplay={{ dotDuration: true }}
      autoplaySpeed={1500}
      arrows={true}
      fade={true}
      className="min-w-full min-h-[55vh] bg-gradient-to-r from-blue-400 to-purple-600 rounded-4xl"
    >
      {data?.result &&
        data?.result.map &&
        [...data.result] // shallow copy to safely sort
          .sort((a, b) => {
            // First, prioritize in-stock items
            if (a.inStock !== b.inStock) {
              return a.inStock ? -1 : 1; // in-stock (true) comes before out-of-stock (false)
            }
            // Then sort by price (high to low)
            return b.price - a.price;
          }) // high to low sort
          .slice(0, 6)
          .map((d: ItemData) => (
            <div key={d?._id} className="rounded-4xl">
              {/* description */}
              <header className="flex min-h-[55vh] h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center rounded-4xl">
                <div className="px-8 mt-8 sm:h-1/2  lg:mt-0 w-full lg:w-[50%] text-center">
                  <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
                    {d?.name}
                  </h1>
                  <p className="text-[16px] mt-2">{d?.description}</p>
                </div>

                {/* image */}
                <div className="w-full lg:w-[50%] p-10 flex justify-center items-center rounded-4xl">
                  <img
                    src={d?.Img || cycle}
                    alt="image"
                    className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 object-fill rounded-full"
                  />
                </div>
              </header>
            </div>
          ))}
    </Carousel>
  );
};

export default Slider;
