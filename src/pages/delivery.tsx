import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import CartCalculationCard from "@component/cart/CartCalculationCard";
import CardFooter from "@component/delivery/CardFooter";
import DeliveryMethodCard from "@component/delivery/DeliveryMethodCard";
import GetSelf from "@component/delivery/GetSelf";
import Divider from "@component/Divider";
import { getDeliveryMethods } from "apis/orders/deliveryMethodsApi";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { IDeliveryMethod } from "interfaces/delivery-method";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import * as yup from "yup";
import { ICreateOrder } from "interfaces/order";
import moment from "moment";
import { addNewOrderAction } from "features/actions/ordersActions";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { cartActions } from "features/slices/cartSlice";
import CartNumbers from "@component/cart/CartNumbers";
import FlexBox from "@component/FlexBox";

const initialValues = {
  name: "",
  phone: "",
  street_name: "",
  city: "",
  zip_code: "",
  delivery_date: "",
};

const deliverySchema = yup.object().shape({
  delivery_date: yup.string().required("Delivery Date is Required"),
});

const addressSchema = deliverySchema.shape({
  name: yup.string().required("Required"),
  phone: yup.string().required("Required"),
  street_name: yup.string().required("Required"),
  city: yup.string().required("Required"),
  zip_code: yup.string().required("Required"),
});

interface IProps {
  deliveryMethods: IDeliveryMethod[];
}

const Delivery = ({ deliveryMethods }: IProps) => {
  const dispatch = useAppDispatch();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [calendarDate, setCalendarDate] = useState(undefined);
  const [dateError, setDateError] = useState<string | null>(null);
  const [sameAddress, setSameAddress] = useState(true);

  const { userData } = useAppSelector((state) => state.users);

  const { push } = useRouter();

  const cardRef = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues,
    validationSchema: sameAddress ? deliverySchema : addressSchema,
    onSubmit(values, formikHelpers) {
      formikHelpers.setSubmitting(true);
      const { delivery_date, ...rest } = values;
      const requestBody: ICreateOrder = {
        delivery_type_id: deliveryMethods.find(
          (method) => method.name === selectedMethod
        )?.id as number,
        delivered_at: delivery_date,
      };
      if (!sameAddress) {
        requestBody.address_facturation = rest;
      }

      dispatch(
        addNewOrderAction(
          {
            onError(error) {
              formikHelpers.setSubmitting(false);
            },
            onSuccess(data) {
              dispatch(cartActions.clearCart());
              push(`/orders/${data.id}`);
            },
            onFinally() {},
          },
          requestBody
        )
      );
    },
  });

  const onOrderClick = () => {
    if (selectedMethod === "Get Self") {
      if (!calendarDate) {
        return setDateError("Please Select A Date");
      }
      formik.setSubmitting(true);
      const requestBody: ICreateOrder = {
        delivered_at: moment(new Date(calendarDate)).format("YYYY-MM-DD"),
        delivery_type_id: deliveryMethods.find(
          (method) => method.name === selectedMethod
        )?.id as number,
      };

      dispatch(
        addNewOrderAction(
          {
            onError(error) {
              formik.setSubmitting(false);
            },
            onSuccess(data) {
              dispatch(cartActions.clearCart());
              push(`/orders/${data.id}`);
            },
            onFinally() {
              // console.log("finally");
            },
          },
          requestBody
        )
      );
    } else {
      formik.handleSubmit();
    }
  };

  const selectDeliveryMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const canOrder =
    selectedMethod === "Get Self" ||
    (selectedMethod === "Delivery" && userData?.profile?.region?.id);

  const components = {
    "Get Self": (
      <GetSelf
        date={calendarDate}
        setDate={setCalendarDate}
        error={dateError}
      />
    ),
    Delivery: (
      <CheckoutForm
        sameAddress={sameAddress}
        setSameAddress={setSameAddress}
        formik={formik}
      />
    ),
  };

  useEffect(() => {
    if (!cardRef.current || !selectedMethod) return;
    const y =
      cardRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({
      behavior: "smooth",
      top: y,
    });
  }, [selectedMethod]);

  useEffect(() => {
    if (calendarDate) {
      setDateError(null);
    }
  }, [calendarDate]);

  return (
    <Grid container flexWrap="wrap" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <Grid
          container
          spacing={6}
          style={{
            marginBottom: 20,
          }}
        >
          {deliveryMethods.map((method) => (
            <Grid item key={method.id} xs={12} md={6}>
              <DeliveryMethodCard
                selectDeliveryMethod={() => selectDeliveryMethod(method.name)}
                hoverEffect
                selectedMethod={selectedMethod}
                deliveryMethod={method}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CartNumbers
          afterChildren={
            <FlexBox justifyContent="center" mt="16px">
              <Link href="/cart">
                <Button mb="8px" variant="contained" color="primary" fullwidth>
                  Tilbake til handlekurven
                </Button>
              </Link>
            </FlexBox>
          }
        />
        {/* <Card1>
          <CartCalculationCard />

          <Divider mb="1rem" />

          <Link href="/cart">
            <Button mb="8px" variant="contained" color="primary" fullwidth>
              Tilbake til handlekurven
            </Button>
          </Link>
        </Card1> */}
      </Grid>

      <Grid item xs={12}>
        <div ref={cardRef}>
          {components[selectedMethod] || <></>}
          {canOrder ? (
            <CardFooter
              isLoading={formik.isSubmitting}
              onOrderClick={onOrderClick}
            />
          ) : (
            <></>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

Delivery.layout = CheckoutNavLayout;

export default Delivery;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const token = getCookie("front_token", {
    req: context.req,
    res: context.res,
  });
  if (token) {
    const { data } = await getDeliveryMethods(token as string);
    return {
      props: {
        deliveryMethods: data.data,
      },
    };
  } else {
    return {
      props: {
        deliveryMethods: [],
      },
    };
  }
};
