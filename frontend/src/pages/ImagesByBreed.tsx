import axios from "axios";
import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import authHeader from "../auth/Auth";
import { useNavigate } from "react-router-dom";

const ImagesByBreed = () => {
  const [list, setList] = useState<string[]>([]);
  const [displayList, setDisplayList] = useState<string>("hidden");
  const [input, setInput] = useState<string>("");
  const [breed, setBreed] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const api = "http://localhost:3000/breeds/list";
    axios
      .get(api, { headers: authHeader() })
      .then((response) => {
        const arr = Object.keys(response.data);
        setList(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredList = list.filter((element) => {
    return element.toLowerCase().includes(input.toLowerCase());
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickInput = () => {
    setDisplayList("flex");
    setInput("");
  };

  const breedClicked = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    setInput(target.textContent!);
    setDisplayList("hidden");
  };

  const searchBreed = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!user) {
      navigate("/");
    }
    const url = `http://localhost:3000/breeds/allImages`;

    await axios
      .post(url, { breed: input.toLowerCase() }, { headers: authHeader() })
      .then((response) => {
        const arrBreeds = response.data;
        setBreed(arrBreeds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white w-full h-full flex flex-col justify-center items-center">
      <div className=" w-full flex flex-row items-center justify-center h-1/3">
        <div>
          <input
            className="w-52 h-14 sm:w-52 md:w-72 lg:w-80 xl:w-80 2xl:w-80 relative p-4 bg-transparent placeholder:text-black  outline-none border-2 border-black"
            type="text"
            placeholder="Search a breed..."
            value={input}
            onChange={onChangeInput}
            onClick={onClickInput}
          />
          <div>
            <ul
              className={`absolute w-52 sm:w-52 md:w-72 lg:w-80 xl:w-80 2xl:w-80 max-h-80  ${displayList} flex-col overflow-y-auto bg-black rounded-b-lg border-solid border-b-2 border-r-2 border-l-2 border-black transition-all duration-200`}
            >
              {filteredList.map((breed, index) => (
                <li
                  onClick={breedClicked}
                  key={index}
                  className=" text-white p-2 cursor-pointer hover:bg-white hover:text-black flex items-center"
                >
                  {breed[0].toUpperCase() + breed.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative bg-black text-white flex items-center justify-center w-16 h-14 border-solid border-t-2 border-r-2 border-b-2 border-black rounded-r-xl hover:bg-white hover:text-black cursor-pointer transition-all duration-150">
          <i
            className=" bx bx-search-alt-2 bx-md font-bold"
            onClick={searchBreed}
          ></i>
        </div>
      </div>
      <div className=" w-11/12 h-2/3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center items-center gap-10 overflow-auto ">
        {breed.map((breed, index) => (
          <div
            className=" w-64 h-64 bg-black overflow-hidden rounded-lg shadow-lg"
            key={index}
          >
            <img className="w-full h-full object-cover" src={breed} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesByBreed;
