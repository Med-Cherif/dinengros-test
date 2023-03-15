import Grid from "@component/grid/Grid";
import Typography, { H2 } from "@component/Typography";
import { useAppSelector } from "@hook/useRedux";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Img1 from "../../../public/assets/images/auth-images/1.jpg";
// import Img2 from "../../../public/assets/images/auth-images/2.jfif";
import Img3 from "../../../public/assets/images/auth-images/3.jpg";
import Img4 from "../../../public/assets/images/auth-images/4.jpg";
import Img5 from "../../../public/assets/images/auth-images/5.jpg";
import Img6 from "../../../public/assets/images/auth-images/6.jpg";
import Img7 from "../../../public/assets/images/auth-images/7.jpg";

// const firstGridImages = [Img1, Img2, Img3, Img4, Img5, Img6];
const gridImages = {
  firstList: [Img1, Img5, Img7, Img3],
  secondList: [Img4, Img6],
};
// const secondGridImages = [Img4, Img5, Img6];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
`;

const ImageGridItem = styled.div``;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

interface IProps {
  type: "login" | "signup";
}

const AuthAside = ({ type }: IProps) => {
  const { header } = useAppSelector((state) => state.setup);
  return (
    <Wrapper>
      <div>
        {header.logo ? (
          <Link href="/">
            <a>
              <img src={header.logo} width={250} alt="" />
            </a>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div>
        <H2 fontWeight="700" fontSize="28px" mb="8px">
          Welcome to <Typography color="primary.main">Dinengros</Typography>
        </H2>
        {type === "signup" ? (
          <Typography fontSize="16px">
            Already have an account ?{" "}
            <Link href="/login">
              <a>
                <Typography color="primary.main" as="span">
                  Login
                </Typography>
              </a>
            </Link>
          </Typography>
        ) : (
          <Typography fontSize="16px">
            I dont have an account ?{" "}
            <Link href="/signup">
              <a>
                <Typography color="primary.main" as="span">
                  Sign up
                </Typography>
              </a>
            </Link>
          </Typography>
        )}
      </div>
      <Grid container spacing={4}>
        {Object.entries(gridImages).map(([prop, images]) => {
          return (
            <Grid key={prop} item md={6}>
              {images.map((image, i) => {
                return (
                  <ImageGridItem key={i}>
                    <Image src={image.src} alt="" />
                  </ImageGridItem>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default AuthAside;
