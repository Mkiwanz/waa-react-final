import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import "./NewApplication.css";
import Cookies from "js-cookie";

function NewApplication() {
  const [applicationType, setApplicationType] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [dateOfMoving, setDateOfMoving] = useState("");
  const [offer, setOffer] = useState("");
  const [email, setEmail] = useState("");
  const { propId } = useParams();

  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkAuth = async () => {
      const headers = {
        Authorization: `Bearer ${Cookies.get("refreshToken")}`,
      };

      try {
        const response = await axios.post(
          `api/v1/users/${userId}/properties/${propId}/offers`,
          {
            offerType:applicationType,
            creditScore: creditScore,
            offerDescription: offerDescription,
            offerAmount: offer,
            status: 1,
          },
          headers
        )
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="application-type-container">
        <p className="application-type-label">Application Type:</p>
        <input
          type="radio"
          id="buy"
          name="application-type"
          value="buy"
          className="application-type-input"
          onChange={(e) => setApplicationType(e.target.value)}
        />
        <label htmlFor="buy" className="application-type-custom-label">
          Buy
        </label>
        <input
          type="radio"
          id="rent"
          name="application-type"
          value="rent"
          className="application-type-input"
          onChange={(e) => setApplicationType(e.target.value)}
        />
        <label htmlFor="rent" className="application-type-custom-label">
          Rent
        </label>
      </div>
      <div>
        <label htmlFor="credit-score">Credit Score:</label>
        <input
          type="number"
          id="credit-score"
          className="form-input"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="offer-description">Offer Description:</label>
        <textarea
          id="offer-description"
          className="form-input"
          value={offerDescription}
          onChange={(e) => setOfferDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date-of-moving">Date of Moving:</label>
        <input
          type="date"
          id="date-of-moving"
          className="form-input"
          value={dateOfMoving}
          onChange={(e) => setDateOfMoving(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="offer">Offer ($):</label>
        <input
          type="number"
          id="offer"
          className="form-input"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

export default NewApplication;
