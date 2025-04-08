import { useState } from "react";

// react icons
import { BsArrowRight } from "react-icons/bs";
import { CgIfDesign } from "react-icons/cg";
import { CiMenuFries } from "react-icons/ci";
import { FaCubesStacked } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboardCustomize, MdKeyboardArrowDown } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import logo from "../../assets/images/logo/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import CustomButton from "../shared/CustomButton";

const ResponsiveNavbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAboutUsOpen, setMobileAboutUsOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // navigation
  const navigate = useNavigate();

  // dispatch
  const dispatch = useAppDispatch();

  // check if user is logged in
  const user = useAppSelector(useCurrentUser);
  //console.log(user)

  // login
  const handleLogin = () => {
    navigate("/login");
  };

  // logout
  const handleLogout = () => {
    const toastId = toast.loading("Loading...");

    try {
      dispatch(logout());
      toast.success("Logged out successfully", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error(`Something went wrong: ${error}`, { id: toastId });
    }
  };

  const menuLists: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <nav className="flex items-center justify-between w-full relative h-auto shadow-md p-4 bg-base-100 border-purple-600 shadow-purple-600 rounded-4xl">
      {/* logo */}
      <img src={logo} alt="logo" className="w-[60px] " />

      {/* nav links */}
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
        <li className="transition-all duration-500 cursor-pointer hover:text-[#3B9DF8] capitalize">
          <NavLink to="/">home</NavLink>
        </li>

        {/* about us mega menu */}
        <li className=" transition-all duration-500 cursor-pointer dark:text-[#abc2d3] hover:text-[#3B9DF8] capitalize flex items-center gap-[3px] group relative">
          about us
          <MdKeyboardArrowDown className="text-[1.5rem] dark:text-[#abc2d3] text-[#424242] group-hover:text-[#3B9DF8] transition-all duration-500 group-hover:rotate-[180deg]" />
          <article className="p-6 bg-white rounded-md boxShadow w-[500px] absolute top-[40px] z-[-1] left-[-100px] dark:bg-slate-800 group-hover:translate-y-0 translate-y-[-20px] group-hover:opacity-100 opacity-0 group-hover:z-30 transition-all duration-300">
            <div className="grid grid-cols-2">
              <ul className="flex flex-col gap-[7px] text-[#424242]">
                <li className="flex items-center gap-[7px] dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300">
                  <BsArrowRight className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem]" />{" "}
                  Company Details
                </li>
                <li className="flex items-center gap-[7px] dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300">
                  <BsArrowRight className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem]" />
                  Company Location
                </li>
                <li className="flex items-center gap-[7px] dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300">
                  <BsArrowRight className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem]" />
                  Team Members
                </li>
                <li className="flex items-center gap-[7px] dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300">
                  <BsArrowRight className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem]" />{" "}
                  Office Tour
                </li>
              </ul>

              <div className="flex flex-col gap-[10px] dark:border-slate-700 border-l border-[#e5eaf2] pl-[30px]">
                <div className="flex items-center gap-[10px] dark:text-[#abc2d3] text-[1rem] text-[#424242]">
                  <MdDashboardCustomize className="bg-blue-200 text-blue-900 p-1.5 rounded-full text-[2rem]" />
                  Full Customize
                </div>

                <div className="flex items-center gap-[10px] dark:text-[#abc2d3] text-[1rem] text-[#424242]">
                  <CgIfDesign className="bg-orange-200 text-orange-800 p-1.5 rounded-full text-[2rem]" />
                  Modern Design
                </div>

                <div className="flex items-center gap-[10px] dark:text-[#abc2d3] text-[1rem] text-[#424242]">
                  <FaCubesStacked className="bg-yellow-200 text-yellow-800 p-1.5 rounded-full text-[2rem]" />
                  Well Stacktured
                </div>
              </div>
            </div>

            <img
              src="https://i.ibb.co/YRgsrsh/AD22-04.png"
              alt="image"
              className="w-full object-cover mt-4 rounded-sm h-[150px]"
            />
          </article>
        </li>
      </ul>

      {/* user account login */}
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
                src="https://i.ibb.co/qWzCvWm/avatar.gif"
                alt="avatar"
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
            </div>

            <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
              {user.email}
            </h1>

            <div
              className={`${
                accountMenuOpen
                  ? "translate-y-0 opacity-100 z-[1]"
                  : "translate-y-[10px] opacity-0 z-[-1]"
              } bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px] shadow-lg z-50 shadow-purple-600`}
            >
              <span className="px-4 py-1.5 bg-[#e4d4f4] text-[#7828c8] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                {user.role === "admin" ? (
                  <GrUserAdmin className="text-[1.3rem] text-[#7828c8]" />
                ) : (
                  <FiUser className="text-[1.3rem] text-[#7828c8]" />
                )}
                {user.role === "admin" ? "Admin" : "Customer"}
              </span>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <FiUser />
                View Profile
              </p>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <IoSettingsOutline />
                Settings
              </p>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <FiUser />
                View Profile
              </p>

              {/* logout */}
              <div className="mt-3 border-t border-gray-200 pt-[5px]">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50"
                >
                  <TbLogout2 />
                  Logout
                </button>
              </div>
            </div>

            <IoIosArrowUp
              className={`${
                accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
              } transition-all duration-300 text-gray-600 sm:block hidden`}
            />
          </div>
        )}

        <CiMenuFries
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-[1.8rem] text-[#424242]c cursor-pointer md:hidden flex"
        />
      </div>

      {/* mobile sidebar */}
      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1] hidden"
        } md:hidden bg-white boxShadow p-4 text-center absolute top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}
      >
        <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <li className="hover:text-[#3B9DF8] group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
            Home
          </li>

          <li
            onClick={() => setMobileAboutUsOpen(!mobileAboutUsOpen)}
            className="hover:text-[#3B9DF8] group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]"
          >
            About Us
            <IoIosArrowDown
              className={`${
                mobileAboutUsOpen ? "rotate-[180deg]" : "rotate-0"
              } text-gray-600 group-hover:text-[#3B9DF8] transition-all duration-300`}
            />
          </li>

          {/* about us mega menu */}
          <div
            className={`${
              mobileAboutUsOpen ? "block" : "hidden"
            } group font-[500] ml-6`}
          >
            <ul className="flex flex-col gap-[7px] text-[#424242]">
              <li className="flex items-center gap-[7px] hover:text-[#3B9DF8] transition-all duration-300">
                <BsArrowRight className="text-[#424242] text-[0.9rem]" />{" "}
                Company Details
              </li>
              <li className="flex items-center gap-[7px] hover:text-[#3B9DF8] transition-all duration-300">
                <BsArrowRight className="text-[#424242] text-[0.9rem]" />
                Company Location
              </li>
              <li className="flex items-center gap-[7px] hover:text-[#3B9DF8] transition-all duration-300">
                <BsArrowRight className="text-[#424242] text-[0.9rem]" />
                Team Members
              </li>
              <li className="flex items-center gap-[7px] hover:text-[#3B9DF8] transition-all duration-300">
                <BsArrowRight className="text-[#424242] text-[0.9rem]" /> Office
                Tour
              </li>
            </ul>

            <div className="flex flex-col gap-[10px] mt-4">
              <div className="flex items-center gap-[10px] text-[1rem] text-[#424242]">
                <MdDashboardCustomize className="bg-blue-200 text-blue-900 p-1.5 rounded-full text-[2rem]" />
                Full Customize
              </div>

              <div className="flex items-center gap-[10px] text-[1rem] text-[#424242]">
                <CgIfDesign className="bg-orange-200 text-orange-800 p-1.5 rounded-full text-[2rem]" />
                Modern Design
              </div>

              <div className="flex items-center gap-[10px] text-[1rem] text-[#424242]">
                <FaCubesStacked className="bg-yellow-200 text-yellow-800 p-1.5 rounded-full text-[2rem]" />
                Well Stacktured
              </div>
            </div>
          </div>
        </ul>
      </aside>
    </nav>
  );
};

export default ResponsiveNavbar;
