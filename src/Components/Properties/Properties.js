import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Grid from '@mui/material/Grid';

import Property from "../Property/Property";
import houseImage from "../../Resources/Images/background.jpg";

import Filter from "../Filter/Filter";

const propertyData = [
  {
    id: "1",
    image: houseImage,
    price: "$250000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "1964 Savanna Cir, Fairfield, IA 52556",
  },
  {
    id: 2,
    image: houseImage,
    price: "$350000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "2000 Savanna Cir, Fairfield, IA 52556",
  },
  {
    id: 3,
    image: houseImage,
    price: "$450000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "1205 Savanna Cir, Fairfield, IA 52556",
  },
  {
    id: 4,
    image: houseImage,
    price: "$750000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "1964 Savanna Cir, Fairfield, IA 52556",
  },
  {
    id: 5,
    image: houseImage,
    price: "$12050000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "1964 Savanna Cir, Fairfield, IA 52556",
  },
  {
    id: 6,
    image: houseImage,
    price: "$250000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "1964 Savanna Cir, Fairfield, IA 52556",
  },
  {
    id: 7,
    image: houseImage,
    price: "$250000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "1964 Savanna Cir, Fairfield, IA 52556",
  },
  {
    id: 8,
    image: houseImage,
    price: "$250000",
    houseDetails: " 3 bds | 2 ba | 1,462 sqft | House for sale",
    location: "1964 Savanna Cir, Fairfield, IA 52556",
  },
];

function Properties() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [searchParams] = useSearchParams();

  return (
    <Grid container spacing={5}>
      {propertyData.map((house) => {
        return (
          <Grid item md={4}>
            <Link to="/properties" style={{textDecoration: 'none'}}>
            <Property house={house} />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Properties;
