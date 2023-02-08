import React from "react";

const StatusDot = ({ status }) => {
  let backgroundColor;
  let statusDef = "";
  if (status === 1) {
    backgroundColor = "green";
    statusDef = "For Sale";
  } else if (status === 2) {
    backgroundColor = "yellow";
    statusDef = "Pending";
  } else {
    backgroundColor = "orange";
    statusDef = "Contingent";
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

export default StatusDot;