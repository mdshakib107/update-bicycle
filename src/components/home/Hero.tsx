import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../shared/CustomButton";
const carouselItems = [
  {
    title: "PRO CYCLIST HELMET",
    description: "Enjoy 40% Off Everything!",
    imageUrl:
      "https://bicycle-store-html.vercel.app/assets/images/hero-swiper-3.png",
    gradientClass: "bg-gradient-to-r from-amber-100 via-amber-300 to-amber-200",
  },
  {
    title: "GRIPWEAR GLOVES",
    description: "Flat 25% Off!",
    imageUrl:
      "https://bicycle-store-html.vercel.app/assets/images/hero-swiper-3.png",
    gradientClass:
      "bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-100",
  },
  {
    title: "MOUNTAIN BIKE SHOES",
    description: "Buy 1 Get 1 Free!",
    imageUrl:
      "https://bicycle-store-html.vercel.app/assets/images/hero-swiper-3.png",
    gradientClass: "bg-gradient-to-r from-green-100 via-green-300 to-green-200",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/AllBicycles");
    toast.success("Navigating to Shop Section!");
  };
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Carousel */}
          <div className="w-full lg:w-[70%]">
            <Carousel autoplay>
              {carouselItems.map((item, index) => (
                <div key={index}>
                  <div
                    className={`${item.gradientClass} p-6 rounded-lg shadow-md flex flex-col lg:flex-row items-center justify-between h-[350px]`}
                  >
                    {/* Text */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="text-gray-600 text-base">
                        {item.description}
                      </p>
                      <CustomButton
                        textName="Shop Now"
                        handleAnything={handleClick}
                      />
                    </div>
                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="max-h-64 object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Right: Cards */}
          <div className="w-full lg:w-[30%] flex flex-col gap-4">
            {/* Card 1 */}
            <div className="bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-100 p-4 rounded-lg shadow-md flex items-center gap-4 h-[170px]">
              <div className="w-1/2">
                <img
                  src="https://bicycle-store-html.vercel.app/assets/images/hero-swiper-3.png"
                  alt="Helmet"
                  className="h-24 w-full object-contain"
                />
              </div>
              <div className="w-1/2 space-y-2">
                <h4 className="text-md font-bold">PRO CYCLIST HELMET</h4>
                <p className="text-sm text-gray-600">
                  Enjoy 40% Off Everything!
                </p>
                <CustomButton
                  textName="Shop Now"
                  handleAnything={handleClick}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-200 p-4 rounded-lg shadow-md flex items-center gap-4 h-[170px]">
              <div className="w-1/2">
                <img
                  src="https://bicycle-store-html.vercel.app/assets/images/hero-swiper-3.png"
                  alt="Gripwear"
                  className="h-24 w-full object-contain"
                />
              </div>
              <div className="w-1/2 space-y-2">
                <h4 className="text-md font-bold">GRIPWEAR GLOVES</h4>
                <p className="text-sm text-gray-600">Flat 25% Off!</p>
                <CustomButton
                  textName="Shop Now"
                  handleAnything={handleClick}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
