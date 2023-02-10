import "./homePage.css";
import background from "../../Resources/Images/background.jpg";
import Filter from "../../Components/Filter/Filter";
import Properties from "../../Components/Properties/Properties";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  return (
    <div>
      <div className="homeHeader w-100">
        <div className="filter">
          <Filter/>
        </div>
      </div>
      <br />
      <br />
      <div className="homeBody">
        <Properties />
      </div>
    </div>
  );
};
export default HomePage;
