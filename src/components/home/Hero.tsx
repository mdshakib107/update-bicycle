// import image
import cycle from "../../assets/images/img/bicycle.jpg";
import CustomButton from "../shared/CustomButton";

const Hero = () => {
  // handle click
  const handleClick = () => {
    const section = document.getElementById("featured");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full rounded-4xl shadow-purple-600 shadow-2xl flex flex-col justify-center items-center">
      {/* header */}
      <header className="flex h-full lg:flex-row flex-col-reverse gap-4 lg:gap-0 justify-center items-center ">
        <div className="px-8 mt-0  w-full lg:w-[60%] h-full py-4 lg:py-0 lg:h-80">
          <div className="flex flex-col items-center justify-start text-center space-y-6 lg:space-y-8 xl:space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 hover:scale-[1.02]">
              Discover Your Perfect Ride With Us!
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed text-justify lg:text-center">
              Explore our premium collection of bicycles, crafted for
              performance and style. Find your ideal companion for every
              journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-0">
            <CustomButton textName="Shop Now" handleAnything={handleClick}/>
            </div>
          </div>
        </div>

        {/* image */}
        <div className="w-full lg:w-[40%] object-cover md:p-10 p-6">
          <img src={cycle} alt="image" className="lg:h-80  lg:rounded-4xl w-full h-full rounded-4xl" />
        </div>
      </header>
    </div>
  );
};

export default Hero;
