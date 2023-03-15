import ProductIntro from "@component/products/ProductIntro";
import { IProduct } from "interfaces/product";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Box from "../Box";
import Button from "../buttons/Button";
import Card, { CardProps } from "../Card";
import { Chip } from "../Chip";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Modal from "../modal/Modal";
import { H3, SemiSpan } from "../Typography";
import NoImage from "../../../public/assets/images/products/no-image.jpg";
import { StyledProductUnit } from "@component/products/ProductUnitsStyle";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { getProductInfo } from "helpers/getProductInfo";
import { extractProductImages } from "helpers/extractProductImages";
import { StyledProductCard1 } from "@component/product-cards/ProductCardStyle";
import { deleteWishListItemAction } from "features/actions/wishListActions";

export interface ProductCard1Props extends CardProps {
  product: IProduct;
  id: number;
}

const WishListItem: React.FC<ProductCard1Props> = ({
  id,
  product,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const cartItem: any = [];

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const [selectedUnit, setSelectedUnit] = useState(product?.units[0]);

  const handleUnitChange = (unit: any) => {
    setSelectedUnit(unit);
  };

  const deleteFromWishlist = () => {
    dispatch(deleteWishListItemAction({}, id));
  };

  const { userData } = useAppSelector((state) => state.users);

  const { noProductImage } = useAppSelector((state) => state.setup.images);

  const { productPrice, discountedPrice, totalStock } = getProductInfo({
    product,
    unit: selectedUnit?.id,
    groupId: userData?.profile?.user_group?.id || 1,
  });
  const images = extractProductImages(product);

  //   console.log("product", product);

  return (
    <StyledProductCard1 {...props}>
      <div className="image-holder">
        {!!product?.has_promo && (
          <Chip
            position="absolute"
            bg="primary.main"
            color="primary.text"
            fontSize="10px"
            fontWeight="600"
            p="5px 10px"
            top="10px"
            left="10px"
          >
            10% off
          </Chip>
        )}

        <FlexBox
          className="extra-icons"
          style={{
            display: "block",
          }}
        >
          {/* <Icon
            color="secondary"
            variant="small"
            mb="0.5rem"
            onClick={toggleDialog}
          >
            eye-alt
          </Icon> */}

          <Icon
            onClick={deleteFromWishlist}
            className="outlined-icon"
            variant="small"
          >
            close
          </Icon>
          {/* <Icon className="favorite-icon" color="primary" variant="small">
              heart-filled
            </Icon> */}
        </FlexBox>

        <Link href={`/product/${product?.id}`}>
          <a>
            <Image
              src={images[0] || noProductImage || NoImage.src}
              layout="responsive"
              alt={product?.name}
              width={100}
              height={100}
            />
          </a>
        </Link>
      </div>
      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/product/${product?.id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  mb="10px"
                  title={product?.name}
                >
                  {product?.name}
                </H3>
              </a>
            </Link>

            <FlexBox alignItems="center" mt="10px">
              <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                ${productPrice || 23}
              </SemiSpan>
              {!product?.has_promo && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del>$255</del>
                </SemiSpan>
              )}
            </FlexBox>

            <FlexBox mt="1rem">
              {product?.units.map((unit) => (
                <StyledProductUnit
                  selected={selectedUnit?.id === unit?.id}
                  onClick={() => handleUnitChange(unit)}
                  key={unit?.id}
                >
                  {unit?.name}
                </StyledProductUnit>
              ))}
            </FlexBox>
          </Box>

          <FlexBox
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
            width="30px"
          >
            {/* <div className="add-cart"> */}
            <Button
              variant="outlined"
              color="primary"
              padding="3px"
              size="none"
              borderColor="primary.light"
              onClick={toggleDialog}
              // onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <SemiSpan color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </SemiSpan>
                <Button
                  variant="outlined"
                  color="primary"
                  padding="3px"
                  size="none"
                  borderColor="primary.light"
                  // onClick={handleCartAmountChange(cartItem?.qty - 1)}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </div>

      <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" position="relative">
          <ProductIntro
            imgUrl={images || [NoImage.src]}
            product={product}
            handleUnitChange={handleUnitChange}
            toggleDialog={toggleDialog}
            selectedUnit={selectedUnit}
            price={productPrice || 23}
            inStock={totalStock}
            // inStock={}
          />
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
            <Icon
              className="close"
              color="primary"
              variant="small"
              onClick={toggleDialog}
            >
              close
            </Icon>
          </Box>
        </Card>
      </Modal>
    </StyledProductCard1>
  );
};

export default WishListItem;
