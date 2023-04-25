import { IProductCatalogue } from "interfaces/catalogue";
import React from "react";
import styled from "styled-components";
import CatalogueProductItem from "./CatalogueProductItem";

const WrapperStyled = styled.div`
  background-color: #fff;
  height: 100%;
  padding: 8px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 6px;
  height: 100%;
`;

interface IProps {
  products: IProductCatalogue[];
}

const CatalogueProductsSinglePage = ({ products }: IProps) => {
  return (
    <WrapperStyled className="catalogue-page">
      <GridWrapper>
        {products.map((product, idx) => {
          return <CatalogueProductItem key={idx} product={product} />;
        })}
      </GridWrapper>
    </WrapperStyled>
  );
};

export default CatalogueProductsSinglePage;
