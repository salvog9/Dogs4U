import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ImagesByBreed from "./pages/ImagesByBreed";
import RandomByBreed from "./pages/RandomByBreed";
import RandomByBreedAndSub from "./pages/RandomByBreedAndSub";
import ImagesByBreedAndSub from "./pages/ImagesByBreedAndSub";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="listBreed" element={<ImagesByBreed />} />
          <Route path="listBreed&Sub" element={<ImagesByBreedAndSub />} />
          <Route path="randomBreed" element={<RandomByBreed />} />
          <Route path="randomBreed&Sub" element={<RandomByBreedAndSub />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
