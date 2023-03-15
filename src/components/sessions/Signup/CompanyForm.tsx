import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import CheckBox from "@component/CheckBox";
import CustomButton from "@component/common/CustomButton";
import FlexBoxInput from "@component/common/FlexBoxInput";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import TextField from "@component/text-field/TextField";
import { H6, SemiSpan } from "@component/Typography";
import { useAppDispatch } from "@hook/useRedux";
import { registerAction } from "features/actions/userActions";
import { Formik, FormikHelpers, useFormik } from "formik";
import formatError from "helpers/formatError";
import { setFormErrors } from "helpers/setFormError";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import UserForm from "./UserForm";

interface IProps {
  formik: any;
}

const CompanyForm = ({ formik }: IProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  return (
    <>
      <FlexBoxInput>
        <TextField
          mb="0.75rem"
          name="company_name"
          label="Company name"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.company_name || ""}
          errorText={formik.touched.company_name && formik.errors.company_name}
        />
        <TextField
          mb="0.75rem"
          name="company_number"
          label="Company number"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.company_number || ""}
          errorText={
            formik.touched.company_number && formik.errors.company_number
          }
        />
      </FlexBoxInput>

      <UserForm formik={formik} />
    </>
  );
};

export default CompanyForm;
