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
import { FormikHelpers, useFormik } from "formik";
import { setFormErrors } from "helpers/setFormError";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";

interface IProps {
  formik: any;
}

const UserForm = ({ formik }: IProps) => {
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
          name="first_name"
          placeholder=""
          label="First Name"
          type="text"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.first_name || ""}
          errorText={formik.touched.first_name && formik.errors.first_name}
        />
        <TextField
          mb="0.75rem"
          name="last_name"
          placeholder=""
          label="Last Name"
          type="text"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.last_name || ""}
          errorText={formik.touched.last_name && formik.errors.last_name}
        />
      </FlexBoxInput>
      <FlexBoxInput>
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
        <TextField
          mb="0.75rem"
          name="phone"
          placeholder=""
          label="Phone"
          type="text"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone || ""}
          errorText={formik.touched.phone && formik.errors.phone}
        />
      </FlexBoxInput>
      <FlexBoxInput>
        <TextField
          mb="0.75rem"
          name="city"
          placeholder=""
          label="City"
          type="text"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.city || ""}
          errorText={formik.touched.city && formik.errors.city}
        />

        <TextField
          mb="0.75rem"
          name="zip_code"
          placeholder=""
          label="Postal Code"
          type="text"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.zip_code || ""}
          errorText={formik.touched.zip_code && formik.errors.zip_code}
        />
      </FlexBoxInput>
      <TextField
        mb="0.75rem"
        name="street_name"
        placeholder=""
        label="Address"
        type="text"
        fullwidth
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.street_name || ""}
        errorText={formik.touched.street_name && formik.errors.street_name}
      />

      <FlexBoxInput>
        <TextField
          mb="0.75rem"
          name="password"
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          label="Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password || ""}
          errorText={formik.touched.password && formik.errors.password}
        />
        <TextField
          mb="1rem"
          name="password_confirmation"
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          label="Confirm Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password_confirmation || ""}
          errorText={
            formik.touched.password_confirmation &&
            formik.errors.password_confirmation
          }
        />
      </FlexBoxInput>

      <CheckBox
        mb="1.75rem"
        name="agreement"
        color="secondary"
        checked={formik.values.agreement}
        onChange={formik.handleChange}
        label={
        <SemiSpan>Ved å opprette en kundekonto samtykker du i at Din Engros AS behandler dine opplysninger i henhold til <a href="/" target="_blank" rel="noreferrer noopener">
          våre salgsbetingelser
        </a></SemiSpan>
            
        }
      />
    </>
  );
};

export default UserForm;
