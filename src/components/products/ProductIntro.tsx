import { Chip } from "@component/Chip";
import CustomButton from "@component/common/CustomButton";
import RenderConditional from "@component/common/RenderConditional";
import Image from "@component/Image";
import FavoriteIcons from "@component/wish-list/FavoriteIcons";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { addItemToCartAction } from "features/actions/cartActions";
import { IProduct } from "interfaces/product";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import { H1, H2, H3, H4, H5, H6, SemiSpan } from "../Typography";
import { StyledProductUnit } from "./ProductUnitsStyle";
import AddToCartButton from "@component/cart/AddToCartButton";
import { ICartItem } from "interfaces/cart";
import ProductCardCart from "@component/product-cards/ProductCardCart";
import ProductDescription from "@component/products/ProductDescription";
import extractPdfFile from "@helpers/extractPdfFile";
import { downloadFile } from "@helpers/downloadFile";

export interface ProductIntroProps {
  imgUrl?: string[];
  product: IProduct;
  handleUnitChange: (unit: any) => void;
  selectedUnit: any;
  price?: number | string;
  inStock?: number | string;
  discountedPrice: number | string;
  cartItem: ICartItem;
  offerPercentage: number | string;
  personalDiscount: boolean;
  toggleDialog?: () => void;
  addProductToCart: (onSuccess?: () => void) => void;
  isLoading: boolean;
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  product,
  handleUnitChange,
  selectedUnit,
  price,
  toggleDialog,
  addProductToCart,
  cartItem,
  isLoading,
  discountedPrice,
  offerPercentage,
  personalDiscount,
}) => {
  const { accessToken } = useAppSelector((state) => state.users);

  const [selectedImage, setSelectedImage] = useState(0);

  const pdfFile = extractPdfFile(product);

  const router = useRouter();

  const { offer_id } = router.query;

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid
          item
          md={6}
          xs={12}
          alignItems="center"
          justifyContent="center"
          style={{
            border: "1px solid rgb(200, 200, 200)",
          }}
        >
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              {accessToken || offer_id ? (
                <>
                  {!!offerPercentage && (
                    <Chip
                      position="absolute"
                      bg="primary.main"
                      color="primary.text"
                      fontSize="13px"
                      fontWeight="600"
                      p="5px 10px"
                      top="20px"
                      left="20px"
                    >
                      {personalDiscount && "For You"} -
                      {Number(offerPercentage).toFixed()}% av
                    </Chip>
                  )}
                </>
              ) : (
                <></>
              )}
              <Image
                // width={300}
                // height={300}
                src={imgUrl[selectedImage]}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: 280,
                }}
              />
            </FlexBox>
            <FlexBox overflow="auto">
              {imgUrl.map((url, ind) => (
                <Box
                  size={70}
                  minWidth={70}
                  bg="white"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  border="1px solid"
                  key={ind}
                  ml={ind === 0 && "auto"}
                  mr={ind === imgUrl.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url} borderRadius="10px" size={40} />
                </Box>
              ))}
            </FlexBox>
          </Box>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #c8c8c8",
              paddingBottom: 8,
            }}
          >
            <FlexBox
              alignItems="center"
              mb="2px"
              // mt={accessToken ? "2.5rem" : "5rem"}
            >
              <H4 fontSize="22px" fontWeight="600" mr="8px">
                {product?.name}
              </H4>
              {accessToken && <FavoriteIcons productID={product?.id} />}
            </FlexBox>
            <ProductDescription description={product?.description} />
          </div>
          <RenderConditional
            when={!!accessToken || !!offer_id}
            render={
              <>
                <Box>
                  <H2 color="primary.main" lineHeight="1">
                    {discountedPrice
                      ? `${discountedPrice} Kr`
                      : price
                      ? `${price} Kr`
                      : ""}
                    {!!discountedPrice && (
                      <SemiSpan
                        color="text.muted"
                        fontWeight="600"
                        ml=".5rem"
                        fontSize="18px"
                      >
                        <del>{price}</del>
                      </SemiSpan>
                    )}
                  </H2>
                  <FlexBox
                    alignItems="center"
                    justifyContent="space-between"
                    mt="12px"
                  >
                    <FlexBox>
                      {product?.units.map((unit) => (
                        <StyledProductUnit
                          selected={selectedUnit?.id === unit.id}
                          onClick={() => handleUnitChange(unit)}
                          key={unit.id}
                        >
                          {unit.name}
                        </StyledProductUnit>
                      ))}
                    </FlexBox>
                    <ProductCardCart
                      addProductToCart={addProductToCart}
                      cartItem={cartItem}
                    />
                  </FlexBox>
                </Box>
              </>
            }
            otherwise={<></>}
          />
          {pdfFile ? (
            <div>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  downloadFile(pdfFile.path, pdfFile.name);
                }}
              >
                Download PDF
              </Button>
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;

/**
 *
 */
