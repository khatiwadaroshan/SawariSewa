import React from "react";
import Navbar from "@/components/components_lite/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


const Layout = () => {
  return (
    
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    
  );
};

export default Layout;
