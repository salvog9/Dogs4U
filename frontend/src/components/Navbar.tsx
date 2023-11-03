import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setUserName(user.user.nome);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-end bg-beige w-full h-14 absolute">
      <div className="flex items-center justify-center mr-10">
        <div className=" flex items-center justify-center mr-2  rounded-full bg-transparent border-solid border-2 border-black w-7 h-7">
          <i className="bx bxs-user  text-black"></i>
        </div>
        <p className=" font-semibold">{userName}</p>
      </div>
      <button
        onClick={onLogout}
        className="mr-8 font-semibold bg-black p-3 text-white rounded-xl text-sm hover:opacity-80"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
