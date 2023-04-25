import Grid from "@component/grid/Grid";
import { IProductCatalogue } from "interfaces/catalogue";
import styled from "styled-components";
import React, { useEffect } from "react";
import Typography, { H4 } from "@component/Typography";
import FlexBox from "@component/FlexBox";
import { extractProductImages } from "@helpers/extractProductImages";
import { useAppSelector } from "@hook/useRedux";
import NoImage from "../../../public/assets/images/products/no-image.jpg";

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
  const { noProductImage } = useAppSelector((state) => state.setup.images);
  const images = extractProductImages(product as any);
  const image = images?.[0] || noProductImage || NoImage.src;

  return (
    <Wrapper>
      <div>
        <FlexBox
          justifyContent="center"
          style={{
            marginBottom: 4,
          }}
        >
          <img
            src={image}
            style={{ width: 48, height: 48, objectFit: "contain" }}
            alt={""}
          />
        </FlexBox>
        <div style={{ textAlign: "center" }}>
          <H4 fontSize="6px" fontWeight={400}>
            {product.product}
          </H4>
          <div
            style={{
              fontWeight: 300,
              fontSize: 4,
            }}
            dangerouslySetInnerHTML={{
              __html: `${product.description}`,
            }}
          ></div>
          {/* <Typography fontWeight={300} fontSize="6px"></Typography> */}
          <H4 fontSize="12px" fontWeight={500} color="primary.main">
            {product.price} Kr
          </H4>
        </div>
      </div>
    </Wrapper>
  );
};

export default CatalogueProductItem;
