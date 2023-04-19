import Avatar from "@component/avatar/Avatar";
import Button from "@component/buttons/Button";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography, { H5, Tiny } from "@component/Typography";
import useCartItem from "@hook/useCartItem";
import { useAppSelector } from "@hook/useRedux";
import { ICartItem } from "interfaces/cart";
import Link from "next/link";
import React from "react";
import NoImage from "../../../public/assets/images/products/no-image.jpg";

interface IProps {
  item: ICartItem;
}

const MiniCartItem = ({ item }: IProps) => {
  const { deleteCartItem, handleQuantityChange, images, totalStock } =
    useCartItem(item);

  const { noProductImage } = useAppSelector((state) => state.setup.images);

  return (
    <>
      <div className="cart-item">
        <FlexBox alignItems="center" flexDirection="column">
          <Button
            variant="outlined"
            color="primary"
            padding="5px"
            size="none"
            borderColor="primary.light"
            borderRadius="300px"
            disabled={item.qty >= 100}
            onClick={() => handleQuantityChange(item.qty + 1)}
          >
            <Icon variant="small">plus</Icon>
          </Button>
          <Typography fontWeight={600} fontSize="15px" my="3px">
            {item.qty}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            padding="5px"
            size="none"
            borderColor="primary.light"
            borderRadius="300px"
            onClick={() => handleQuantityChange(item.qty - 1)}
            disabled={item.qty === 1}
          >
            <Icon variant="small">minus</Icon>
          </Button>
        </FlexBox>

        <Avatar
          src={images?.at(0) || noProductImage || NoImage.src}
          mx="1rem"
          imgStyle={{
            objectFit: "contain",
          }}
          alt={item.product.name}
          size={76}
        />

        <div className="product-details">
          <H5 className="title" fontSize="14px">
            {item.product.name}
          </H5>

          <Tiny color="text.muted">
            {item.price.toFixed(2)} Kr x {item.qty}
          </Tiny>
          <Typography
            fontWeight={600}
            fontSize="14px"
            color="primary.main"
            mt="4px"
          >
            {Number(item.qty * item.price).toFixed(2)} Kr
          </Typography>
        </div>

        <Icon
          className="clear-icon"
          size="1rem"
          ml="1.25rem"
          onClick={deleteCartItem}
        >
          close
        </Icon>
      </div>
      <Divider />
    </>
  );
};

export default MiniCartItem;
