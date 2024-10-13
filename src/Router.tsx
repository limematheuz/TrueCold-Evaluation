import { Routes, Route } from "react-router-dom";
import TemperaturePage from "./pages/TemperatureValidator/TemperaturePage";
import Home from "./pages/Home/Home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/validate" element={<TemperaturePage />} />
    </Routes>
  );
};
