//import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../../components/shared/Footer";
const ShowroomLayout = () => {
  return (
    <div className="w-full space-y-16">
      <Outlet />
      <Footer />
    </div>
  );
};

export default ShowroomLayout;
