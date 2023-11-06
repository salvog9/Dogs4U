import axios from "axios";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import authHeader from "../auth/Auth";
import { useNavigate } from "react-router-dom";

const ImagesByBreedAndSub = () => {
  const [list, setList] = useState<string[]>([]);
  const [listSub, setListSub] = useState<string[]>([]);
  const [displayList, setDisplayList] = useState<string>("hidden");
  const [displaySub, setDisplaySub] = useState<string>("hidden");
  const [displayMessage, setDisplayMessage] = useState<string>("hidden");
  const [displayError, setDisplayError] = useState<string>("hidden");
  const [input, setInput] = useState<string>("");
  const [inputSub, setInputSub] = useState<string>("");
  const [allDogs, setAllDogs] = useState<string[]>([]);
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

  const onClickInput = () => {
    setDisplayList("flex");
    setDisplaySub("hidden");
    setInput("");
    setInputSub("");
    setDisplayMessage("hidden");
    setDisplayError("hidden");
  };

  const filteredList = list.filter((element) => {
    return element.toLowerCase().includes(input.toLowerCase());
  });

  const filteredSubList = listSub.filter((element) => {
    return element.toLowerCase().includes(inputSub.toLowerCase());
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onChangeInputSub = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSub(e.target.value);
  };

  const onClickInputSub = () => {
    setDisplaySub("flex");
    setInputSub("");
  };

  const breedClicked = async (event: MouseEvent) => {
    setDisplayError("hidden");
    setDisplayMessage("hidden");
    const target = event.target as HTMLElement;
    setInput(target.textContent!);
    setDisplayList("hidden");

    const urlSub = "http://localhost:3000/breeds/subBreed/list";
    await axios
      .post(
        urlSub,
        { subBreed: target.textContent!.toLowerCase() },
        { headers: authHeader() }
      )
      .then((response) => {
        const arrSub = response.data;
        setListSub(arrSub);
        arrSub.length === 0
          ? setDisplayMessage("flex")
          : setDisplayError("flex");
      });
  };

  const subBreedClicked = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    setInputSub(target.textContent!);
    setDisplaySub("hidden");
  };

  const emptyListClicked = () => {
    setInputSub("");
    setDisplaySub("hidden");
  }

  const searchDogs = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!user) {
      navigate("/");
    }
    if (listSub.length === 0) {
      const url = `http://localhost:3000/breeds/allImages`;
      await axios
        .post(url, { breed: input.toLowerCase() }, { headers: authHeader() })
        .then((response) => {
          setAllDogs(response.data);
        });
    } else {
      const url = `http://localhost:3000/breeds/subBreed/allImages`;
      await axios
        .post(
          url,
          { breed: input.toLowerCase(), subBreed: inputSub.toLowerCase() },
          { headers: authHeader() }
        )
        .then((response) => {
          setAllDogs(response.data);
        });
    }

    setDisplaySub("hidden");
  };

  return (
    <div className="bg-white w-full h-full flex flex-col justify-center items-center">
      <div className=" w-full flex flex-col items-center justify-center h-2/4">
        <div className="mt-12">
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
              className={`absolute z-10 w-52 sm:w-52 md:w-72 lg:w-80 xl:w-80 2xl:w-80 max-h-80  ${displayList} flex-col overflow-y-auto bg-black rounded-b-lg border-solid border-b-2 border-r-2 border-l-2 border-black transition-all duration-200`}
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
        <div
          className={`absolute mb-8 mr-2 sm:mr-2 md:mr-20 lg:mr-28 xl:mr-28 2xl:mr-28  text-red font-semibold ${displayMessage}`}
        >
          <p>No sub-breed available!</p>
        </div>
        <div
          className={`absolute mb-8 mr-12 sm:mr-12 md:mr-32 lg:mr-40 xl:mr-40 2xl:mr-40 text-green font-semibold ${displayError}`}
        >
          <p>Select a sub-breed!</p>
        </div>
        <div className="mt-12 mb-8">
          <input
            className="w-52 h-14 sm:w-52 md:w-72 lg:w-80 xl:w-80 2xl:w-80 relative p-4 bg-transparent placeholder:text-black  outline-none border-2 border-black"
            type="text"
            placeholder="Search a sub-breed..."
            value={inputSub}
            onChange={onChangeInputSub}
            onClick={onClickInputSub}
          />
          <div>
            {listSub.length !== 0  ? (
              <ul
                className={`absolute w-52 sm:w-52 md:w-72 lg:w-80 xl:w-80 2xl:w-80 max-h-80 ${displaySub} flex-col overflow-y-auto bg-black rounded-b-lg border-solid border-b-2 border-r-2 border-l-2 border-black transition-all duration-200`}
              >
                {filteredSubList.map((sub, index) => (
                  <li
                    onClick={subBreedClicked}
                    className="text-white p-2 cursor-pointer hover:bg-white hover:text-black flex items-center"
                    key={index}
                  >
                    {sub[0].toUpperCase() + sub.slice(1)}
                  </li>
                ))}
              </ul>
            ) : (
              <ul
                className={`absolute w-52 sm:w-52 md:w-72 lg:w-80 xl:w-80 2xl:w-80 max-h-80 ${displaySub} flex-col overflow-y-auto bg-black rounded-b-lg border-solid border-b-2 border-r-2 border-l-2 border-black transition-all duration-200`}
              >
                <li onClick={emptyListClicked} className="text-white p-2 flex items-center cursor-pointer">
                  No sub-breed available!
                </li>
              </ul>
            )}
          </div>
        </div>
        <button
          className=" bg-black px-4 py-3 text-white rounded-lg border-2 border-black hover:bg-white hover:text-black transition-all duration-200 font-semibold"
          onClick={searchDogs}
        >
          Cerca
        </button>
      </div>

      <div className=" w-11/12 h-2/4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center items-center gap-10 overflow-auto ">
        {allDogs.map((image, index) => (
          <div
            key={index}
            className=" w-64 h-64 bg-black overflow-hidden rounded-lg shadow-lg"
          >
            <img className="w-full h-full object-cover" src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesByBreedAndSub;
