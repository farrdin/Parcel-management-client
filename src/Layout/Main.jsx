import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="space-y-20">
      <div className="w-[85%] mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
