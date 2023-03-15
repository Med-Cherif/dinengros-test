import ProductIntro from "@component/products/ProductIntro";
import { IProduct } from "interfaces/product";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Box from "../Box";
import Button from "../buttons/Button";
import Card, { CardProps } from "../Card";
import { Chip } from "../Chip";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Modal from "../modal/Modal";
import { H3, SemiSpan } from "../Typography";
import { StyledProductCard1 } from "./ProductCardStyle";
import { StyledProductUnit } from "@component/products/ProductUnitsStyle";
import { useAppSelector } from "@hook/useRedux";
import FavoriteIcons from "@component/wish-list/FavoriteIcons";
import { useRouter } from "next/router";

import styled from "styled-components";
import CustomButton from "@component/common/CustomButton";
import ProductCardCart from "./ProductCardCart";
import useProduct from "@hook/useProduct";
import RenderConditional from "@component/common/RenderConditional";
import AddToCartButton from "@component/cart/AddToCartButton";

const ProductCard = styled(StyledProductCard1)(() => ({
  border: "1px solid gainsboro",
  boxShadow: "2px 1px 8px #dbdbdb",
  transition: "all 250ms ease-in-out",
  overflow: "hidden",
  "&:hover img": {
    transform: "scale(1.07)",
  },
}));

const ProductTitle = styled(H3)`
  &:after {
    content: "";
    position: absolute;
    top: 24px;
    left: 0;
    display: ${(props) => (props.show ? "block" : "none")};
    width: 100%;
    height: 2px;
    background-color: #dedede;
  }
`;

export interface ProductCard1Props extends CardProps {
  product: IProduct;
}

const ProductCard1: React.FC<ProductCard1Props> = ({ product, ...props }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { offer_id } = router.query;

  const { accessToken } = useAppSelector((state) => state.users);

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const { userData } = useAppSelector((state) => state.users);

  const {
    productPrice,
    discountedPrice,
    totalStock,
    offerPercentage,
    image,
    addProductToCart,
    selectedUnit,
    cartItem,
    handleUnitChange,
    isLoading,
    personalDiscount,
  } = useProduct({
    product,
    productInfoArgs: {
      offer_id: +offer_id as number,
    },
  });

  return (
    <ProductCard {...props} className="product-1-card">
      <div className="image-holder">
        {userData.id && (
          <>
            <FlexBox className="extra-icons">
              <FavoriteIcons productID={+product?.id} />
            </FlexBox>
          </>
        )}

        <div
          style={{
            cursor: "pointer",
          }}
          onClick={toggleDialog}
        >
          <img
            src={image}
            alt={product?.name}
            width={100}
            height={100}
            style={{
              transition: "ease .5s",
            }}
            className="product-image"
          />
        </div>

        {userData.id || offer_id ? (
          <>
            {!!offerPercentage && (
              <Chip
                position="absolute"
                bg="primary.main"
                color="primary.text"
                fontSize="12px"
                fontWeight="600"
                p="5px 10px"
                top="10px"
                left="10px"
              >
                {personalDiscount && "For deg"} -
                {Number(offerPercentage).toFixed()}% av
              </Chip>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="details">
        <FlexBox position="relative">
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <ProductTitle
              className="title"
              fontSize="14px"
              textAlign="left"
              fontWeight="600"
              color="text.secondary"
              mb="10px"
              show={accessToken}
              title={product?.name}
            >
              {product?.name}
            </ProductTitle>

            <RenderConditional
              when={!!userData.id || !!offer_id}
              otherwise={<></>}
              render={
                <>
                  <FlexBox alignItems="center" mt="10px">
                    <RenderConditional
                      when={!!discountedPrice}
                      otherwise={
                        <SemiSpan
                          pr="0.5rem"
                          fontWeight="600"
                          color="primary.main"
                        >
                          {productPrice && `${productPrice} Kr`}
                        </SemiSpan>
                      }
                      render={
                        <>
                          <SemiSpan
                            pr="0.5rem"
                            fontWeight="600"
                            color="primary.main"
                          >
                            {discountedPrice && `${discountedPrice} Kr`}
                          </SemiSpan>

                          <SemiSpan color="text.muted" fontWeight="600">
                            <del>{productPrice}</del>
                          </SemiSpan>
                        </>
                      }
                    />
                  </FlexBox>
                  <FlexBox mt="1rem">
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
                </>
              }
            />
          </Box>

          {/* {!cartItem ? (
            <FlexBox
              flexDirection="column-reverse"
              alignItems="center"
              width="30px"
            >
              <AddToCartButton
                isLoading={isLoading}
                onClick={() => addProductToCart()}
              />
            </FlexBox>
          ) : (
            )} */}
          <ProductCardCart
            addProductToCart={addProductToCart}
            cartItem={cartItem}
          />
        </FlexBox>
      </div>

      <Modal open={open} onClose={toggleDialog}>
        <Card
          p="2rem"
          position="relative"
          style={{
            width: "100%",
            maxWidth: 750,
            minHeight: 350,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProductIntro
            cartItem={cartItem}
            isLoading={isLoading}
            addProductToCart={addProductToCart}
            imgUrl={[image]}
            product={product}
            handleUnitChange={handleUnitChange}
            toggleDialog={toggleDialog}
            selectedUnit={selectedUnit}
            price={productPrice}
            discountedPrice={discountedPrice}
            personalDiscount={personalDiscount}
            offerPercentage={offerPercentage}
            inStock={totalStock}
          />
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
            <Icon
              className="close"
              color="primary"
              variant="small"
              onClick={toggleDialog}
            >
              close
            </Icon>
          </Box>
        </Card>
      </Modal>
    </ProductCard>
  );
};

export default ProductCard1;
