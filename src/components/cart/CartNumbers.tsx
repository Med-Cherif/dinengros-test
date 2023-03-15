import React from "react";
import styled from "styled-components";
import Card from "../../components/Card";
import CartCalculationCard from "./CartCalculationCard";

export const CardItem = styled(Card)``;

const CartNumbers = ({ afterChildren }: { afterChildren?: JSX.Element }) => {
  return (
    <CardItem>
      <CartCalculationCard afterChildren={afterChildren} />

      {/* <Divider mb="1rem" /> */}

      {/* <Link href="/cart">
            <Button mb="8px" variant="contained" color="primary" fullwidth>
              Tilbake til handlekurven
            </Button>
          </Link> */}
    </CardItem>
  );
};

export default CartNumbers;
