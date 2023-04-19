import React, { useEffect } from "react";
import { IProductCatalogue } from "interfaces/catalogue";
import styled from "styled-components";
import Grid from "@component/grid/Grid";
import CatalogueProductItem from "./CatalogueProductItem";
import CatalogueProductsSinglePage from "./CatalogueProductsSinglePage";

const WrapperStyled = styled.div`
  background-color: #fff;
  height: 100%;
  padding: 8px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(4, 1fr); */
  gap: 6px;
  height: 100%;
`;

interface IProps {
  products: IProductCatalogue[];
}

const CataloguePageProducts = ({ products }: IProps) => {
  useEffect(() => {
    // console.log(products);
  }, []);
  return (
    <Grid item xs={6} style={{ height: "100%" }}>
      <CatalogueProductsSinglePage products={products} />
    </Grid>
  );
};

export default CataloguePageProducts;
