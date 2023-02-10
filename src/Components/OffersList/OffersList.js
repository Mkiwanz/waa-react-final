import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Role from "../../Resources/Roles";
import Grid from "@mui/material/Grid";
import Offer from "../Offer/Offer";

const OfferList = (params) => {
  const [offers, setOffers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");
  let refreshProperty = params.refreshProperty;
  let setRefreshProperty = params.setRefreshProperty;
  let propertyId = params.propertyId;

  useEffect(() => {
    console.log("Offers Refresh");
    const getOffers = async () => {
      try {
        let response;
        if (role === Role.CUSTOMER) {
          response = await axios.get(`api/v1/users/${userId}/CustomerOffers`);
        } else {
          response = await axios.get(
            `api/v1/users/properties/${propertyId}/offers`
          );
        }
        setOffers(response.data);
        setRefreshProperty(!refreshProperty);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getOffers();
  }, [refresh]);

  return (
    <Grid container spacing={3}>
      {offers ? (
        offers.map((offer) => (
          <Grid item md={6} key={offer.id}>
            <Offer
              offer={offer}
              propertyStatus={params.propertyStatus}
              propertyId={params.propertyId}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </Grid>
        ))
      ) : (
        <h3>No Offers</h3>
      )}
    </Grid>
  );
};

export default OfferList;
