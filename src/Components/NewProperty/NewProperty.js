import React, { useRef, useState } from "react";
import "./NewProperty.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function NewProperty() {
  const [newPropertyData, setNewPropertyData] = useState({});
  const pForm = useRef();
  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const form = pForm.current;
    const data = {
      street: form["street"].value,
      city: form["city"].value,
      state: form["state"].value,
      zipCode: form["zipcode"].value,
      roomNum: parseInt(form["roomNumber"].value),
      bathroomNum: parseInt(form["bathNumber"].value),
      status: 1,
      propertyType: form["propertyType"].value,
      areaInSquareFeet: parseInt(form["area"].value),
      price: 2000,
      // image: form["image"].value,
    };
    // image name only without the full path
    //Within our project, create a folder and concatenate the new path with the name of the image
    // data["image"] = data["image"].substring(
    //   data["image"].lastIndexOf("\\") + 1,
    //   data["image"].length
    // );
    // console.log(data);
    //save the new property data
    axios
      .post(`api/v1/users/${userId}/property`, data)
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form ref={pForm} className="form1">
      <fieldset>
        <legend>Add new property</legend>
        <label className="filter-label">
          Property Type:
          <select name="propertyType" className="filter-select">
            <option value="">Select a property type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
          </select>
        </label>
        <label>
          Street:
          <br />
          <input
            className="input1"
            type="text"
            required="required"
            name="street"
            size="65"
          />
        </label>
        <br />
        <label>
          city:
          <br />
          <input
            className="input1"
            type="text"
            required="required"
            name="city"
            size="45"
          />
        </label>
        <br />
        <label>
          State:
          <br />
          <input
            className="input1"
            type="text"
            required="required"
            name="state"
            size="45"
          />
        </label>
        <br />
        <label>
          Zipcode:
          <br />
          <input
            className="input1"
            type="text"
            required="required"
            name="zipcode"
            size="10"
          />
        </label>
        <br />
        <hr />
        <label>
          Rooms #:
          <select name="roomNumber" className="input1">
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
            <option value="4">four</option>
            <option value="5">five</option>
            <option value="6">six</option>
            <option value="7">seven</option>
          </select>
        </label>
        <br />
        <label>
          Bathrooms #:
          <select name="bathNumber" className="input1">
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
            <option value="4">four</option>
            <option value="5">five</option>
            <option value="6">six</option>
            <option value="7">seven</option>
          </select>
        </label>
        <br />
        <label>
          Area of house in square metre &#8594; m<sup>2</sup>
          <br />
          <input
            className="input1"
            type="text"
            required="required"
            name="area"
            size="5"
          />
        </label>
        <br />
        <label>
          Price in &#36;:
          <br />
          <input
            className="input1"
            type="text"
            required="required"
            name="price"
            size="5"
          />
        </label>
        <br />
        <hr />
        <label>
          images:
          <br />
          <input
            className="input1"
            type="file"
            multiple
            name="image"
            size="10"
          />
        </label>
        <br />
        <hr />
        <input type="submit" id="button" onClick={submitHandler} />
      </fieldset>
    </form>
  );
}
export default NewProperty;
