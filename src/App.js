import logo from "./logo.svg";
import "./App.css";
import PageRoutes from "./Pages/PageRoutes";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8081";

  return <PageRoutes />;
}

export default App;
