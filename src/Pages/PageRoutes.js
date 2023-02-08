import { Route, Routes,BrowserRouter ,Navigate } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ResponsiveAppBar from "../Components/AppBar/AppBar";
import { PropertyDetail } from "../Components/PropertyDetail/PropertyDetail";
import SignUp from "../Components/SignUp/SignUp";
import NewApplication from "../Components/NewApplication/NewApplication";
import Login from "../Components/Login/Login";


const PageRoutes = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newApplication" element={<NewApplication />} />
      </Routes>
    </BrowserRouter>
  );
};
export default PageRoutes;
