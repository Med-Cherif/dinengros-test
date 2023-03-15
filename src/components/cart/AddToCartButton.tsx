import CustomButton, { IButtonProps } from "@component/common/CustomButton";
import Icon from "@component/icon/Icon";
import React from "react";

interface IProps extends IButtonProps {
  isLoading: boolean;
}

const AddToCartButton = ({ isLoading, onClick, ...rest }: IProps) => {
  return (
    <CustomButton
      variant="outlined"
      color="primary"
      padding="2px"
      size="none"
      type="button"
      borderColor="primary.light"
      isLoading={isLoading}
      onClick={onClick}
      {...rest}
    >
      <Icon p=".3rem" variant="small">
        shopping-cart
      </Icon>
    </CustomButton>
  );
};

export default AddToCartButton;
