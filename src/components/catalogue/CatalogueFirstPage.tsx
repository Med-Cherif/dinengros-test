import React from "react";
import styled from "styled-components";
import catalogueImg from "../../../public/assets/images/catalogue/catalogue-index.jpg";

const Image = styled.img`
  width: 320px;
  height: 100%;
  @media (max-width: 575px) {
    width: 100%;
  }
`;

const CatalogueFirstPage = ({ img = catalogueImg.src }) => {
  return (
    <Image
      // ref={imageRef}
      src={img}
      alt=""
    />
  );
};

export default CatalogueFirstPage;
