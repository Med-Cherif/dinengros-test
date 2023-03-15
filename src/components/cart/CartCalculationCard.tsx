import { useAppSelector } from "@hook/useRedux";
import calculateTotalPrice from "helpers/calculateTotalPrice";
import { getNetTax } from "helpers/getTaxPrice";
import React from "react";
import CartPriceItem from "./CartPriceItem";
import styled from "styled-components";
import FlexBox from "@component/FlexBox";
import Link from "next/link";
import Button from "@component/buttons/Button";

const NumbersWrapper = styled.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TotalWrapper = styled.div`
  padding: 16px;
  background-color: #1a202c;
  /* display: flex; */
  /* align-items: center; */
`;

const CartCalculationCard = ({
  afterChildren,
}: {
  afterChildren?: JSX.Element;
}) => {
  const { cart } = useAppSelector((state) => state.cart);

  const getSubTotal = () => {
    return calculateTotalPrice(cart);
  };

  const getTaxesPrices = () => {
    return cart.reduce((acc, item) => {
      return (
        acc + getNetTax(item.price, item.product?.taxes[0]?.percentage || 0)
      );
    }, 0);
  };

  // const getSubTotal

  return (
    <>
      <NumbersWrapper>
        <CartPriceItem
          property="Sub Total"
          value={`${getSubTotal().toFixed(2)}`}
        />

        <CartPriceItem
          property="Avgift"
          value={`${getTaxesPrices().toFixed(2)}`}
        />
      </NumbersWrapper>
      <TotalWrapper>
        <CartPriceItem
          afterChildren={afterChildren}
          titleProps={{
            fontWeight: "700",
            color: "#fff",
          }}
          valueProps={{
            fontWeight: "700",
            color: "#fff",
          }}
          property="Total"
          value={`${(getSubTotal() + getTaxesPrices()).toFixed(2)}`}
        />
      </TotalWrapper>
    </>
  );
};

export default CartCalculationCard;
