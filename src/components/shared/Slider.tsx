/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel } from "antd";

// import image
import cycle from "../../assets/images/img/bicycle.jpg";
import { ItemData, ItemsCardProps } from "./ItemsCard";


const Slider: React.FC<ItemsCardProps> = ({ data, isPending }) => {
  console.log(isPending);
  console.log("product data ==>", data);

  return (
    <Carousel
      autoplay={{ dotDuration: true }}
      autoplaySpeed={1500}
      arrows={true}
      fade={true}
      className="min-w-full min-h-[55vh] bg-gradient-to-r from-blue-400 to-purple-600 rounded-4xl"
    >
      {data && data.map && data?.map((d: ItemData) => (
        <div
          key={d?._id}
          className="rounded-4xl"
        >
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
