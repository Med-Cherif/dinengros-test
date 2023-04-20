import { useAppSelector } from "@hook/useRedux";
import Head from "next/head";
import React, { useState } from "react";
import CatalogueWrapper from "@component/catalogue/CatalogueWrapper";
import CatalogueFirstPage from "@component/catalogue/CatalogueFirstPage";
import CatalogueProductsSinglePage from "@component/catalogue/CatalogueProductsSinglePage";
import CataloguePage from "@component/catalogue/CataloguePage";
import handleProductsCatalogue, {
  sliceCatalogue,
} from "@helpers/handleProductsCatalogue";
import useWindowSize from "@hook/useWindowSize";
import { catalogueProducts } from "data/catalogue";
import catalogueImg from "../../../public/assets/images/catalogue/catalogue-last.jpg";

const Catelogue = () => {
  const setup = useAppSelector((state) => state.setup);
  const [activePage, setActivePage] = useState(1);

  const catalogue = handleProductsCatalogue(catalogueProducts);
  const pages = sliceCatalogue(catalogue);

  const width = useWindowSize();

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
      <CatalogueWrapper activePage={activePage} setActivePage={setActivePage}>
        <CatalogueFirstPage />
        {width
          ? width < 992
            ? Object.entries(catalogue).map(([prop, products], index) => {
                return (
                  <CatalogueProductsSinglePage key={prop} products={products} />
                );
              })
            : pages.map((page, idx) => {
                return (
                  <CataloguePage
                    key={idx}
                    list1={page.list1}
                    list2={page.list2}
                  />
                );
              })
          : null}
        <CatalogueFirstPage img={catalogueImg.src} />
      </CatalogueWrapper>
    </>
  );
};

export default Catelogue;
