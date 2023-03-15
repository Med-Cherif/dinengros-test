import CartCalculationCard from "@component/cart/CartCalculationCard";
import CartNumbers from "@component/cart/CartNumbers";
import CheckEmptyList from "@component/common/CheckEmptyList";
import FlexBox from "@component/FlexBox";
import { useAppSelector } from "@hook/useRedux";
import Link from "next/link";
import React, { Fragment } from "react";
import Button from "../components/buttons/Button";
import { Card1 } from "../components/Card1";
import Divider from "../components/Divider";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import ProductCard7 from "../components/product-cards/ProductCard7";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <Fragment>
      <CheckEmptyList
        children={
          <Grid container spacing={6}>
            <Grid item lg={8} md={8} xs={12}>
              {cart.map((item) => (
                <ProductCard7 key={item.id} mb="1.5rem" item={item} />
              ))}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <CartNumbers
                afterChildren={
                  <FlexBox justifyContent="center">
                    <Link href="/delivery">
                      <a
                        style={{
                          display: "block",
                          marginTop: 16,
                          width: "100%",
                        }}
                      >
                        <Button variant="contained" color="primary" fullwidth>
                          Neste
                        </Button>
                      </a>
                    </Link>
                  </FlexBox>
                }
              />
              {/* <CartCalculationCard />

                <Divider mb="1rem" />
                <Link href="/delivery">
                  <Button variant="contained" color="primary" fullwidth>
                    Neste
                  </Button>
                </Link> */}
            </Grid>
          </Grid>
        }
        list={cart}
      />
    </Fragment>
  );
};

Cart.layout = CheckoutNavLayout;

export default Cart;
