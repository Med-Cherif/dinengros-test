import { GetServerSideProps } from "next";
import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import productDatabase from "@data/product-database";
import useWindowSize from "@hook/useWindowSize";
import { format } from "date-fns";
import useSWR from "swr";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { getOneOrderApi, getOrdersApi } from "apis/orders/ordersApi";
import { IOrderItem, IOrderProduct } from "interfaces/order";
import Link from "next/link";
import getOrderProducts from "helpers/getOrderProducts";
import { getCookie } from "cookies-next";
import calculateOrderTotal, {
  calculateOrderTaxes,
} from "helpers/calculateOrderTotal";
import calculateProductPrice from "helpers/calculateProductPrice";
import { useAppSelector } from "@hook/useRedux";

type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

interface IProps {
  error?: boolean;
  order: IOrderItem;
}

const OrderDetails = ({ order }: IProps) => {
  const { query } = useRouter();

  const { userData } = useAppSelector((state) => state.users);

  // console.log({ order });

  const orderStatus: OrderStatus = "shipping";
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const stepIconList = ["package-box", "truck-1", "delivery"];

  // const order: IOrderItem | null = data?.data as IOrderItem || null

  // console.log({ query });

  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const breakpoint = 350;

  return (
    <div>
      <DashboardPageHeader
        title="Ordre detaljer"
        iconName="bag_filled"
        button={
          <Link href="/orders">
            <Button color="primary" bg="primary.light" px="2rem">
              My Orders
            </Button>
          </Link>
        }
      />
      <Card p="2rem 1.5rem" mb="30px">
        {/* <FlexBox
          flexDirection={width < breakpoint ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          my="2rem"
        >
          {stepIconList.map((item, ind) => (
            <Fragment key={item}>
              <Box position="relative">
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item}
                  </Icon>
                </Avatar>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  bg={ind < statusIndex ? "primary.main" : "gray.300"}
                />
              )}
            </Fragment>
          ))}
        </FlexBox> */}

        <FlexBox
          style={{
            gap: 16,
            flexWrap: "wrap",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            p="0.5rem 1rem"
            borderRadius="300px"
            bg="success.light"
            color="success.main"
            textAlign="center"
          >
            Delivery Type : <b>{order.delivery_type}</b>
          </Typography>
          <Typography
            p="0.5rem 1rem"
            borderRadius="300px"
            bg="primary.light"
            color="primary.main"
            textAlign="center"
          >
            Status : <b>{order.status}</b>
          </Typography>
        </FlexBox>
      </Card>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          {/* <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Order ID:
            </Typography>
            <Typography fontSize="14px">9001997718074513</Typography>
          </FlexBox> */}
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Ordered At
            </Typography>
            <Typography fontSize="14px">
              {/* {format(new Date(order!.created_at), "dd MMM, yyyy")} */}
              {order?.created_at}
            </Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Delivered on:
            </Typography>
            <Typography fontSize="14px">
              {/* {format(new Date(order.delivered_at), "dd MMM, yyyy")} */}
              {order?.delivered_at}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box>
          <TableRow my="8px" padding="6px 18px">
            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Product
            </H5>
            <Box m="6px"></Box>
            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Type
            </H5>
            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Tax
            </H5>
            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Total
            </H5>
          </TableRow>
        </Box>

        <Box>
          {order.items.map((item: IOrderProduct, idx: number) => {
            const tax = item.product?.taxes[0]?.percentage || 0;

            return (
              <TableRow my="8px" padding="6px 18px">
                <Box ml="6px">
                  <H6 my="0px">{item.product.name}</H6>
                  <Typography fontSize="14px" color="text.muted">
                    {item.price} Kr x {item.qty}
                  </Typography>
                </Box>

                <Box m="6px"></Box>
                <Typography className="flex-grow pre" m="6px" textAlign="left">
                  {item.product_unit?.name}
                </Typography>
                <Typography className="flex-grow pre" m="6px" textAlign="left">
                  {tax}%
                </Typography>
                <Typography m="6px" textAlign="left">
                  {Math.round(calculateProductPrice({
                    price: item.price,
                    qty: item.qty,
                    tax,
                  })* 100) / 100}{" "}
                  Kr
                </Typography>
              </TableRow>
            );
          })}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          {order.delivery_type === "Delivery" ? (
            <Card p="20px 30px">
              <H5 mt="0px" mb="14px">
                Delivery Address
              </H5>
              <Paragraph fontSize="14px" my="0px">
                {order.address_facturation ? (
                  <>
                    {order.address_facturation?.name} ,
                    {order.address_facturation?.phone} ,
                    {order.address_facturation.street_name},{" "}
                    {order.address_facturation.city},{" "}
                    {order.address_facturation.zip_code}
                  </>
                ) : (
                  <>
                    {userData?.address_facturation?.name} ,
                    {userData?.address_facturation?.phone} ,
                    {userData?.address_facturation?.street_name},{" "}
                    {userData?.address_facturation?.city},{" "}
                    {userData?.address_facturation?.zip_code}
                  </>
                )}
              </Paragraph>
            </Card>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Total Summary
            </H5>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Subtotal:
              </Typography>
              <H6 my="0px">
                {calculateOrderTotal(order) - calculateOrderTaxes(order)} Kr
              </H6>
            </FlexBox>
            {/* <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Shipping fee:
              </Typography>
              <H6 my="0px">$10</H6>
            </FlexBox> */}
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Taxes:
              </Typography>
              <H6 my="0px">{calculateOrderTaxes(order)} Kr</H6>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Total</H6>
              <H6 my="0px">{calculateOrderTotal(order)} Kr</H6>
            </FlexBox>
            {/* <Typography fontSize="14px">Paid by Credit/Debit Card</Typography> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

OrderDetails.layout = DashboardLayout;

export default OrderDetails;

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const { query, req, res } = ctx;
  const token = getCookie("front_token", {
    req,
    res,
  });

  try {
    const { data } = await getOneOrderApi(query.id as string, token as string);
    return {
      props: {
        order: {
          ...data.data,
        },
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
