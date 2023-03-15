import { useEffect } from "react";
import NavbarLayout from "@component/layout/NavbarLayout";
import { H2 } from "@component/Typography";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { getAbout } from "apis/setup/setupApi";

interface IProps {
  about: string;
}

const BoxStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  min-height: 100vh;
  background-image: url(https://demo.dinengros.no/storage/app/uploads/public/60e/fcd/07b/60efcd07bc352049862832.jpg);
  background-size: cover;
  background-repeat: no-repeat;
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

const aboutUs = ({ about }: IProps) => {
  useEffect(() => {
    // console.log({ aboutFromClient: about });
  }, []);
  return (
    <>
      <Head>
        <title>Omm Oss</title>
      </Head>
      <BoxStyled>
        <PaperStyled>
          <H2 color="primary.main">Omm Oss</H2>
          <div
            dangerouslySetInnerHTML={{
              __html: `${about}`,
            }}
          />
        </PaperStyled>
      </BoxStyled>
    </>
  );
};

aboutUs.layout = NavbarLayout;

export default aboutUs;

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  let aboutData = "";
  try {
    const { data } = await getAbout();
    aboutData = data.data?.about || "";
    console.log({ aboutFromServer: aboutData });
  } catch (error) {
  } finally {
    return {
      props: {
        about: aboutData,
      },
    };
  }
};
