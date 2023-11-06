import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SideBar = () => {
  return (
    <div className="bg-beige w-52 h-screen">
      <Link to="/dashboard" className="flex items-center justify-center mt-2 mr-6">
        <img className="w-10 h-10" src={logo} alt="" />
        <h1 className="font-bold corsive text-lg hover:opacity-80">Dogs4U</h1>
      </Link>
      <div className="py-10">
        <div className="flex items-center ml-2">
          <i className="bx bx-search-alt-2 text-black font-bold mr-1"></i>
          <h1 className=" font-extrabold">SEARCH IMAGES</h1>
        </div>
        <div>
          <div className=" flex flex-col gap-4 p-4 ml-4">
            <Link
              to="/dashboard/listBreed"
              className="flex hover:opacity-80 hover:translate-x-1 transition-all duration-150"
            >
              <span className="flex items-center">
                <i className="bx bx-list-ul text-black mr-2"></i>
              </span>
              <h1 className=" font-medium">Images list by breed</h1>
            </Link>
            <Link
              to="/dashboard/listBreed&Sub"
              className="flex hover:opacity-80 hover:translate-x-1 transition-all duration-150"
            >
              <span className="flex items-center">
                <i className="bx bx-list-plus text-black mr-2"></i>
              </span>
              <h1 className=" font-medium">
                Images list by breed and sub breed
              </h1>
            </Link>
            <Link
              to="/dashboard/randomBreed"
              className="flex hover:opacity-80 hover:translate-x-1 transition-all duration-150"
            >
              <span className="flex items-center">
                <i className="bx bx-dice-2 text-black mr-2"></i>
              </span>
              <h1 className=" font-medium">Random image by breed</h1>
            </Link>
            <Link
              to="/dashboard/randomBreed&Sub"
              className="flex hover:opacity-80 hover:translate-x-1 transition-all duration-150"
            >
              <span className="flex items-center">
                <i className="bx bx-dice-3 text-black mr-2"></i>
              </span>
              <h1 className=" font-medium">
                Random image by breed and sub breed
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
