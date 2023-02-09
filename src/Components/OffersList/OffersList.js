import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('https://api.example.com/offers');
        setOffers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffers();
  }, []);
  
  const handleAcceptOffer = async offerId => {
    try {
      await axios.put(`https://api.example.com/offers/${offerId}/accept`);
      const updatedOffers = offers.map(offer => {
        if (offer.id === offerId) {
          return { ...offer, status: 'accepted' };
        }
        return offer;
      });
      setOffers(updatedOffers);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDenyOffer = async offerId => {
    try {
      await axios.put(`https://api.example.com/offers/${offerId}/deny`);
      const updatedOffers = offers.map(offer => {
        if (offer.id === offerId) {
          return { ...offer, status: 'denied' };
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
      {offers.map(offer => (
        <li key={offer.id}>
          {offer.description}
          <button onClick={() => handleAcceptOffer(offer.id)}>Accept</button>
          <button onClick={() => handleDenyOffer(offer.id)}>Deny</button>
        </li>
      ))}
    </ul>
  );
};

export default OfferList;
