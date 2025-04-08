// import image
import cycle from "../../assets/images/img/bicycle.jpg";

// react icons
import { FaPlay } from "react-icons/fa";
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
      //  style={{backgroundImage: 'url("https://i.ibb.co/x1rvpZs/0f-Y6ep3cd1c.png")'}}
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
            {/* <button className="py-2 px-6 min-w-fit bg-blue-400 text-white rounded-full hover:bg-transparent hover:border-black hover:text-black transition-all duration-200 border">
              Get Started
            </button> */}
            <CustomButton textName="Get Started" handleAnything={handleClick}/>

            {/* <button className="min-w-fit rounded-full py-1.5 pl-2 pr-3 flex items-center gap-[10px] bg-blue-400 text-white hover:bg-transparent hover:border-purple-600 hover:text-black transition-all duration-200 border">
              <FaPlay className="text-white bg-purple-600 rounded-full py-2 text-[2rem]" />
              Check for more
            </button> */}
          </div>
        </div>

        {/* image */}
        <div className="w-full lg:w-[50%] object-cover p-10">
          <img
            src={cycle}
            // src="https://i.ibb.co/kGnQZJ5/free-iphone-12-mini-mockup-scene-1-removebg-preview.png"
            alt="image"
            className="w-full h-full rounded-4xl"
          />
        </div>
      </header>
    </div>
  );
};

export default Hero;
