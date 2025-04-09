// import image
import cycle from "../../assets/images/img/bicycle.jpg";
import CustomButton from "../shared/CustomButton";

const Hero = () => {

  // handle click
  const handleClick = () =>{
    const section = document.getElementById("featured");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl"
    >
      {/* header */}
      <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3">
        <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
          <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
            Get your dream Bicycle within your home!
          </h1>
          <p className="text-[16px] mt-2">
            Just find your dream Bicycle here and leave the rest to us.
          </p>

          <div className="flex items-center flex-wrap gap-[20px] mt-6">

            <CustomButton textName="Get Started" handleAnything={handleClick}/>

          </div>
        </div>

        {/* image */}
        <div className="w-full lg:w-[50%] object-cover p-10">
          <img
            src={cycle}
            alt="image"
            className="w-full h-full rounded-4xl"
          />
        </div>
      </header>
    </div>
  );
};

export default Hero;
