import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../utils/globalStyles";
import { theme } from "../utils/theme";
import { wrapper } from "features/store";
import { Provider } from "react-redux";
import App from "next/app";
import AppWrapper from "@component/AppWrapper";
import { getUserDataApi } from "apis/users/authApi";
import { userActions } from "features/slices/userSlice";
import { getCookie } from "cookies-next";
import formatUserData from "helpers/formatUserData";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const NextApp = ({ Component, ...rest }: any) => {
  let Layout = Component.layout || Fragment;

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/assets/images/logo-2.png" />
          </Head>
          <AppWrapper>
            <GlobalStyles />
            <Layout>
              <Component {...props.pageProps} />
              <ToastContainer limit={1} />
            </Layout>
          </AppWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

NextApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context) => {
    const pageProps = {
      ...(await App.getInitialProps(context)).pageProps,
    };
    const token = getCookie("front_token", {
      req: context.ctx.req,
      res: context.ctx.res,
    });

    if (token) {
      const [userData] = await Promise.allSettled([
        getUserDataApi(token as string),
      ]);

      if (userData.status === "fulfilled") {
        store.dispatch(
          userActions.authSuccess({
            token,
            userData: formatUserData(userData.value.data.data),
          })
        );
      } else {
        store.dispatch(
          userActions.authSuccess({
            token,
            userData: formatUserData({}),
          })
        );
      }
    }

    return { pageProps };
  }
);

export default NextApp;
