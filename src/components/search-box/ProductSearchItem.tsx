import { useState } from "react";
import FlexBox from "@component/FlexBox";
import Typography, { SemiSpan } from "@component/Typography";
import { extractProductImages } from "@helpers/extractProductImages";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { IProduct } from "interfaces/product";
import NoImage from "../../../public/assets/images/products/no-image.jpg";
import styled from "styled-components";
import { StyledProductUnit } from "@component/products/ProductUnitsStyle";
import { getProductInfo } from "@helpers/getProductInfo";
import Link from "next/link";
import CustomButton from "@component/common/CustomButton";
import Icon from "@component/icon/Icon";
import ProductCardCart from "@component/product-cards/ProductCardCart";
import { useRouter } from "next/router";
import { addItemToCartAction } from "features/actions/cartActions";
import useProduct from "@hook/useProduct";
import AddToCartButton from "@component/cart/AddToCartButton";
import RenderConditional from "@component/common/RenderConditional";

const Wrapper = styled.div``;

interface IProps {
  product: IProduct;
  closeSearchBox: () => void;
}

const ProductSearchItem = ({ product, closeSearchBox }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.users);

  const {
    productPrice,
    discountedPrice,
    totalStock,
    selectedUnit,
    handleUnitChange,
    cartItem,
    isLoading,
    addProductToCart,
    image,
  } = useProduct({
    product,
  });

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="start"
      mb="8px"
      style={{
        borderBottom: "1px solid #e8e8e8",
        padding: "0 8px 4px",
      }}
    >
      <FlexBox
        // alignItems="center"
        style={{
          gap: 4,
        }}
      >
        <div
          onClick={() => {
            closeSearchBox();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: 56,
              height: "auto",
            }}
            src={image}
            alt=""
          />
        </div>

        <div>
          <Typography fontWeight={700} fontSize="16px" mx={"0.2rem"}>
            {product.name}
          </Typography>

          {accessToken ? (
            discountedPrice ? (
              <>
                <FlexBox alignItems="center" mx={"0.2rem"}>
                  <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                    {discountedPrice && `${discountedPrice} Kr`}
                  </SemiSpan>

                  <SemiSpan color="text.muted" fontWeight="600">
                    <del>{productPrice}</del>
                  </SemiSpan>
                </FlexBox>
              </>
            ) : (
              <Typography
                fontWeight={700}
                color="primary.main"
                fontSize="12px"
                mx={"0.2rem"}
              >
                {productPrice && `${productPrice} Kr`}
              </Typography>
            )
          ) : (
            <></>
          )}

          {accessToken ? (
            <FlexBox>
              {product?.units.map((unit) => (
                <StyledProductUnit
                  selected={selectedUnit?.id === unit?.id}
                  onClick={() => handleUnitChange(unit)}
                  key={unit?.id}
                >
                  {unit?.name}
                </StyledProductUnit>
              ))}
            </FlexBox>
          ) : (
            <></>
          )}
        </div>
      </FlexBox>
      <ProductCardCart
        addProductToCart={addProductToCart}
        cartItem={cartItem}
      />
    </FlexBox>
  );
};

export default ProductSearchItem;
