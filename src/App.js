import logo from "./logo.svg";
import "./App.css";
import PageRoutes from "./Pages/PageRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index";
import { createContext, useState } from "react";
export const PropertiesContext = createContext();
function App() {
  const [propertiesData, setPropertiesData] = useState([{}]);

  const dispatch = useDispatch();
  const user = Cookies.get("userId");
  if (user == undefined || user == null) {
    dispatch(authActions.logout());
    console.log("Logout");
  } else {
    dispatch(authActions.loginSuccessful());
    console.log("login");
  }

  axios.defaults.baseURL = "http://localhost:8081";
  return (
    <PropertiesContext.Provider value={[propertiesData, setPropertiesData]}>
      <PageRoutes />
    </PropertiesContext.Provider>
  );
}

export default App;
