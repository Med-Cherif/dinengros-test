import CustomButton from "@component/common/CustomButton";
import FlexBox from "@component/FlexBox";
import Login from "@component/sessions/Login";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import TextField from "@component/text-field/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useMemo, useState } from "react";
import { H3, H5 } from "@component/Typography";
import { forgotPasswordApi, resetPasswordApi } from "apis/users/authApi";
import formatError from "helpers/formatError";
import { setFormErrors } from "helpers/setFormError";
import styled from "styled-components";
import Section1 from "@component/home-1/Section1";
import ResetPassword from "@component/password-actions/ResetPassword";
import NewPassword from "@component/password-actions/NewPassword";
import { useAppDispatch } from "@hook/useRedux";
import { userActions } from "features/slices/userSlice";
import formatUserData from "helpers/formatUserData";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
// import { useAppDispatch } from ""

const initialValues = {
  email: "",
  token: "",
  password: "",
  password_confirmation: "",
};

const validationFormEmail = yup.object().shape({
  email: yup.string().required("Required").email("Email is not valid"),
});

const validationFormToken = yup.object().shape({
  token: yup
    .string()
    .required("Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
  password: yup.string().required("Required"),
  password_confirmation: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const resetPassword = () => {
  const [step, setStep] = useState(1);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: step === 1 ? validationFormEmail : validationFormToken,
    async onSubmit(values, formikHelpers) {
      formikHelpers.setSubmitting(true);
      try {
        if (step === 1) {
          await forgotPasswordApi(values.email);
          setStep(2);
        } else if (step === 2) {
          const { data } = await resetPasswordApi({
            email: values.email,
            token: values.token,
            password: values.password,
          });
          setCookie("front_token", data.data.token);
          dispatch(
            userActions.authSuccess({
              token: data.data.token,
              userData: formatUserData(data.data.user),
            })
          );
          router.replace("/");
        }
      } catch (error) {
        if (error?.response?.data?.error && error?.response?.data?.message) {
          const err = error?.response?.data?.error;
          const msg = error?.response?.data?.message;
          let name = err.includes("token")
            ? "token"
            : err.includes("password")
            ? "password"
            : "";
          formikHelpers.setFieldError(name, msg);
        } else {
          setFormErrors(formatError(error), formikHelpers.setFieldError);
        }
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  const passwordComponents = useMemo(() => {
    return {
      1: (
        <>
          <TextField
            mb="0.75rem"
            name="email"
            placeholder="exmple@mail.com"
            label="Email"
            type="email"
            fullwidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email || ""}
            errorText={formik.touched.email && formik.errors.email}
          />
        </>
      ),
      2: (
        <>
          <ResetPassword formik={formik} />
          <NewPassword formik={formik} />
        </>
      ),
    };
  }, [formik]);

  return (
    <main>
      <FlexBox
        flexDirection="column"
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
          <form
            className="content"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <H3 textAlign="center" mb="0.5rem">
              Forgot Password
            </H3>

            {passwordComponents[step]}

            <CustomButton
              mb="1.65rem"
              variant="contained"
              color="primary"
              type="submit"
              isLoading={formik.isSubmitting}
              fullwidth
            >
              Submit
            </CustomButton>
          </form>
        </StyledSessionCard>
      </FlexBox>
    </main>
  );
};

export default resetPassword;
