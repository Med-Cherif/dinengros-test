import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Login from "@component/sessions/Login";
import Signup from "@component/sessions/Signup";
import React from "react";
import styled from "styled-components";
import AuthAside from "./AuthAside";

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  max-width: 540px;
  @media (max-width: 767px) {
    max-width: none;
  }
`;

interface IProps {
  type: "login" | "signup";
}

const AuthContent = ({ type }: IProps) => {
  return (
    <Container>
      <Grid
        container
        spacing={8}
        style={{
          minHeight: "100vh",
          padding: "50px 20px",
        }}
      >
        <Grid item md={5} xl={4}>
          <AuthAside type={type} />
        </Grid>
        <Grid
          item
          md={7}
          xl={8}
          style={{
            paddingTop: 50,
          }}
        >
          <Wrapper>{type === "signup" ? <Signup /> : <Login />}</Wrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthContent;
