import Sidebar from "@/components/layout/sidebar";
import Loading from "@/components/shared/Loading";
import { verifyToken } from "@/utils/verifyToken";
import { Breadcrumb, Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// antd layout destructure
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Content, Footer } = Layout;

function DashboardLayout() {
  //* navigation
  const navigate = useNavigate();

  //* loading effect state
  const [redirecting, setRedirecting] = useState(false);

  //* location finder
  const location = useLocation();
  // const breadcrumb = location.pathname.split('/').filter(Boolean).join(' > ');
  const breadcrumb = location.pathname
    .split("/")
    .filter(Boolean)
    .map(
      (segment) =>
        segment
          .replace(/-/g, " ") //? Replace dashes with spaces
          .replace(/\b\w/g, (char) => char.toUpperCase()) //? Capitalize first letters
    )
    .join(" > ");

  //* Check if the user is already logged in when the component is mounted
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      const user = verifyToken(token); //? You can verify if the token is valid here
      if (!user) {
        setRedirecting(true); //? Trigger Loading state

        //? Delay the navigation by 1 second (1000 ms)
        const timeout = setTimeout(() => {
          toast.info("You are not logged in!");
          //? If the token is valid, redirect to home
          navigate("/login");
        }, 1000);

        //! Optional: clear timeout if the component unmounts before it completes
        return () => clearTimeout(timeout);
      }
    }
  }, [navigate]); //? Empty dependency array to run once when the component is mounted

  //* loading
  if (redirecting) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Layout className="min-h-screen flex flex-row">
        {/* Responsive sidebar */}
          <Sidebar />

        {/* Right side layout with internal scroll */}
        <Layout className="flex-1 flex flex-col h-screen  overflow-hidden">
          {/* Breadcrumb with sticky positioning */}
          <div className="pl-6 m-0 sticky top-0">
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/* Scrollable Content */}
          <Content
            className="flex-1 overflow-y-auto"
            // style={{ paddingTop: "72px" }}
          >
            <div className="max-w-full">
              {/* Content goes here */}
              <Outlet />
            </div>
          </Content>

          <Footer className="text-center hidden md:block">
            Bicycle ©{new Date().getFullYear()} - Created by Promise Squad
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default DashboardLayout;
