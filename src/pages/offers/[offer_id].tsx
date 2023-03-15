import Box from "@component/Box";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import NavbarLayout from "@component/layout/NavbarLayout";
import OfferCard from "@component/offers/OfferCard";
import { usePagination } from "@hook/usePagination";
import { getSingleOffer } from "apis/offers/offersApi";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import ProductCard1List from "@component/products/ProductCard1List";
import Head from "next/head";
import React from "react";
import Grid from "@component/grid/Grid";

interface IProps {
  offer: any;
}

const offerDetail = ({ offer }: IProps) => {
  
  const { title, productsObjects: products } = offer;
  const {currentPage, pageSize, navigateToPage} = usePagination({size: 10});

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box>
        <DashboardPageHeader iconName="hot-deal" title="Tilbudsdetaljer" />
        <OfferCard offer={offer} hideButton />
        <Grid item xs={12} style={{marginTop: '20px'}}>
          <ProductCard1List
            products={products}
            totalProducts={products.length}
            currentPage={currentPage}
            pageSize={pageSize}
            navigateToPage={navigateToPage}
          />
        </Grid>
      </Box>
    </>
  );
};

export default offerDetail;

offerDetail.layout = NavbarLayout;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  let offer = {};

  try {
    const { data } = await getSingleOffer(
      context.query.offer_id as string,
    );
    offer = data.data;
  } catch (error) {
  } finally {
    return {
      props: {
        offer,
      },
    };
  }
};
