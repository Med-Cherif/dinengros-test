import AuthContent from "@component/auth/AuthContent";
import React from "react";
import FlexBox from "../components/FlexBox";
import Login from "../components/sessions/Login";

const LoginPage = () => {
  return (
    <AuthContent type="login" />
    // <FlexBox
    //   flexDirection="column"
    //   minHeight="100vh"
    //   alignItems="center"
    //   justifyContent="center"
    // >
    //   <Login />
    // </FlexBox>
  );
};

export default LoginPage;
