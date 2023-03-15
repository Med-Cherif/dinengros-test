import React from "react";
import styled from "styled-components";
import { useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import TextField from "@component/text-field/TextField";

const SuccessMessage = styled.div`
  background: ${({ theme }: any) => theme.colors.success.main};
  color: #fff;
  padding: 12px 24px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 6px;
`;

interface IProps {
  formik: any;
}

const ResetPassword = ({ formik }: IProps) => {
  return (
    <>
      <SuccessMessage>
        We have sent you a link to reset your password, Check your email
      </SuccessMessage>
      <TextField
        mb="0.75rem"
        name="token"
        placeholder="479513"
        label="Code"
        fullwidth
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.token || ""}
        errorText={formik.touched.token && formik.errors.token}
      />
    </>
  );
};

export default ResetPassword;
