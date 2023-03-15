import { FormikHelpers, useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import styled from "styled-components";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import systemCss from "@styled-system/css";
import TextField from "../text-field/TextField";
import Typography, { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";
import CompanyForm from "./Signup/CompanyForm";
import UserForm from "./Signup/UserForm";
import { IUserRegister } from "interfaces/user";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { setFormErrors } from "helpers/setFormError";
import { registerAction } from "features/actions/userActions";
import CustomButton from "@component/common/CustomButton";
import { useRouter } from "next/router";

const initialValuesUser = {
  first_name: "",
  last_name: "",
  city: "",
  street_name: "",
  zip_code: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
  agreement: false,
};

const initialValuesCompany = {
  company_name: "",
  company_number: "",
  ...initialValuesUser,
};

const formSchemaUser = yup.object().shape({
  city: yup.string().required("${path} is required"),
  first_name: yup.string().required("${path} is required"),
  last_name: yup.string().required("${path} is required"),
  street_name: yup.string().required("${path} is required"),
  zip_code: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  phone: yup
    .string()
    .required("${path} is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "${path} is not valid"
    ),
  password: yup.string().required("${path} is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

const formSchemaCompany = formSchemaUser.shape({
  company_name: yup.string().required("${path} is required"),
  company_number: yup
    .number()
    .integer("${path} must include only numbers")
    .required("${path} is required"),
});

const TabsWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  gap: 8,
  margin: "12px 0 28px",
});

const TabItem = styled.button`
  padding: 12px 32px;
  width: 140px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  background: #fff;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  & i {
    font-size: 28px;
  }
  &.active {
    background: ${({ theme }: any) => theme.colors.primary.main};
    color: #fff;
  }
`;

const Signup: React.FC = () => {
  const [isCompany, setIsCompany] = useState(true);
  const { replace } = useRouter();

  const { header } = useAppSelector((state) => state.setup);

  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: IUserRegister,
    formikHelpers: FormikHelpers<IUserRegister>
  ) => {
    dispatch(
      registerAction(
        {
          onLoading() {
            formikHelpers.setSubmitting(true);
          },
          onFinally() {
            formikHelpers.setSubmitting(false);
          },
          onError(error) {
            setFormErrors(error, formikHelpers.setFieldError, true);
          },
          onSuccess() {
            replace({
              pathname: "login",
              query: {
                from: "register",
              },
            });
          },
        },
        {
          is_company: isCompany,
          data: values as any,
        }
      )
    );
  };

  const companyFormik = useFormik({
    initialValues: initialValuesCompany,
    validationSchema: formSchemaCompany,
    // onSubmit: handleSubmit,
    onSubmit(values, formikHelpers) {
      handleSubmit(values as any, formikHelpers as any);
    },
  });

  const userFormik = useFormik({
    initialValues: initialValuesUser,
    validationSchema: formSchemaUser,
    onSubmit(values, formikHelpers) {
      handleSubmit(values as any, formikHelpers as any);
    },
  });

  return (
    // <StyledSessionCard
    //   style={{
    //     width: "100%",
    //     maxWidth: "750px",
    //   }}
    //   mx="auto"
    //   my="2rem"
    //   boxShadow="large"
    // >
    <form className="content">
      {/* <div>
        {header.logo ? (
          <Link href="/">
            <a>
              <img
                src={header.logo}
                style={{ display: "block", margin: "auto" }}
                width={250}
                alt=""
              />
            </a>
          </Link>
        ) : (
          <></>
        )}
      </div> */}

      <H3 textAlign="center" mb="0.5rem">
        REGISTRERE
      </H3>

      <TabsWrapper>
        <TabItem
          className={isCompany ? "active" : ""}
          onClick={() => setIsCompany(true)}
          type="button"
        >
          <div>
            <i className="fa-sharp fa-regular fa-building"></i>
          </div>
          <Typography fontWeight={500} fontSize="18px">
            Company
          </Typography>
        </TabItem>
        <TabItem
          className={!isCompany ? "active" : ""}
          onClick={() => setIsCompany(false)}
          type="button"
        >
          <i className="fa-sharp fa-solid fa-user"></i>
          Person
        </TabItem>
      </TabsWrapper>

      {isCompany ? (
        <CompanyForm formik={companyFormik} />
      ) : (
        <UserForm formik={userFormik} />
      )}

      <CustomButton
        mb="1.65rem"
        variant="contained"
        color="primary"
        type="button"
        isLoading={companyFormik.isSubmitting || userFormik.isSubmitting}
        onClick={() => {
          if (isCompany) {
            companyFormik.handleSubmit();
          } else {
            userFormik.handleSubmit();
          }
        }}
        fullwidth
      >
        REGISTRERE
      </CustomButton>
    </form>
    // <FlexBox justifyContent="center" bg="gray.200" py="19px">
    //   <SemiSpan>Har du allerede en konto?</SemiSpan>
    //   <Link href="/login">
    //     <a>
    //       <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
    //         logg inn
    //       </H6>
    //     </a>
    //   </Link>
    // </FlexBox>
    // </StyledSessionCard>
  );
};

export default Signup;
