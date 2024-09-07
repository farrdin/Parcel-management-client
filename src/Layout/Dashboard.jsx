import Sidebar from "@/components/Dashboard/SideBar/Sidebar";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Helmet>
        <title>ParcelPro | Dashboard</title>
      </Helmet>
      <Sidebar></Sidebar>
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
