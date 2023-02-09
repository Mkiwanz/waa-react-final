import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";

import Property from "../Property/Property";
import axios from "axios";
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import { PropertiesContext } from "../../App";

function Properties() {
  // const [propertiesData, setPropertiesData] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const [searchParams] = useSearchParams();
  const [propertiesData, setPropertiesData] = useContext(PropertiesContext);

  useEffect(() => {
    const checkAuth = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      try {
        const response = await axios.get("api/v1/properties");
        setPropertiesData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, []);

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
