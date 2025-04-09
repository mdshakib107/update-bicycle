import Navbar from "../../components/home/Navbar";

const AllBicycles = () => {
  return (
    <div>
      <div className="container mx-auto min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="min-h-[30vh] sm:min-h-[40vh] my-6 sm:my-8 flex flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-16"></div>
        all Bicyckes
      </div>
    </div>
  );
};

export default AllBicycles;
