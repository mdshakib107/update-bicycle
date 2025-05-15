import { useState } from "react";

// react icons
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { LayoutDashboard } from "lucide-react";
import { BsArrowRight } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../shared/CustomButton";
// import { MdDashboard } from "react-icons/md";

const ResponsiveNavbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAboutUsOpen, setMobileAboutUsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  //* navigation
  const navigate = useNavigate();

  //* dispatch
  const dispatch = useAppDispatch();

  //* check if user is logged in
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;
  //console.log(user)

  //* Get user by id
  const { data } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  //* login
  const handleLogin = () => {
    navigate("/login");
  };

  //* logout
  const handleLogout = () => {
    const toastId = toast.loading("Loading...");

    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userData");
      dispatch(logout());
      toast.success("Logged out successfully", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error(`Something went wrong: ${error}`, { id: toastId });
    }
  };

  //* user role leading dashboard
  const toDashboard = user ? `/dashboard/${user?.role}/my-dashboard` : "/";

  //* NavLink is active
  const activeLink = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-[#3B9DF8] font-medium transition-all duration-300"
      : "text-black hover:text-[#3B9DF8] transition-all duration-300";
  };

  const activeLinkForNavbar = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-cyan-500 font-medium transition-all duration-300"
      : "text-black hover:text-white transition-all duration-300";
  };

  //* reusable menu block
  const termsLinks = (
    <>
      <li className="flex items-center gap-[7px] hover:text-[#3B9DF8] transition-all duration-300">
        <BsArrowRight className="text-[0.9rem]" />
        <NavLink to="/terms" end className={activeLink}>
          Terms
        </NavLink>
      </li>
      <li className="flex items-center gap-[7px] hover:text-[#3B9DF8] transition-all duration-300">
        <BsArrowRight className="text-[0.9rem]" />
        <NavLink to="/terms/policies" className={activeLink}>
          Policies
        </NavLink>
      </li>
    </>
  );

  // const featuresList = (
  //   <>
  //     <div className="flex items-center gap-[10px] text-[1rem] text-[#424242]">
  //       <MdDashboardCustomize className="bg-blue-200 text-blue-900 p-1.5 rounded-full text-[2rem]" />
  //       Legal Support
  //     </div>
  //     <div className="flex items-center gap-[10px] text-[1rem] text-[#424242]">
  //       <CgIfDesign className="bg-orange-200 text-orange-800 p-1.5 rounded-full text-[2rem]" />
  //       Clear Policies
  //     </div>
  //     <div className="flex items-center gap-[10px] text-[1rem] text-[#424242]">
  //       <FaCubesStacked className="bg-yellow-200 text-yellow-800 p-1.5 rounded-full text-[2rem]" />
  //       Transparent Structure
  //     </div>
  //   </>
  // );

  /* desktop nav links */
  const desktopNavLinks = (
    <ul className="items-center gap-[20px] text-[1rem]  md:flex hidden">
      <li className="transition-all duration-500 cursor-pointer hover:text-white capitalize">
        <NavLink to="/" className={activeLinkForNavbar}>
          home
        </NavLink>
      </li>

      <li
        className="relative group transition-all duration-300 cursor-pointer capitalize"
        onClick={() => navigate("/AllBicycles")}
      >
        <NavLink to="/AllBicycles" className={activeLinkForNavbar}>
          <span className="flex">
            {" "}
            <span>Shop</span>
            <span>
              <MdKeyboardArrowDown className="text-[1.5rem] group-hover:text-white transition-all duration-500 group-hover:rotate-[180deg]" />
              <article className="p-6 bg-white rounded-md boxShadow w-[200px] absolute top-[40px] z-[-1] dark:bg-black group-hover:translate-y-0 translate-y-[-20px] group-hover:opacity-100 opacity-0 group-hover:z-30 transition-all duration-300 shadow-purple-600 shadow-lg"></article>
            </span>
          </span>
        </NavLink>
        {/* Mega Menu */}
        <div className="absolute top-[40px] left-0 bg-white rounded-md p-6 shadow-lg w-[800px] grid grid-cols-3 gap-6 z-50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          {/* Road Bikes */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 border-b border-gray-200 pb-1">
              🚴‍♂️ Road Bikes
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center hover:bg-blue-50 p-2 rounded-md transition">
                <img
                  src="https://i.ibb.co/rGkRPzY/product-1.png"
                  alt="Road Bike 1"
                  className="w-[60px] h-[60px] object-cover rounded border"
                />
                <div>
                  <p className="text-sm font-medium">Speedster 300</p>
                  <p className="text-xs text-gray-500">৳ 45,000</p>
                </div>
              </div>
              <div className="flex gap-3 items-center hover:bg-blue-50 p-2 rounded-md transition">
                <img
                  src="https://i.ibb.co/Hf6t7fQ/product-4.png"
                  alt="Road Bike 2"
                  className="w-[60px] h-[60px] object-cover rounded border"
                />
                <div>
                  <p className="text-sm font-medium">Swift Aero</p>
                  <p className="text-xs text-gray-500">৳ 55,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mountain Bikes */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 border-b border-gray-200 pb-1">
              🏔️ Mountain Bikes
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center hover:bg-green-50 p-2 rounded-md transition">
                <img
                  src="https://i.ibb.co/mrD7yzFp/product-2.png"
                  alt="Mountain Bike 1"
                  className="w-[60px] h-[60px] object-cover rounded border"
                />
                <div>
                  <p className="text-sm font-medium">Rock Climber</p>
                  <p className="text-xs text-gray-500">৳ 38,000</p>
                </div>
              </div>
              <div className="flex gap-3 items-center hover:bg-green-50 p-2 rounded-md transition">
                <img
                  src="https://i.ibb.co/bgtD7rnM/product-3.png"
                  alt="Mountain Bike 2"
                  className="w-[60px] h-[60px] object-cover rounded border"
                />
                <div>
                  <p className="text-sm font-medium">Hill Tracker</p>
                  <p className="text-xs text-gray-500">৳ 42,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Bikes */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 border-b border-gray-200 pb-1">
              🎯 Training Bikes
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center hover:bg-purple-50 p-2 rounded-md transition">
                <img
                  src="https://i.ibb.co/Hf6t7fQ/product-4.png"
                  alt="Training Bike 1"
                  className="w-[60px] h-[60px] object-cover rounded border"
                />
                <div>
                  <p className="text-sm font-medium">Trainer Lite</p>
                  <p className="text-xs text-gray-500">৳ 25,000</p>
                </div>
              </div>
              <div className="flex gap-3 items-center hover:bg-purple-50 p-2 rounded-md transition">
                <img
                  src="https://i.ibb.co/qMLS6CSv/product-5.png"
                  alt="Training Bike 2"
                  className="w-[60px] h-[60px] object-cover rounded border"
                />
                <div>
                  <p className="text-sm font-medium">Balance Pro</p>
                  <p className="text-xs text-gray-500">৳ 28,500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li className="transition-all duration-500 cursor-pointer hover:text-white capitalize">
        <NavLink to="/about" className={activeLinkForNavbar}>
          About
        </NavLink>
      </li>

      <li className="transition-all duration-500 cursor-pointer hover:text-white capitalize">
        <NavLink to="/showroom" className={activeLinkForNavbar}>
          Showroom
        </NavLink>
      </li>

      <li className="transition-all duration-500 cursor-pointer dark:text-[#abc2d3] hover:text-white capitalize flex items-center gap-[3px] group relative">
        Terms & Conditions
        <MdKeyboardArrowDown className="text-[1.5rem] text-black group-hover:text-white transition-all duration-500 group-hover:rotate-[180deg]" />
        <article className="p-6 bg-white rounded-md boxShadow w-[200px] absolute top-[40px] z-[-1] dark:bg-black group-hover:translate-y-0 translate-y-[-20px] group-hover:opacity-100 opacity-0 group-hover:z-30 transition-all duration-300 shadow-purple-600 shadow-lg">
          <div className="grid grid-cols-2">
            <ul className="flex flex-col gap-[7px] text-black">{termsLinks}</ul>
            {/* <div className="flex flex-col gap-[10px] dark:border-slate-700 border-l border-[#e5eaf2] pl-[30px]">
              {featuresList}
            </div> */}
          </div>
          {/* <img
            src="https://i.ibb.co/YRgsrsh/AD22-04.png"
            alt="image"
            className="w-full object-cover mt-4 rounded-sm h-[150px]"
          /> */}
        </article>
      </li>
    </ul>
  );

  //* mobile sidebar
  const mobileSidebarLinks = (
    <ul className="items-start gap-[20px] text-[1rem] flex flex-col">
      <li className="capitalize cursor-pointer">
        <NavLink to="/" className={activeLink}>
          <span className="hover:text-[#3B9DF8] transition-all duration-300  text-white">
            Home
          </span>
        </NavLink>
      </li>

      <li className="capitalize cursor-pointer">
        <NavLink to="/AllBicycles" className={activeLink}>
          <span className="hover:text-[#3B9DF8] transition-all duration-300  text-white">
            All Bicycle
          </span>
        </NavLink>
      </li>

      <li className="capitalize cursor-pointer">
        <NavLink to="/about" className={activeLink}>
          <span className="hover:text-[#3B9DF8] transition-all duration-300  text-white">
            About Us
          </span>
        </NavLink>
      </li>

      <li className="capitalize cursor-pointer">
        <NavLink to="/showroom" className={activeLink}>
          <span className="hover:text-[#3B9DF8] transition-all duration-300  text-white">
            Showroom
          </span>
        </NavLink>
      </li>

      {/* Terms Mobile Dropdown */}
      <li
        onClick={() => setMobileAboutUsOpen(!mobileAboutUsOpen)}
        className="hover:text-[#3B9DF8] group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]"
      >
        Terms & Conditions
        <IoIosArrowDown
          className={`${
            mobileAboutUsOpen ? "rotate-[180deg]" : "rotate-0"
          } text-white group-hover:text-[#3B9DF8] transition-all duration-300`}
        />
      </li>

      {mobileAboutUsOpen && (
        <div className="group font-[500] ml-6">
          <ul className="flex flex-col gap-[7px]">{termsLinks}</ul>
          {/* <div className="flex flex-col gap-[10px] mt-4">{featuresList}</div> */}
        </div>
      )}
    </ul>
  );

  //* user account login
  const accountDropdown = (
    <div className="flex items-center gap-[15px]">
      {!user ? (
        <CustomButton textName="Login" handleAnything={handleLogin} />
      ) : (
        <div
          className="flex items-center gap-[10px] cursor-pointer relative"
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        >
          <div className="relative">
            <img
              src={data?.data?.image || "https://i.ibb.co/qWzCvWm/avatar.gif"}
              alt="avatar"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
          </div>

          <h1 className="text-[1rem] font-[400] text-white sm:block hidden">
            {data?.data?.name || data?.data?.email}
          </h1>

          {/* <div
            className={`${
              accountMenuOpen
                ? "translate-y-0 opacity-100 z-[1]"
                : "translate-y-[10px] opacity-0 z-[-1]"
            } bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px] shadow-lg z-50 shadow-purple-600`}
          > */}
          <div
            className={`absolute top-[45px] right-0 w-max rounded-md p-[10px] flex flex-col gap-[5px] shadow-lg shadow-purple-600 bg-white transition-all duration-300 ${
              accountMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto z-50"
                : "opacity-0 translate-y-2 pointer-events-none z-[-1]"
            }`}
          >
            <span className="px-4 py-1.5 bg-[#e4d4f4] text-[#7828c8] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
              {user.role === "admin" ? (
                <GrUserAdmin className="text-[1.3rem] text-[#7828c8]" />
              ) : (
                <FiUser className="text-[1.3rem] text-[#7828c8]" />
              )}
              {user.role === "admin" ? "Admin" : "Customer"}
            </span>
            <NavLink
              to={toDashboard}
              className={`flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-black hover:bg-gray-50 ${activeLink}`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
            <NavLink
              to={`/dashboard/${user?.role}/profile`}
              className={`flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-black hover:bg-gray-50 ${activeLink}`}
            >
              <FiUser />
              Profile
            </NavLink>
            <NavLink
              to={`/dashboard/${user?.role}/manage-profile`}
              className={`flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-black hover:bg-gray-50 ${activeLink}`}
            >
              <IoSettingsOutline />
              Settings
            </NavLink>

            {/* logout */}
            <div className="mt-3 border-t border-gray-200 pt-[5px]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50 w-full"
              >
                <TbLogout2 />
                Logout
              </button>
            </div>
          </div>

          <IoIosArrowUp
            className={`${
              accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
            } transition-all duration-300 text-white sm:block hidden`}
          />
        </div>
      )}

      <CiMenuFries
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="text-[1.8rem] text-[#424242]c cursor-pointer md:hidden flex"
      />
    </div>
  );

  return (
    <nav
      className=" px-8 flex items-center justify-between w-full h-auto shadow-md p-4 bg-gradient-to-r from-white via-purple-100 to-indigo-200 border-indigo-200 shadow-indigo-100

 sticky top-0 z-50"
    >
      <div className="flex space-x-4 ">
        <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex">
          <li className="transition-all duration-500 cursor-pointer hover:bg-[#d8e0e1] rounded-full capitalize">
            <NavLink to="/">
              {/* <MdDashboard className="h-20px w-20px" /> */}
              {/* logo */}
              <img
                src="https://i.ibb.co/KjXKV8sY/19745b155034486b8ce3facd020bda1c.png"
                alt="logo"
                className="w-[60px] border-2 border-purple-600 rounded-full"
              />
            </NavLink>
          </li>
        </ul>
      </div>

      {/* nav links */}
      {desktopNavLinks}

      {/* user account login */}
      {accountDropdown}

      {/* mobile sidebar */}
      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1] hidden"
        } md:hidden bg-gradient-to-bl from-blue-500  to-purple-500 text-white! boxShadow p-4 text-center absolute top-[65px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300 shadow-purple-600 shadow-lg`}
      >
        {mobileSidebarLinks}
      </aside>
    </nav>
  );
};

export default ResponsiveNavbar;
