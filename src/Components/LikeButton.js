import React, { useState } from "react";
import axios from "axios";

const LikeButton = (params) => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
    if (liked) {
      const response = axios.post(`http://localhost:8081/api/v1/likes`, {
        userId: params.userId,
        propertyId: params.id,
      });
    } else {
      const response = axios.delete(`http://localhost:8081/api/v1/likes`, {
        userId: params.userId,
        propertyId: params.id,
      });
    }
  };

  return <button onClick={handleClick}>{liked ? "Unlike" : "Like"}</button>;
};

export default LikeButton;
