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
  const accessToken = Cookies.get("accessToken");
  if (user == undefined || user == null) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.loginSuccessful());
  }

 
  axios.defaults.baseURL = "http://localhost:8081";

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return (
    <PropertiesContext.Provider value={[propertiesData, setPropertiesData]}>
      <PageRoutes />
    </PropertiesContext.Provider>
  );
}

export default App;
