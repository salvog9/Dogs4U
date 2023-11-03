import sfondoCane from "../assets/sfondoCane.png";
import { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setUserName(user.user.nome);
  }, []);


  return (
    <div className=" w-full h-full bg-white ">
      <div className=" flex flex-col items-center justify-center h-1/3">
        <h1 className=" mt-32 text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl ">
          Welcome <span className="font-semibold">{userName}</span> to{" "}
          <span className="corsive font-bold">Dogs4U</span>{" "}
        </h1>
        <p className="mt-8  text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl font-semibold">
          Explore the World of Dogs:{" "}
          <span className=" text-orange">One Breed at Time.</span>
        </p>
      </div>
      <div className=" h-2/3 flex justify-center items-end">
        <img className="w-1/2" src={sfondoCane} alt="Cane" />
      </div>
    </div>
  );
};

export default Home;
