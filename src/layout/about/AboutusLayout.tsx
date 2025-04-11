import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import Footer from "@/components/shared/Footer";
import About from "@/pages/about/About";
//import AllBicycles from "@/pages/allBicycles/AllBicycles";
const AboutusLayout = () => {
  return (
    <div className="w-full space-y-16">
      <div className="container mx-auto min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-6 lg:px-8">
        <ResponsiveNavbar />
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutusLayout;