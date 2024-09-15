import Footer from "@/components/HomeSection/Footer";
import Navbar from "@/components/HomeSection/Navbar";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="mt-[64px] min-h-svh flex flex-col">
      <Helmet>
        <title>ParcelPro | Home</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
