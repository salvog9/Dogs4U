import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!user) {
      navigate("/");
    }
  });

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 md:flex flex-col h-screen relative">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
