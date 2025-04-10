import Footer from "@/components/shared/Footer";
import AllBicycles from "@/pages/allBicycles/AllBicycles";
const AllBicyclesLayout = () => {
  return (
    <div className="w-full space-y-16">
      <AllBicycles />
      <Footer />
    </div>
  );
};

export default AllBicyclesLayout;
