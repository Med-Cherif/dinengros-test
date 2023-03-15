import Button from "@component/buttons/Button";
import CustomButton from "@component/common/CustomButton";
import Grid from "@component/grid/Grid";
import Link from "next/link";
import React from "react";

interface IProps {
  onOrderClick: () => void;
  isLoading: boolean;
}

const CardFooter = ({ isLoading, onOrderClick }: IProps) => {
  return (
    <Grid container spacing={7}>
      <Grid item sm={6} xs={12}>
        <Link href="/cart">
          <Button variant="outlined" color="primary" type="button" fullwidth>
            Tilbake til handlekurven
          </Button>
        </Link>
      </Grid>
      <Grid item sm={6} xs={12}>
        <CustomButton
          isLoading={isLoading}
          onClick={onOrderClick}
          variant="contained"
          color="primary"
          type="button"
          fullwidth
        >
          Bestill nå
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default CardFooter;
