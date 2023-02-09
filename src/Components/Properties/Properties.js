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

import Role from "../../Resources/Roles";
function Properties() {
  // const [propertiesData, setPropertiesData] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const [searchParams] = useSearchParams();
  const [propertiesData, setPropertiesData] = useContext(PropertiesContext);
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");

  useEffect(() => {
    const getCustomerProperties = async () => {
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
    const getOwnerProperties = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      try {
        const response = await axios.get(`api/v1/users/${userId}/properties`);
        setPropertiesData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (role === Role.OWNER) getOwnerProperties();
    else getCustomerProperties();
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
