import Icon from "@component/icon/Icon";
import TextField from "@component/text-field/TextField";
import React, { useState } from "react";
import IconButton from "@component/buttons/IconButton";

interface IProps {
  formik: any;
}

const NewPassword = ({ formik }: IProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () =>
    setPasswordVisibility((current) => !current);

  return (
    <>
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
    </>
  );
};

export default NewPassword;
