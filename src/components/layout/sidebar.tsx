import { Button, Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  logout,
  TUserFromToken,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { TSidebarItem } from "../../utils/types";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from "sonner";
import { LogoutOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "customer",
};

const Sidebar = () => {
  //* dispatch
  const dispatch = useAppDispatch();

  //* check if user is logged in
  const token = useAppSelector(useCurrentToken);

  //* navigation
  // const navigate = useNavigate();

  let user: TUserFromToken | null = null;

  if (typeof token === "string") {
    user = verifyToken(token) as TUserFromToken;
  }

  let sidebarItems: MenuProps["items"] | TSidebarItem[] = []; //! changed a little for resolving antd error

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
    default:
      sidebarItems = [];
      break;
  }

  //* logout
  const handleLogout = async() => {
    const toastId = toast.loading("Loading...");

    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userData");
      await dispatch(logout());
      toast.success("Logged out successfully", { id: toastId, duration: 2000 });
      //! Ensure hard redirect to home to reset all auth context
      window.location.href = "/";
    } catch (error) {
      toast.error(`Something went wrong: ${error}`, { id: toastId });
    }
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      className="z-[1]"
    >
      <div className="h-full flex flex-col">
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link to={"/"} className="font-semibold text-xl">
            🚲 Bicycle
          </Link>
        </div>

        {/* Menu fills the remaining space */}
        <div className="flex-grow overflow-y-auto">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarItems}
          />
        </div>

        {/* Logout Button at bottom */}
        <div className="p-4 border-t border-gray-700">
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            block
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
