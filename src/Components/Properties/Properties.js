import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Cookies from 'js-cookie';


import Property from "../Property/Property";
import axios from "axios";
import { useSelector } from "react-redux";

function Properties() {
  const [propertiesData, setPropertiesData] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("user")}`,
      };
      try {
        const response = await axios.get("api/v1/properties", headers);
        setPropertiesData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, []);


//   if (!isAuthenticated)
//   return <Navigate to={"/login"}/>;
// else
  return (
    <Grid container spacing={5}>
      {propertiesData.map((house) => {
        return (
          <Grid item md={4} key={house.id}>
            <Link
              to={`/properties/${house.id}`}
              style={{ textDecoration: "none" }}
            >
              <Property house={house} />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Properties;
