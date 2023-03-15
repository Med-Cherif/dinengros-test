import CustomButton from "@component/common/CustomButton";
import Grid from "@component/grid/Grid";
import NavbarLayout from "@component/layout/NavbarLayout";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import Typography, { H3, H5 } from "@component/Typography";
import { useAppSelector } from "@hook/useRedux";
import { sendContactUsApi } from "apis/contact/contactApi";
import { useFormik } from "formik";
import toastAlert from "helpers/toastAlert";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup.string().required(),
  company: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  message: yup.string().required(),
});

const contactUs = () => {
  const setup = useAppSelector((state) => state.setup);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      fullname: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: schema,
    async onSubmit(values, formikHelpers) {
      try {
        formikHelpers.setSubmitting(true);
        await sendContactUsApi(values);
        formikHelpers.resetForm();
        toastAlert("Message send successfully", "success");
      } catch (error) {
        toastAlert("Something went wrong", "error");
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Kontakt Oss</title>
      </Head>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={6}>
          <StyledSessionCard
            style={{
              background: "#25282e",
              padding: 20,
              height: "100%",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <H3 mb="0.5rem" color="primary.main">
              La oss ta kontakt
            </H3>
            <H5 fontWeight="600" fontSize="12px" mb="2.25rem">
              Kontakt oss med følgende detaljer.
            </H5>
            <Typography py="0.3rem" color="gray.500">
              {setup.footer.contactInfo.address &&
                `Address:  ${setup.footer.contactInfo.address}`}
            </Typography>
            <Typography py="0.3rem" color="gray.500">
              {setup.footer.contactInfo.email &&
                `Email:  ${setup.footer.contactInfo.email}`}
            </Typography>
            <Typography py="0.3rem" color="gray.500">
              {setup.footer.contactInfo.phone &&
                `Phone:  +${setup.footer.contactInfo.phone}`}
            </Typography>

            <Typography py="0.3rem" my="24px">
              Kontakt with Oss :
            </Typography>
          </StyledSessionCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <StyledSessionCard>
            <form className="content" onSubmit={(e) => e.preventDefault()}>
              <H3 textAlign="center" mb="0.5rem">
                Kontakt Oss
              </H3>
              <H5
                fontWeight="600"
                fontSize="12px"
                color="gray.800"
                textAlign="center"
                mb="2.25rem"
              >
                Kontakt oss med følgende detaljer.
              </H5>

              <TextField
                mb="0.75rem"
                name="fullname"
                label="Name"
                type="text"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullname || ""}
                errorText={touched.fullname && errors.fullname}
              />
              <TextField
                mb="0.75rem"
                name="company"
                label="Company"
                type="text"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company || ""}
                errorText={touched.company && errors.company}
              />

              <TextField
                mb="1rem"
                name="email"
                label="Email"
                type="email"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ""}
                errorText={touched.email && errors.email}
              />
              <TextField
                mb="1rem"
                name="phone"
                type={"text"}
                label="Phone"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone || ""}
                errorText={touched.phone && errors.phone}
              />

              <TextArea
                mb="1rem"
                name="message"
                rows={3}
                label="Message"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message || ""}
                errorText={touched.message && errors.message}
              />

              <CustomButton
                mb="1.65rem"
                variant="contained"
                color="primary"
                type="button"
                isLoading={isSubmitting}
                onClick={() => handleSubmit()}
                fullwidth
              >
                Submit
              </CustomButton>
            </form>
          </StyledSessionCard>
        </Grid>
      </Grid>
    </>
  );
};

contactUs.layout = NavbarLayout;

export default contactUs;
