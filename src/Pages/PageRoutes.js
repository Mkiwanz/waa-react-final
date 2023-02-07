import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "./HomePage/HomePage";
import ResponsiveAppBar from "../Components/AppBar/AppBar";
import { PropertyDetail } from "../Components/PropertyDetail/PropertyDetail";
import SignUp from "../Components/SignUp/SignUp";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertyDetail />} />
        <Route path="/properties" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default PageRoutes;
