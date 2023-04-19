import Box from "@component/Box";
import Copyright from "@component/copyright/Copyright";
import Footer from "@component/footer/Footer";
import Header from "@component/header/Header";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
import Topbar from "@component/topbar/Topbar";
import { useAppSelector } from "@hook/useRedux";
import Head from "next/head";
import React from "react";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
};

const AppLayout: React.FC<Props> = ({ children, navbar }) => {
  const setup = useAppSelector((state) => state.setup);

  return (
    <StyledAppLayout>
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

      <Topbar setup={setup} />

      <Sticky fixedOn={0}>
        <Header setup={setup} />
      </Sticky>

      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}

      <MobileNavigationBar />
      <Footer setup={setup} />
      <Copyright setup={setup} />
    </StyledAppLayout>
  );
};

export default AppLayout;
