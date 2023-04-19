import Avatar from "@component/avatar/Avatar";
import CheckEmptyList from "@component/common/CheckEmptyList";
import FlexBox from "@component/FlexBox";
import { useAppSelector } from "@hook/useRedux";
import calculateTotalPrice from "helpers/calculateTotalPrice";
// import { CartItem } from "@reducer/cartReducer";
import NextImage from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";
import Button from "../buttons/Button";
import Divider from "../Divider";
import Icon from "../icon/Icon";
import Typography, { H5, Paragraph, Tiny } from "../Typography";
import MiniCartItem from "./MiniCartItem";
import { StyledMiniCart } from "./MiniCartStyle";

type MiniCartProps = {
  toggleSidenav?: () => void;
};

const MiniCart: React.FC<MiniCartProps> = ({ toggleSidenav }) => {
  // const handleCartAmountChange = useCallback(
  //   (amount, product) => () => {
  //     dispatch({
  //       type: "CHANGE_CART_AMOUNT",
  //       payload: {
  //         ...product,
  //         qty: amount,
  //       },
  //     });
  //   },
  //   []
  // );

  // const getTotalPrice = () => {
  //   return (
  //     // cartList.reduce(
  //     //   (accumulator, item) => accumulator + item.price * item.qty,
  //     //   0
  //     // ) || 0
  //   );
  // };

  const { cart } = useAppSelector((state) => state.cart);

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox alignItems="center" m="0px 20px" height="74px">
          <Icon size="1.75rem">bag</Icon>
          <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
            {cart.length} {cart.length === 1 ? "Produkter" : "Produkter"}
          </Typography>
        </FlexBox>

        <Divider />

        <CheckEmptyList
          list={cart}
          render={
            <FlexBox
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="calc(100% - 80px)"
            >
              <NextImage
                src="/assets/images/logos/shopping-bag.svg"
                width="90px"
                height="100%"
              />
              <Paragraph
                mt="1rem"
                color="text.muted"
                textAlign="center"
                maxWidth="200px"
              >
                Handleposen din er tom. Begynn å handle
              </Paragraph>
            </FlexBox>
          }
        >
          {cart.map((item) => (
            <MiniCartItem key={item.id} item={item} />
          ))}
        </CheckEmptyList>
      </div>
      {cart.length > 0 ? (
        <>
          <Link href="/delivery">
            <Button
              variant="contained"
              color="primary"
              m="1rem 1rem 0.75rem"
              onClick={toggleSidenav}
            >
              <Typography fontWeight={600}>
                Bestill nå ({calculateTotalPrice(cart)} Kr)
              </Typography>
            </Button>
          </Link>
          <Link href="/cart">
            <Button
              color="primary"
              variant="outlined"
              m="0px 1rem 0.75rem"
              onClick={toggleSidenav}
            >
              <Typography fontWeight={600}>Se handlekurv</Typography>
            </Button>
          </Link>
        </>
      ) : (
        <></>
      )}
    </StyledMiniCart>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};

export default MiniCart;
