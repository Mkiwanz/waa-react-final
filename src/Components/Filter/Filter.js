// Filter.js
import React, { useState } from "react";
import "./Filter.css";

const Filter = () => {
  const [filter, setFilter] = useState({
    propertyType: "",
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
  });

  const handleChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // make an API call to retrieve the filtered properties based on the filter state
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <label className="filter-label">
        Property Type:
        <select
          name="propertyType"
          value={filter.propertyType}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Select a property type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>
      </label>
      <label className="filter-label">
        Price Range:
        <select
          name="priceRange"
          value={filter.priceRange}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Select a price range</option>
          <option value="0-100000">$0 - $100,000</option>
          <option value="100000-200000">$100,000 - $200,000</option>
          <option value="200000+">$200,000+</option>
        </select>
      </label>
      <label className="filter-label">
        Bedrooms:
        <select
          name="bedrooms"
          value={filter.bedrooms}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Select the number of bedrooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4+">4+</option>
        </select>
      </label>
      <label className="filter-label">
        Bathrooms:
        <select
          name="bathrooms"
          value={filter.bathrooms}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Select the number of bathrooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4+">4+</option>
        </select>
      </label>
      <label className="filter-label">
        Location:
        <input
          type="text"
          name="location"
          value={filter.location}
          onChange={handleChange}
          className="filter-input"
        />
     </label>
     <button type="submit" className="filter-button">
       Filter
     </button>
   </form>
 );
};

export default Filter;

