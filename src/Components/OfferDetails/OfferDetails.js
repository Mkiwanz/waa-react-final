import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OfferDetails.css";
import axios from "axios";
import OfferStatusDot from "../OfferStatusDot/OfferStatusDot";

const OfferDetails = () => {
  const [Offer, setOffer] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchCustomerOffers = async () => {
      try {
        const response = await axios.get(`api/v1/offers/${id}`);
        console.log(response.data);
        setOffer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomerOffers();
  }, []);

  return (
    <div className="offer-details">
      <h2>Offer Details</h2>
      {/* <p>Offer Status: {Offer.status}</p> */}
      <OfferStatusDot status={Offer.status} />
      <p>Offer Description: {Offer.offerDescription}</p>
      <p>Offer Amount: {Offer.offerAmount}</p>
      <p>Credit Score: {Offer.creditScore}</p>
      <hr />
      {/* <h3>Property Details</h3>
      <p>Location: {Offer.property.location}</p>
      <p>Details: {Offer.property.details}</p>
      <hr />
      <p>Sent By: {Offer.sender}</p>
      <p>Phone: {Offer.phone}</p> */}
    </div>
  );
};

export default OfferDetails;
