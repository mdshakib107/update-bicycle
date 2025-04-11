// react icons
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { SlArrowUp } from "react-icons/sl";
import logo from "../../assets/images/logo/logo.png";
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md rounded-t-2xl w-full p-3 md:p-4 relative shadow-purple-600 2xl:h-[30vh]">
      <div className="w-full flex items-center justify-center pt-[30px] flex-col gap-[20px] pb-[130px]">
        <img src={logo} alt="logo" className="w-[5rem]" />

        <p className="text-[0.9rem] text-center sm:text-start text-gray-600">
          High level experience in web design and development knowledge,
          producing quality work.
        </p>

        <CustomButton textName="Contact Us" />

        <div className="flex gap-[15px] text-black mt-4">
          <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-[#424242] shadow-md">
            <CgFacebook />
          </a>
          <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-[#424242] shadow-md">
            <BsTwitter />
          </a>
          <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-[#424242] shadow-md">
            <BsInstagram />
          </a>
          <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-[#424242] shadow-md">
            <BsLinkedin />
          </a>
        </div>
      </div>

      <div className="z-30 absolute bottom-3 left-0 right-0 px-3 flex items-center justify-between w-full">
        <p className="text-[0.9rem] text-gray-300">
          ©
          {new Date().getFullYear() !== 2025
            ? 2025 - new Date().getFullYear()
            : new Date().getFullYear()
          }{" "}
          All Rights Reserved
        </p>

        <SlArrowUp className="p-2 rounded-full border border-gray-300 cursor-pointer text-[2rem] text-gray-300" />
      </div>

      <img
        src="https://i.ibb.co/zNk7XT4/Rectangle-97.png"
        alt="background/image"
        className="absolute bottom-[20px] sm:bottom-0 left-0 right-0 z-10 rounded-t-xl w-full"
      />
      <img
        src="https://i.ibb.co/0mp2FwS/Rectangle-95.png"
        alt="background/image"
        className="absolute bottom-0 left-0 right-0 z-10 rounded-t-xl w-full"
      />
    </footer>
  );
};

export default Footer;
