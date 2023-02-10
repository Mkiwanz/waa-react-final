import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import Property from "../Property/Property";
import axios from "axios";
import { PropertiesContext } from "../../App";
import Role from "../../Resources/Roles";

function Properties() {
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
    <div style={{textAlign: "center"}}>
      {role === Role.OWNER ? (
        <h2>My Properties</h2>
      ) : (
        <h2>All Available Properties</h2>
      )}
      <br />
      <br />
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
      <br />
      <br />
      <br />
    </div>
  );
}

export default Properties;
