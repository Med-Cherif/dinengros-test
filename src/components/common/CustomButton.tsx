import Button, { ButtonProps } from "@component/buttons/Button";
import Spinner from "@component/Spinner";
import React from "react";

import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  SpaceProps,
} from "styled-system";

export type IButtonProps = ColorProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  BackgroundProps &
  BorderProps &
  SpaceProps &
  ButtonProps &
  LayoutProps & {
    isLoading?: boolean;
    children?: React.ReactNode;
  };
const CustomButton = ({ isLoading, children, ...rest }: IButtonProps) => {
  return (
    <Button {...rest} disabled={isLoading}>
      {isLoading ? <Spinner /> : children}
    </Button>
  );
};

export default CustomButton;
