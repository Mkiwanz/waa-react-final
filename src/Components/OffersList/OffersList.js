import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Role from "../../Resources/Roles";
import OfferStatusDot from "../OfferStatusDot/OfferStatusDot";
import OfferStatus from "../../Resources/OfferStatus";
import { Link, Navigate, useSearchParams } from "react-router-dom";

const OfferList = (params) => {
  const [offers, setOffers] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");
  let propertyStatus = params.propertyStatus;
  let propertyId = params.propertyId;
  console.log(params);

  useEffect(() => {
    console.log("Offers Refresh");

    axios
      .get(`api/v1/users/${userId}/CustomerOffers`)
      .then((response) => {
        if (role === Role.CUSTOMER) {
          setOffers(response.data);
        } else {
          setOffers(params.data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [refreshList]);

  const handleAcceptOffer = (offerId) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };
    axios
      .put(`api/v1/offers/${offerId}/approve`, headers)
      .then((response) => {
        // setRefreshList(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const handleDenyOffer = (offerId) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };
    axios
      .put(`api/v1/offers/${offerId}/reject`, headers)
      .then((response) => {
        // setRefreshList(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const handelDeleteOffer = (offerId) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };
    axios
      .delete(`api/v1/offers/${offerId}`, headers)
      .then((response) => {
        // setRefreshList(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const handelContingentOffer = (offerId) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };
    axios
      .put(`api/v1/offers/${offerId}/contingent`, headers)
      .then((response) => {
        // setRefreshList(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handelSold = (offerId) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };
    axios
      .put(`api/v1/properties/${propertyId}/sold`, headers)
      .then((response) => {
        // setRefreshList(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const buttonsToShow = (offerId, status, propStatus) => {
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
        if (propStatus != 3) {
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
            {buttonsToShow(offer.id, offer.status, offer.property.status)}
          </li>
        ))
      ) : (
        <h3>No Offers</h3>
      )}
    </ul>
  );
};

export default OfferList;
