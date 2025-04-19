import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  TUserFromToken,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { TSidebarItem } from "../../utils/types";
import { verifyToken } from "../../utils/verifyToken";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "customer",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user: TUserFromToken | null = null;

  if (typeof token === "string") {
    user = verifyToken(token) as TUserFromToken;
  }

  let sidebarItems: MenuProps["items"] | TSidebarItem[] = []; // changed a little for resolving antd error

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

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      className="z-[1]"
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/"} className="font-semibold text-xl">
          🚲 Bicycle
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
