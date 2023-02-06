import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "./HomePage";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default PageRoutes;
