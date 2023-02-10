import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Role from "../../Resources/Roles";
import OfferStatusDot from "../OfferStatusDot/OfferStatusDot";
import OfferStatus from "../../Resources/OfferStatus";
import { Link, Navigate, useSearchParams } from "react-router-dom";

const OfferList = (params) => {
  const [offers, setOffers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");
  let propertyStatus = params.propertyStatus;
  let propertyId = params.propertyId;
  // let setRefreshProperty = params.setRefreshProperty;

  useEffect(() => {
    console.log("Offers Refresh");
    const getOffers = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
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
         console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getOffers();
  }, [refresh]);

  const handleAcceptOffer = (offerId) => {
    const acceptOffer = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      try {
        const response = await axios.put(
          `api/v1/offers/${offerId}/approve`,
          headers
        );
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    acceptOffer();
  };

  const handleDenyOffer = (offerId) => {
    const denyOffer = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      try {
        const response = await axios.put(
          `api/v1/offers/${offerId}/reject`,
          headers
        );
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    denyOffer();
  };

  const handelDeleteOffer = (offerId) => {
    const deleteOffer = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      try {
        const response = await axios.delete(
          `api/v1/offers/${offerId}`,
          headers
        );
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    deleteOffer();
  };

  const handelContingentOffer = (offerId) => {
    const contingentOffer = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      try {
        const response = await axios.put(
          `api/v1/offers/${offerId}/contingent`,
          headers
        );
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    contingentOffer();
  };

  const handelSold = (offerId) => {
    const soldOffer = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      try {
        const response = await axios.put(
          `api/v1/properties/${propertyId}/sold`,
          headers
        );
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    soldOffer();
  };
  const buttonsToShow =  (offerId, status) => {
    switch (role) {
      case Role.OWNER:
        switch (status) {
          case OfferStatus.Waiting:
            if (propertyStatus === 1) {
              return (
                <div>
                  <button onClick={() => handleAcceptOffer(offerId)}>
                    Accept
                  </button>
                  <button onClick={() => handleDenyOffer(offerId)}>Deny</button>
                </div>
              );
            } else if (propertyStatus === 2) {
              return (
                <div>
                  <button onClick={() => handleAcceptOffer(offerId)}>
                    Accept
                  </button>
                  <button onClick={() => handleDenyOffer(offerId)}>Deny</button>
                </div>
              );
            } else if (propertyStatus === 3) {
              return (
                <button onClick={() => handleDenyOffer(offerId)}>Deny</button>
              );
            }
            break;
          case OfferStatus.Approved:
            if (propertyStatus === 2) {
              return (
                <div>
                  <button onClick={() => handelContingentOffer(offerId)}>
                    Make it Contingent
                  </button>
                  <button onClick={() => handleDenyOffer(offerId)}>Deny</button>
                </div>
              );
            } else if (propertyStatus === 3) {
              return (
                <button onClick={() => handleDenyOffer(offerId)}>Deny</button>
              );
            }
            break;
          case OfferStatus.Contingent:
            if (propertyStatus === 3) {
              return (
                <button onClick={() => handelSold(offerId)}>
                  Mark it As Sold
                </button>
              );
            }
            break;
          case OfferStatus.Rejected:
            return (
              <button onClick={() => handelDeleteOffer(offerId)}>
                Delete Offer
              </button>
            );
            break;

          default:
            break;
        }

        break;

      case Role.CUSTOMER:
        if (propertyStatus != 3) {
          return (
            <button onClick={() => handelDeleteOffer(offerId)}>
              Delete Offer
            </button>
          );
        }

        break;
      default:
        break;
    }
  };

  return (
    <ul>
      {offers ? (
        offers.map((offer) => (
          <li key={offer.id}>
            <OfferStatusDot status={offer.status} />
            Offer Description: {offer.offerDescription}
            <br />
            Offer Amount: {offer.offerAmount}
            <br />
            Credit Score: {offer.creditScore}
            <br />
            {buttonsToShow(offer.id, offer.status)}
          </li>
        ))
      ) : (
        <h3>No Offers</h3>
      )}
    </ul>
  );
};

export default OfferList;
