import FlexBox from "@component/FlexBox";
import CatalogueHeader from "@component/catalogue/CatalogueHeader";
import CatalogueContent from "@component/catalogue/CatalogueContent";
import CatalogueFooter from "@component/catalogue/CatalogueFooter";
import { useAppSelector } from "@hook/useRedux";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

const Catelogue = () => {
  const setup = useAppSelector((state) => state.setup);
  return (
    <>
      <Head>
        <title>{setup.website.name || "Dinengros"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href={setup.website.favIcon} />
        <meta
          property="og:description"
          content={
            setup.website.description ||
            "Din Engros is a wholesaler for businesses and was established in 2012"
          }
        />
        <meta name="keywords" content={setup.website.keywords || ""} />
        <meta property="og:title" content={setup.website.name} />
        <meta name="apple-mobile-web-app-title" content={setup.website.name} />
        <meta name="application-name" content={setup.website.name} />
      </Head>
      <FlexBox minHeight="100vh" flexDirection="column">
        <CatalogueHeader />
        <CatalogueContent />
        <CatalogueFooter />
      </FlexBox>
    </>
  );
};

export default Catelogue;
