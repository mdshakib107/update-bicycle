import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import Footer from "@/components/shared/Footer";
import AllBicycles from "@/pages/allBicycles/AllBicycles";
const AllBicyclesLayout = () => {
  return (
    <div className="w-full space-y-16">
      <div className="container mx-auto min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-6 lg:px-8">
        <ResponsiveNavbar />
        <AllBicycles />
      </div>
      <Footer />
    </div>
  );
};

export default AllBicyclesLayout;
