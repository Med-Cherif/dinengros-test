import React from "react";
import EmptyCartImage from "./EmptyCartImage";

interface IProps {
  children: any;
  list: any[];
  render?: any
}

const CheckEmptyList = ({
  children,
  list,
  render = <EmptyCartImage />,
}: IProps) => {
  return list.length > 0 ? children : render;
};

export default CheckEmptyList;
