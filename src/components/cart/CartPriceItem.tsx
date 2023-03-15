import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { IObject } from "interfaces/object";
import Link from "next/link";
import React from "react";

interface IProps {
  property: string;
  value: string;
  titleProps?: IObject;
  valueProps?: IObject;
  afterChildren?: JSX.Element;
}

const CartPriceItem = ({
  property,
  value,
  titleProps = {},
  valueProps = {},
  afterChildren,
}: IProps) => {
  return (
    <>
      <FlexBox justifyContent="space-between" alignItems="center">
        <Typography color="gray.600" {...titleProps}>
          {property}:
        </Typography>
        <FlexBox alignItems="flex-end">
          <Typography
            fontSize="16px"
            fontWeight="600"
            lineHeight="1"
            {...valueProps}
          >
            {value} Kr
          </Typography>
        </FlexBox>
      </FlexBox>
      {afterChildren}
    </>
  );
};

export default CartPriceItem;
