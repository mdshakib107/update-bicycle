import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { userPaths } from '../../routes/user.routes';
import { useAppSelector } from '../../redux/hooks';
import { TUser, useCurrentToken } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { TSidebarItem } from '../../utils/types'; 


const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  USER: 'customer',
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user: TUser | null = null;

  if (typeof token === 'string') {
    user = verifyToken(token) as TUser;
  }

let sidebarItems: TSidebarItem[] = [];

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
      style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
    >
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Dashboard</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={sidebarItems}
      
      />
    </Sider>
  );
};

export default Sidebar;
