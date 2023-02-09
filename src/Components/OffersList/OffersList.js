import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Role from "../../Resources/Roles";

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");

  useEffect(() => {
    const fetchCustomerOffers = async () => {
      try {
        const response = await axios.get(
          `api/v1/users/${userId}/CustomerOffers`
        );
        console.log(response.data);
        setOffers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchOwnerOffers = async () => {
      try {
        const response = await axios.get(`api/v1/users/${userId}/OwnerOffers`);
        console.log(response.data);
        setOffers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (role === Role.CUSTOMER) fetchCustomerOffers();
    else fetchOwnerOffers();
  }, []);

  const handleAcceptOffer = async (offerId) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };
    try {
      await axios.put(`api/v1/offers/${offerId}/approve`, headers);
      const updatedOffers = offers.map((offer) => {
        if (offer.id === offerId) {
          return { ...offer, status: "approved" };
        }
        return offer;
      });
      setOffers(updatedOffers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDenyOffer = async (offerId) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };
    try {
      await axios.put(`api/v1/offers/${offerId}/reject`, headers);
      const updatedOffers = offers.map((offer) => {
        if (offer.id === offerId) {
          return { ...offer, status: "rejected" };
        }
        return offer;
      });
      setOffers(updatedOffers);
    } catch (error) {
      console.error(error);
    }
  };
  const handelDeleteOffer = async (offerId) => {
    try {
      await axios.delete(`api/v1/offers/${offerId}`);
      const updatedOffers = offers.map((offer) => {
        if (offer.id === offerId) {
          return { ...offer, status: "deleted" };
        }
        return offer;
      });
      setOffers(updatedOffers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {offers.map((offer) => (
        <li key={offer.id}>
          Offer Description: {offer.offerDescription}
          <br />
          Offer Amount: {offer.offerAmount}
          <br />
          Credit Score: {offer.creditScore}
          <br />
          {role === Role.CUSTOMER ? (
            <button onClick={() => handelDeleteOffer(offer.id)}>
              Delete Offer
            </button>
          ) : (
            <div>
              <button onClick={() => handleAcceptOffer(offer.id)}>
                Accept
              </button>
              <button onClick={() => handleDenyOffer(offer.id)}>Deny</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default OfferList;
