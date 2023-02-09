import React from "react";

const OfferStatusDot = ({ status }) => {
  let backgroundColor;
  let statusDef = "";
  if (status === 1) {
    backgroundColor = "green";
    statusDef = "Approved";
  } else if (status === 2) {
    backgroundColor = "red";
    statusDef = "Rejected";
  } else if (status === 3) {
    backgroundColor = "orange";
    statusDef = "Deleted";
  } else {
    backgroundColor = "blue";
    statusDef = "Waiting";
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: 10,
          height: 10,
          backgroundColor: backgroundColor,
          marginRight: 5,
        }}
      />
      <div>{statusDef}</div>
    </div>
  );
};

export default OfferStatusDot;