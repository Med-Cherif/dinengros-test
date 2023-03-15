import React from "react";

const EmptyOffersList = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          maxWidth: "min(400px, 80%)",
          maxHeight: "min(400px, 80%)",
          marginTop: "25px",
        }}
        src="/assets/images/illustrations/empty-discount.svg"
        alt="offers"
      />
    </div>
  );
};

export default EmptyOffersList;
