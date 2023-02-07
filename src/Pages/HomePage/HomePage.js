import "./homePage.css";
import background from "../../Resources/Images/background.jpg";
import Filter from "../../Components/Filter/Filter";
import Properties from "../../Components/Properties/Properties";

const HomePage = () => {
  return (
    <div>
      <div className="homeHeader w-100">
        <div className="filter">
          <input
            type="text"
            id="search-bar"
            placeholder="Address, School, City, Zip or Neighborhood"
          />
        </div>
      </div>
      <hr />
      <hr />
      <hr />
      <div className="homeBody">
        <Properties />
      </div>
    </div>
  );
};
export default HomePage;
