import logo from "../assets/logo.png";
import { Link, useNavigate} from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [displayError, setDisplayError] = useState<string>("hidden");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url = "http://localhost:3000/user/signin";

    await axios.post(url, { email, password }).then((res) => {
      if(res.data.accessToken){
        localStorage.setItem("user", JSON.stringify(res.data))
        navigate('/dashboard')
      }else{
        setDisplayError("flex");
        setError(res.data)
      }
    });
  };


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-beige">
      <div className=" w-1/2 h-1/2 bg-beige rounded-lg flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  shadow-md ">
        <div className="w-1/2 h-full bg-black rounded-l-lg flex flex-col items-center justify-center text-center  ">
          <img
            className=" w-32 absolute top-44 sm:w-32 md:w-56 lg:w-72 xl:w-72 2xl:w-72 sm:top-44 md:top-44 lg:top-44 xl:top-44 2xl:top-44"
            src={logo}
            alt=""
          />
          <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl mt-40 text-white">
            Welcome to <br />{" "}
            <span className="corsive font-bold">Dogs4U</span>
          </h1>
        </div>
        <div className="w-1/2 h-full bg-white rounded-r-lg flex flex-col items-center justify-center">
          <h1 className="text-black text-2xl font-semibold">SIGNIN</h1>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <input
              className="h-12 w-48 sm:w-44 md:w-44 lg:w-52 xl:w-60 2xl:w-60 rounded-md p-4 bg-white outline-none border-solid border-2 border-black placeholder:text-black mt-6 mb-6"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="h-12 w-48 sm:w-44 md:w-44 lg:w-52 xl:w-60 2xl:w-60 rounded-md p-4 bg-white outline-none border-solid border-2 border-black placeholder:text-black mb-6"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className={`${displayError} mb-2 text-red font-semibold`}>
              <p> {error} </p>
            </div>
            <button
              className="h-12 w-48 sm:w-44 md:w-44 lg:w-52 xl:w-60 2xl:w-60 bg-black rounded-md text-white hover:opacity-80 transition-all duration-150"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-black mt-6 text-center text-sm sm:text-sm md:text-md lg:text-base xl:text-base 2xl:text-base">
            Don't have an account? <br />
            <Link to="/signup" className="text-orange hover:opacity-70">
              {" "}
              Register Here!{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
