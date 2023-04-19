import Box from "@component/Box";
import Image from "@component/Image";
import { ICartItem } from "interfaces/cart";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { SpaceProps } from "styled-system";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import { StyledProductCard7 } from "./ProductCardStyle";
import { getProductInfo } from "helpers/getProductInfo";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import NoImage from "../../../public/assets/images/products/no-image.jpg";
import {
  deleteCartItemAction,
  updateCartItemAction,
} from "features/actions/cartActions";
import { extractProductImages } from "helpers/extractProductImages";
import useCartItem from "@hook/useCartItem";
import FavoriteIcons from "@component/wish-list/FavoriteIcons";

export interface ProductCard7Props {
  item: ICartItem;
}

const ProductCard7: React.FC<ProductCard7Props & SpaceProps> = ({
  item,
  ...props
}) => {
  // const { userData } = useAppSelector((state) => state.users);
  // const dispatch = useAppDispatch();

  // const changeQuantity = (qty: number) => {
  //   dispatch(updateCartItemAction(item.id, qty));
  // };

  // const { totalStock } = getProductInfo(
  //   item.product,
  //   item.unit.id,
  //   userData?.profile?.user_group?.id || 1
  // );

  // const images = extractProductImages(item.product);

  // const handleQuantityChange = (value) => {
  //   if (value < 1 || value > totalStock) return;
  //   changeQuantity(value);
  // };

  // const deleteCartItem = () => {
  //   dispatch(deleteCartItemAction(item.id));
  // };

  const { noProductImage } = useAppSelector((state) => state.setup.images);

  const { deleteCartItem, handleQuantityChange, images, totalStock } =
    useCartItem(item);

  return (
    <StyledProductCard7 {...props}>
      <Image
        src={images[0] || noProductImage || NoImage.src}
        size={140}
        display="block"
        alt={item.product.name}
        style={{
          objectFit: "contain",
        }}
      />
      <FlexBox
        className="product-details"
        flexDirection="column"
        justifyContent="space-between"
        minWidth="0px"
        width="100%"
      >
        <FlexBox
          alignItems="center"
          style={{
            gap: 12,
          }}
        >
          <Typography
            className="title"
            fontWeight="600"
            fontSize="18px"
            // mb="0.5rem"
          >
            {item.product.name}{" "}
          </Typography>

          <FavoriteIcons productID={+item?.product?.id} />
        </FlexBox>
        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            onClick={deleteCartItem}
            padding="4px"
            ml="12px"
            size="small"
          >
            <Icon size="1.25rem">close</Icon>
          </IconButton>
        </Box>

        <FlexBox
          // width="100%"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <FlexBox flexWrap="wrap" alignItems="center">
            <Typography color="gray.600" mr="0.5rem">
              {item.price.toFixed(2)} Kr x {item.qty}
            </Typography>
            <Typography fontWeight={600} color="primary.main" mr="1rem">
              {Number(item.price * item.qty).toFixed(2)} Kr
            </Typography>
          </FlexBox>

          <FlexBox alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              padding="5px"
              size="none"
              borderColor="primary.light"
              disabled={item.qty === 1}
              onClick={() => handleQuantityChange(item.qty - 1)}
            >
              <Icon variant="small">minus</Icon>
            </Button>
            <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
              {item.qty}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              padding="5px"
              size="none"
              borderColor="primary.light"
              onClick={() => handleQuantityChange(item.qty + 1)}
              disabled={item.qty === 100}
            >
              <Icon variant="small">plus</Icon>
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </StyledProductCard7>
  );
};

export default ProductCard7;
