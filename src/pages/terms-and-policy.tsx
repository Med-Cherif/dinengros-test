import { useEffect } from "react";
import NavbarLayout from "@component/layout/NavbarLayout";
import { H2 } from "@component/Typography";
import { getAboutApi } from "apis/about/aboutApi";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { getPolicyApi } from "apis/policy/policyApi";

interface IProps {
  about: string;
}

const BoxStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-height: 100vh; */
`;

const PaperStyled = styled.div`
  padding: 35px 20px;
  background-color: #25282e;
  color: #fff;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 750px;
  min-height: 320px;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`;

interface IProps {
  policy: string;
}

const termsAndPolicy = ({ policy }: IProps) => {
  return (
    <>
      <Head>
        <title>Terms and policy</title>
      </Head>
      <BoxStyled>
        <PaperStyled>
          <H2 color="primary.main">Terms and policy</H2>
          <div
            dangerouslySetInnerHTML={{
              __html: `${policy}`,
            }}
          />
        </PaperStyled>
      </BoxStyled>
    </>
  );
};

termsAndPolicy.layout = NavbarLayout;

export default termsAndPolicy;

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  let policy = "";
  try {
    const { data } = await getPolicyApi();
    policy = data.data.policy;
  } catch (error) {
  } finally {
    return {
      props: {
        policy,
      },
    };
  }
};
