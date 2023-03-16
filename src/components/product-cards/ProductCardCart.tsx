import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography from "@component/Typography";
import useCartItem from "@hook/useCartItem";
import { ICartItem } from "interfaces/cart";
import React from "react";
import ProductInCart from "./ProductInCart";
import ProductNotInCart from "./ProductNotInCart";

interface IProps {
  cartItem: ICartItem;
  isLoading: boolean;
  addProductToCart: (onSuccess?: () => void) => void;
}

const ProductCardCart = ({ isLoading, cartItem, addProductToCart }: IProps) => {
  return cartItem ? (
    <ProductInCart cartItem={cartItem} />
  ) : (
    <ProductNotInCart
      isLoading={isLoading}
      addProductToCart={addProductToCart}
    />
  );
};

export default ProductCardCart;
