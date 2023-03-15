import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import CustomButton from "@component/common/CustomButton";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { useAppDispatch } from "@hook/useRedux";
import { updateUserPasswordAction } from "features/actions/userActions";
import { Formik, FormikHelpers } from "formik";
import { setFormErrors } from "helpers/setFormError";
import Link from "next/link";
import React from "react";
import * as yup from "yup";

const updatePassword = () => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (
    values,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    formikHelpers.setSubmitting(true);
    dispatch(
      updateUserPasswordAction(
        {
          onError(error) {
            setFormErrors(error, formikHelpers.setFieldError);
          },
          onFinally() {
            formikHelpers.setSubmitting(false);
          },
        },
        values
      )
    );
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="icon-lock"
        title="Rediger passord"
        button={
          <Link href="/profile">
            <Button color="primary" bg="primary.light" px="2rem">
              Tilbake til profilen
            </Button>
          </Link>
        }
      />

      <Card1>
        {/* <FlexBox alignItems="flex-end" mb="22px">
          <Avatar src="/assets/images/faces/ralph.png" size={64} />

          <Box ml="-20px" zIndex={1}>
            <label htmlFor="profile-image">
              <Button
                as="span"
                size="small"
                bg="gray.300"
                color="secondary"
                height="auto"
                p="6px"
                borderRadius="50%"
              >
                <Icon>camera</Icon>
              </Button>
            </label>
          </Box>
          <Hidden>
            <input
              className="hidden"
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Hidden>
        </FlexBox> */}

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      name="password_old"
                      type="password"
                      label="Current Password"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password_old || ""}
                      errorText={touched.password_old && errors.password_old}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="password"
                      type="password"
                      label="New Password"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password || ""}
                      errorText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="password_confirmation"
                      type="password"
                      label="New Password Confirmation"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password_confirmation || ""}
                      errorText={
                        touched.password_confirmation &&
                        errors.password_confirmation
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              <CustomButton
                isLoading={isSubmitting}
                onClick={() => handleSubmit()}
                type="button"
                variant="contained"
                color="primary"
              >
                Large
              </CustomButton>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

const initialValues = {
  password_old: "",
  password: "",
  password_confirmation: "",
};

const schema = yup.object().shape({
  password_old: yup.string().required("Required"),
  password: yup.string().required("Required"),
  password_confirmation: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Password not match"),
});

updatePassword.layout = DashboardLayout;

export default updatePassword;
