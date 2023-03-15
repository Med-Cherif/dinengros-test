import React from "react";

const EmptyCartImage = () => {
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
          maxWidth: "min(350px, 80%)",
          maxHeight: "min(350px, 80%)",
          marginTop: '25px'
        }}
        src="/assets/images/illustrations/empty-cart.svg"
        alt="empty-list"
      />
    </div>
  );
};

export default EmptyCartImage;
