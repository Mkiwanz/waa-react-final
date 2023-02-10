import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Role from "../../Resources/Roles";
import OfferStatusDot from "../OfferStatusDot/OfferStatusDot";
import OfferStatus from "../../Resources/OfferStatus";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const OfferList = (params) => {
  const role = Cookies.get("role");
  let propertyStatus = params.propertyStatus;
  let propertyId = params.propertyId;
  let offer = params.offer;
  let setRefresh = params.setRefresh;
  let refresh = params.refresh;

  const handleAcceptOffer = (offerId) => {
    const acceptOffer = async () => {
      try {
        const response = await axios.put(`api/v1/offers/${offerId}/approve`);
        setRefresh(!refresh);
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
        setRefresh(!refresh);
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
        setRefresh(!refresh);
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
        setRefresh(!refresh);
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
        setRefresh(!refresh);
      } catch (err) {
        console.error(err);
      }
    };
    soldOffer();
  };

  const ButtonsToShow = (offerId, status) => {
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
    <Card sx={{ maxWidth: 400 }} style={{ borderRadius: 15 }}>
      <CardActionArea>
        <CardContent>
          <OfferStatusDot status={offer.status} />
          <br />
          <Typography gutterBottom variant="h6" component="div">
            Description: {offer.offerDescription}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Amount: ${offer.offerAmount}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Credit Score: {offer.creditScore}
          </Typography>
          <hr />
          <Typography gutterBottom variant="h6" component="div">
            <b>Name:</b> {offer.user.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <b>Email:</b> {offer.user.email}
          </Typography>
          <Typography variant="h6" component="div">
            <b>Phone Number:</b> {offer.user.phoneNumber}
          </Typography>
          <Typography variant="h6" component="div">
            {ButtonsToShow(offer.id, offer.status)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OfferList;
