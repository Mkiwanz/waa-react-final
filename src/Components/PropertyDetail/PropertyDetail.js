import ImageSlider from "../ImageSlider/ImageSlide";
import "./propertyDetail.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { useSelector } from "react-redux";

const SliderData = [
  {
    image:
      "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
];
//   const SliderData = [
//     {
//       image:
//         "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
//     },
//   ];

//   return (
//     <div>
//       <div >
//         <ImageSlider slides={SliderData} />
//         <div className="details">
//           <h3>Price</h3>
//           <h4>2 bed 2.5 bath 1,192sqft 1,192 square feet 0.3acre lot</h4>
//           <h4>1005 Hillcrest Dr, Fairfield, IA 52556</h4>
//         </div>
//       </div>
//     </div>
//   );
// };

export const PropertyDetail = () => {
  const [property, setProperty] = useState({});
  const { id } = useParams();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handelLike = () => {
    // Send API to add it to liked table
  };
  return (
    <div>
      <div>
        <ImageSlider slides={SliderData} />
      </div>
      <div className="property-details">
        <h1>Price: ${property.price}</h1>
        <h2>Property Details</h2>
        <ul>
          <li> {property.address}</li>
          <p>{property.details}</p>
        </ul>
        <FavoriteBorderIcon onClick={handelLike}></FavoriteBorderIcon>
        {isAuthenticated ? (
          <Link
            to={`/newApplication/${id}`}
            style={{ textDecoration: "none" }}
          >
            newApplication
          </Link>
        ) : (
          <Link to="/login">
            <button>Apply Now</button>
          </Link>
        )}
      </div>
    </div>
  );
};
