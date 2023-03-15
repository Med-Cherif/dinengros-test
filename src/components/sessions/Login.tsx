import CustomButton from "@component/common/CustomButton";
import Spinner from "@component/Spinner";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { loginAction } from "features/actions/userActions";
import { FormikHelpers, useFormik } from "formik";
import { setFormErrors } from "helpers/setFormError";
import { IUserLogin } from "interfaces/user";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface IProps {
  closeModal?: () => void;
}

const Login: React.FC<IProps> = ({ closeModal }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { header } = useAppSelector((state) => state.setup);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });
  function handleFormSubmit(
    values: IUserLogin,
    formikHelpers: FormikHelpers<IUserLogin>
  ) {
    formikHelpers.setSubmitting(true);
    dispatch(
      loginAction(
        {
          onLoading() {},
          onError(error) {
            formikHelpers.setFieldError(
              "email",
              error?.response?.data?.error || "Something went wrong"
            );
          },
          onFinally() {
            formikHelpers.setSubmitting(false);
          },
          onSuccess() {
            if (closeModal) {
              router.reload();
            } else {
              window.location.replace("/");
            }
          },
        },
        values
      )
    );
  }

  const { name: websiteName } = useAppSelector((state) => state.setup.website);

  return (
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
        Velkommen til {websiteName || "Dinengros"}
      </H3>
      <H5
        fontWeight="600"
        fontSize="12px"
        color="gray.800"
        textAlign="center"
        mb="2.25rem"
      >
        Logg inn med e-post og passord
      </H5>

      <TextField
        mb="0.75rem"
        name="email"
        placeholder="exmple@mail.com"
        label="E-post"
        type="email"
        fullwidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email || ""}
        errorText={touched.email && errors.email}
      />
      <TextField
        mb="1rem"
        name="password"
        placeholder="*********"
        autoComplete="on"
        type={passwordVisibility ? "text" : "password"}
        label="Passord"
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
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password || ""}
        errorText={touched.password && errors.password}
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
        Logg inn
      </CustomButton>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Glemt passord?</SemiSpan>
        <Link href="/reset-password">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Tilbakestill den
            </H6>
          </a>
        </Link>
      </FlexBox>
    </form>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default Login;
