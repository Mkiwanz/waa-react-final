import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Role from "../../Resources/Roles";
import OfferStatusDot from "../OfferStatusDot/OfferStatusDot";
import OfferStatus from "../../Resources/OfferStatus";
import { Link, Navigate, useSearchParams } from "react-router-dom";

function ButtonsToShow({ offerId, status, propertyStatus, propertyId }) {
  const [refresh, setRefresh] = useState(false);
  const role = Cookies.get("role");

  const handleAcceptOffer = (offerId) => {
    const acceptOffer = async () => {
      try {
        const response = await axios.put(`api/v1/offers/${offerId}/approve`);
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    acceptOffer();
  };

  const handleDenyOffer = (offerId) => {
    const denyOffer = async () => {
      try {
        const response = await axios.put(`api/v1/offers/${offerId}/reject`);
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    denyOffer();
  };

  const handelDeleteOffer = (offerId) => {
    const deleteOffer = async () => {
      try {
        const response = await axios.delete(`api/v1/offers/${offerId}`);
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    deleteOffer();
  };

  const handelContingentOffer = (offerId) => {
    const contingentOffer = async () => {
      try {
        const response = await axios.put(`api/v1/offers/${offerId}/contingent`);
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    contingentOffer();
  };

  const handelSold = (offerId) => {
    const soldOffer = async () => {
      try {
        const response = await axios.put(
          `api/v1/properties/${propertyId}/sold`
        );
        setRefresh(true);
      } catch (err) {
        console.error(err);
      }
    };
    soldOffer();
  };

  switch (role) {
    case Role.OWNER:
      switch ({ status }) {
        case OfferStatus.Waiting:
          if (propertyStatus === 1) {
            return (
              <div>
                <button onClick={() => handleAcceptOffer({ offerId })}>
                  Accept
                </button>
                <button onClick={() => handleDenyOffer({ offerId })}>
                  Deny
                </button>
              </div>
            );
          } else if (propertyStatus === 2) {
            return (
              <div>
                <button onClick={() => handleAcceptOffer({ offerId })}>
                  Accept
                </button>
                <button onClick={() => handleDenyOffer({ offerId })}>
                  Deny
                </button>
              </div>
            );
          } else if (propertyStatus === 3) {
            return (
              <button onClick={() => handleDenyOffer({ offerId })}>Deny</button>
            );
          }
          break;
        case OfferStatus.Approved:
          if (propertyStatus === 2) {
            return (
              <div>
                <button onClick={() => handelContingentOffer({ offerId })}>
                  Make it Contingent
                </button>
                <button onClick={() => handleDenyOffer({ offerId })}>
                  Deny
                </button>
              </div>
            );
          } else if (propertyStatus === 3) {
            return (
              <button onClick={() => handleDenyOffer({ offerId })}>Deny</button>
            );
          }
          break;
        case OfferStatus.Contingent:
          if (propertyStatus === 3) {
            return (
              <button onClick={() => handelSold({ offerId })}>
                Mark it As Sold
              </button>
            );
          }
          break;
        case OfferStatus.Rejected:
          return (
            <button onClick={() => handelDeleteOffer({ offerId })}>
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
          <button onClick={() => handelDeleteOffer({ offerId })}>
            Delete Offer
          </button>
        );
      }

      break;
  }
}
export default ButtonsToShow;
