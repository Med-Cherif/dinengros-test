import Box from "@component/Box";
import CheckEmptyList from "@component/common/CheckEmptyList";
import EmptyOffersList from "@component/common/EmptyOffersList";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import OfferCard from "@component/offers/OfferCard";
import { H2 } from "@component/Typography";
import { getAllDiscounts } from "apis/products/productsApi";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

interface IProps {
  offers: any[];
}

const offers = ({ offers }: IProps) => {
  return (
    <>
      <Head>
        <title>Tilbud</title>
      </Head>

      <Box mb="3.75rem">
        <Box mb="1.5rem" mt="-1rem">
          <FlexBox justifyContent="space-between" alignItems="center" mt="1rem">
            <FlexBox alignItems="center">
              <Icon color="primary">hot-deal</Icon>
              <H2 ml="12px" my="0px" lineHeight="1" whitespace="pre">
                Tilbud
              </H2>
            </FlexBox>
          </FlexBox>
        </Box>
        <CheckEmptyList list={offers} render={<EmptyOffersList />}>
          <Grid container spacing={5}>
            {offers.map((offer: any) => {
              return (
                <Grid
                  key={offer.id}
                  item
                  xs={12}
                  xl={offers?.length === 1 ? 12 : 6}
                >
                  <OfferCard key={offer.id} offer={offer} />
                </Grid>
              );
            })}
          </Grid>
        </CheckEmptyList>
      </Box>
    </>
  );
};

offers.layout = NavbarLayout;

export default offers;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const token = getCookie("front_token", {
    req: context.req,
    res: context.res,
  });

  let offers = [];

  // if (!token) return;

  try {
    const { data } = await getAllDiscounts();
    offers = data.data || [];
  } catch (error) {
  } finally {
    return {
      props: {
        offers,
      },
    };
  }
};
