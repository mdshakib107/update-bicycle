import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import Footer from "@/components/shared/Footer";
import BicyclesDetailPage from "@/pages/bicycleDetailes/bicyclesDetailes";

const BicycleDetailsLayout = () => {
  return (
    <div className="w-full space-y-16">
      <ResponsiveNavbar />
      <div className="container mx-auto min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-6 lg:px-8">
        <BicyclesDetailPage />
      </div>
      <Footer />
    </div>
  );
};

export default BicycleDetailsLayout;
