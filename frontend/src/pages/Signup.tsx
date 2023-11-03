import logo from "../assets/logo.png";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [right, setRight] = useState("-right-72");
  const [animate, setAnimate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url = "http://localhost:3000/user/signup";

    await axios
      .post(url, { nome, email, password })
      .then((res) => {
        if (res.data !== "email must be unique") {
          setRight("right-5");
          setAnimate("animate-width");
          setTimeout(() => {
            setRight("-right-72");
            navigate("/");
          }, 3000);
        } else {
          setError("Email already taken!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative w-full h-screen bg-beige flex items-center justify-center overflow-hidden">
      <div className="w-72 h-2/3 sm:w-72 md:w-72 lg:w-96 xl:w-96 2xl:w-96 bg-white rounded-lg flex flex-col justify-center items-center shadow-lg">
        <img
          className="w-28 sm:w-28 md:w-28 lg:w-32 xl:w-32 2xl:w-32 absolute top-32"
          src={logo}
          alt=""
        />
        <h1 className="text-2xl font-semibold text-black mt-20">SIGNUP</h1>
        <form
          className="flex flex-col gap-4 items-center justify-center mt-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="nome"
            required
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
            className="h-12 w-60 border-2 border-black rounded-md bg-white p-3 outline-none"
          />
          <input
            type="email"
            id="email"
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-60 border-2 border-black rounded-md bg-white p-3 outline-none"
          />
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-60 border-2 border-black rounded-md bg-white p-3 outline-none"
          />
          <div className="text-red font-semibold flex">
            <p> {error} </p>
          </div>
          <button
            type="submit"
            className="p-3 bg-black text-white rounded-md w-60 h-12 hover:opacity-80"
          >
            Register
          </button>
        </form>
        <p className="mt-6">
          Return to{" "}
          <Link to="/">
            <span className="text-orange hover:opacity-80">Login Page</span>
          </Link>
        </p>
      </div>
      <div
        className={`absolute w-72 h-24 rounded-xl bg-white top-10 ${right}  flex items-center text-green font-semibold shadow-lg transition-all ease-linear duration-200`}
      >
        <i className="bx bx-check-circle text-green bx-sm mr-2 ml-4"></i>
        <div className="flex flex-col">
        <p>Registered successfully!</p>
        <p className="bottom-2 text-xs left-4 font-light text-black">
          Redirecting to Login Page...
        </p>
        </div>
        <div
          className={`absolute bottom-0 rounded-lg w-full h-2 bg-green ${animate} `}
        ></div>
      </div>
    </div>
  );
};

export default Signup;
