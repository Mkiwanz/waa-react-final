import { Route, Routes,BrowserRouter ,Navigate } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ResponsiveAppBar from "../Components/AppBar/AppBar";
import { PropertyDetail } from "../Components/PropertyDetail/PropertyDetail";
import SignUp from "../Components/SignUp/SignUp";
import NewApplication from "../Components/NewApplication/NewApplication";
import Login from "../Components/Login/Login";
import OfferList from "../Components/OffersList/OffersList";
import OfferDetails from "../Components/OfferDetails/OfferDetails";
import NewProperty from "../Components/NewProperty/NewProperty";


const PageRoutes = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newApplication/:propId" element={<NewApplication />} />
        <Route path="/offers" element={<OfferList />} />
        <Route path="/offerDetails/:id" element={<OfferDetails />} />
        <Route path="/newProperty" element={<NewProperty />} />
      </Routes>
    </BrowserRouter>
  );
};
export default PageRoutes;
