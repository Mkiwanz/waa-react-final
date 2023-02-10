import "./homePage.css";
import Filter from "../../Components/Filter/Filter";
import Properties from "../../Components/Properties/Properties";

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
