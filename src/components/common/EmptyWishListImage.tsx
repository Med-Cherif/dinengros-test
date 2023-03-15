import React from "react";

const EmptyWishListImage = () => {
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
          marginTop: '25px'
        }}
        src="/assets/images/illustrations/empty-wish-list.svg"
        alt="wish-list"
      />
    </div>
  );
};

export default EmptyWishListImage;
