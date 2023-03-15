import { format } from "date-fns";
import calculateOrderTotal from "helpers/calculateOrderTotal";
import { IOrderItem } from "interfaces/order";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface OrderRowProps {
  order: IOrderItem;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  const getColor = (status) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Processing":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "secondary";
    }
  };

  return (
    <Link href={"/orders/" + order.id}>
      <TableRow
        as="a"
        href={"/orders/" + order.id}
        my="1rem"
        padding="6px 18px"
      >
        <H5 m="6px" textAlign="left">
          {order?.delivery_type || "Self Get"}
        </H5>
        <Box m="6px">
          <Chip p="0.25rem 1rem" bg={`${getColor(order.status)}.light`}>
            <Small color={`${getColor(order.status)}.main`}>
              {order.status}
            </Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {format(new Date(order.created_at), "MMM dd, yyyy")}
        </Typography>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {format(new Date(order.created_at), "MMM dd, yyyy")}
        </Typography>
        <Typography m="6px" textAlign="left">
          {calculateOrderTotal(order)} Kr
        </Typography>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
