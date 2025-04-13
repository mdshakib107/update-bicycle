import Footer from "@/components/shared/Footer";
import { Outlet } from "react-router-dom";

const CheckoutLayout = () => {
  return (
    <div className="w-full space-y-16">
      <Outlet />
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
