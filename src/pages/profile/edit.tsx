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
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { updateUserProfileAction } from "features/actions/userActions";
import { Formik, FormikHelpers } from "formik";
import { setFormErrors } from "helpers/setFormError";
import toastAlert from "helpers/toastAlert";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";

const ProfileEditor = () => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    formikHelpers.setSubmitting(true);
    dispatch(
      updateUserProfileAction(
        {
          onFinally() {
            formikHelpers.setSubmitting(false);
          },
          onSuccess() {
            toastAlert("Profile Updated Successfully");
          },
          onError(error) {
            setFormErrors(error, formikHelpers.setFieldError);
          },
        },
        values
      )
    );
  };

  const { userData } = useAppSelector((state) => state.users);
  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="Rediger profil"
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
          initialValues={{
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            city: userData.address?.city,
            zip_code: userData.address?.zip_code,
            street_name: userData.address?.street_name,
          }}
          validationSchema={checkoutSchema}
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="first_name"
                      label="First Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name || ""}
                      errorText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="last_name"
                      label="Last Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name || ""}
                      errorText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ""}
                      errorText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="phone"
                      label="Phone"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone || ""}
                      errorText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="city"
                      label="City"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city || ""}
                      errorText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="zip_code"
                      label="Postal Code"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.zip_code || ""}
                      errorText={touched.zip_code && errors.zip_code}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="street_name"
                      label="Address"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.street_name || ""}
                      errorText={touched.street_name && errors.street_name}
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
                Lagre
              </CustomButton>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  city: "",
  zip_code: "",
  street_name: "",
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .required("required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "${path} is not valid"
    ),
});

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;
