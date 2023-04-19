import Grid from "@component/grid/Grid";
import { IProductCatalogue } from "interfaces/catalogue";
import styled from "styled-components";
import React, { useEffect } from "react";
import Typography, { H4 } from "@component/Typography";

const Wrapper = styled.div`
  color: #000;
  box-shadow: 2px 1px 8px #dbdbdb;
  border: 1px solid #eee;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

interface IProps {
  product: IProductCatalogue;
}

const CatalogueProductItem = ({ product }: IProps) => {
  useEffect(() => {
    // console.log(product);
  }, []);
  return (
    <Wrapper>
      <div>
        <img
          src={product.img}
          style={{ width: 48, height: 48, objectFit: "contain" }}
          alt=""
        />
        <div style={{ textAlign: "center" }}>
          <H4 fontSize="8px" fontWeight={400}>
            {product.name}
          </H4>
          <div
            style={{
              fontWeight: 300,
              fontSize: 5,
            }}
            dangerouslySetInnerHTML={{
              __html: `${product.description}`,
            }}
          ></div>
          <Typography fontWeight={300} fontSize="6px"></Typography>
          <H4 fontSize="12px" fontWeight={500} color="primary.main">
            {product.price} Kr
          </H4>
        </div>
      </div>
    </Wrapper>
  );
};

export default CatalogueProductItem;
