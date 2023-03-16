import Box from "@component/Box";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import Modal from "@component/modal/Modal";
import React from "react";
import ProductIntro, { ProductIntroProps } from "./ProductIntro";

interface IProps extends ProductIntroProps {
  open: boolean;
  toggle: () => void;
}

const ProductModal = ({
  open,
  toggle,
  addProductToCart,
  cartItem,
  discountedPrice,
  handleUnitChange,
  isLoading,
  offerPercentage,
  personalDiscount,
  product,
  selectedUnit,
  imgUrl,
  inStock,
  price,
  toggleDialog,
}: IProps) => {
  return (
    <Modal open={open} onClose={toggle}>
      <Card
        p="2rem"
        position="relative"
        style={{
          width: "100%",
          maxWidth: 750,
          minHeight: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProductIntro
          cartItem={cartItem}
          isLoading={isLoading}
          addProductToCart={addProductToCart}
          imgUrl={imgUrl}
          product={product}
          handleUnitChange={handleUnitChange}
          toggleDialog={toggleDialog}
          selectedUnit={selectedUnit}
          price={price}
          discountedPrice={discountedPrice}
          personalDiscount={personalDiscount}
          offerPercentage={offerPercentage}
          inStock={inStock}
        />
        <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
          <Icon
            className="close"
            color="primary"
            variant="small"
            onClick={toggle}
          >
            close
          </Icon>
        </Box>
      </Card>
    </Modal>
  );
};

export default ProductModal;
