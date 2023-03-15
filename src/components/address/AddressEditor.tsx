import Box from "@component/Box";
import { Card1 } from "@component/Card1";
import CustomButton from "@component/common/CustomButton";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { updateUserAddressAction } from "features/actions/userActions";
import { Formik, FormikHelpers } from "formik";
import { setFormErrors } from "helpers/setFormError";
import React from "react";
import * as yup from "yup";
import DashboardLayout from "../layout/CustomerDashboardLayout";
import DeliveryAddressInputs from "./DeliveryAddressInputs";

const AddressEditor = () => {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state) => state.users);

  const handleFormSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(
      updateUserAddressAction(
        {
          onFinally() {
            formikHelpers.setSubmitting(false);
          },
          onError(error) {
            setFormErrors(error, formikHelpers.setFieldError);
          },
        },
        values
      )
    );
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="pin_filled"
        title="Rediger adresse"
        // button={
        //   <Link href="/address">
        //     <Button color="primary" bg="primary.light" px="2rem">
        //       Back to Address
        //     </Button>
        //   </Link>
        // }
      />

      <Card1>
        <Formik
          initialValues={userData.address_facturation}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Box mb="30px">
                <DeliveryAddressInputs formik={formik} />
              </Box>

              <CustomButton
                isLoading={formik.isSubmitting}
                type="submit"
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
  name: "",
  phone: "",
  street_name: "",
  city: "",
  zip_code: "",
};

const checkoutSchema = yup.object().shape({
  // name: yup.string().required("required"),
  // phone: yup.string().required("required"),
  // street_name: yup.string().required("required"),
  // city: yup.string().required("required"),
  // zip_code: yup.string().required("required"),
});

AddressEditor.layout = DashboardLayout;

export default AddressEditor;
