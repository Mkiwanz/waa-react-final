import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "./HomePage";
import ResponsiveAppBar from "../Components/AppBar/AppBar";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default PageRoutes;
