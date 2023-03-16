import { useState } from "react";
import FlexBox from "@component/FlexBox";
import Typography, { SemiSpan } from "@component/Typography";
import { extractProductImages } from "@helpers/extractProductImages";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { IProduct } from "interfaces/product";
import NoImage from "../../../public/assets/images/products/no-image.jpg";
import styled from "styled-components";
import { StyledProductUnit } from "@component/products/ProductUnitsStyle";
import { getProductInfo } from "@helpers/getProductInfo";
import Link from "next/link";
import CustomButton from "@component/common/CustomButton";
import Icon from "@component/icon/Icon";
import ProductCardCart from "@component/product-cards/ProductCardCart";
import { useRouter } from "next/router";
import { addItemToCartAction } from "features/actions/cartActions";
import useProduct from "@hook/useProduct";
import AddToCartButton from "@component/cart/AddToCartButton";
import RenderConditional from "@component/common/RenderConditional";
import ProductModal from "@component/products/ProductModal";

const Wrapper = styled.div``;

interface IProps {
  product: IProduct;
  closeSearchBox: () => void;
}

const ProductSearchItem = ({ product, closeSearchBox }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.users);

  const [open, setOpen] = useState(false);

  const {
    productPrice,
    discountedPrice,
    totalStock,
    selectedUnit,
    handleUnitChange,
    cartItem,
    isLoading,
    addProductToCart,
    personalDiscount,
    offerPercentage,
    image,
  } = useProduct({
    product,
  });

  const toggleDialog = () => {
    setOpen((current) => !current);
  };

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="start"
      // mb="8px"
      style={{
        borderBottom: "1px solid #e8e8e8",
        padding: "12px 8px",
      }}
    >
      <FlexBox
        // alignItems="center"
        style={{
          gap: 4,
        }}
      >
        <div
          onClick={toggleDialog}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: 56,
              height: "auto",
            }}
            src={image}
            alt=""
          />
        </div>

        <div>
          <Typography
            fontWeight={600}
            fontSize="14px"
            mx={"0.2rem"}
            style={{
              cursor: "pointer",
            }}
            onClick={toggleDialog}
          >
            {product.name}
          </Typography>

          {accessToken ? (
            discountedPrice ? (
              <>
                <FlexBox alignItems="center" mx={"0.2rem"}>
                  <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                    {discountedPrice && `${discountedPrice} Kr`}
                  </SemiSpan>

                  <SemiSpan color="text.muted" fontWeight="600">
                    <del>{productPrice} Kr</del>
                  </SemiSpan>
                </FlexBox>
              </>
            ) : (
              <Typography
                fontWeight={700}
                color="primary.main"
                fontSize="12px"
                mx={"0.2rem"}
              >
                {productPrice && `${productPrice} Kr`}
              </Typography>
            )
          ) : (
            <></>
          )}

          {accessToken ? (
            <FlexBox>
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
          ) : (
            <></>
          )}
        </div>
      </FlexBox>
      <RenderConditional
        when={!!accessToken}
        render={
          <ProductCardCart
            isLoading={isLoading}
            addProductToCart={addProductToCart}
            cartItem={cartItem}
          />
        }
        otherwise={<></>}
      />

      <ProductModal
        open={open}
        toggle={toggleDialog}
        cartItem={cartItem}
        isLoading={isLoading}
        addProductToCart={addProductToCart}
        imgUrl={[image]}
        product={product}
        handleUnitChange={handleUnitChange}
        toggleDialog={toggleDialog}
        selectedUnit={selectedUnit}
        price={productPrice}
        discountedPrice={discountedPrice}
        personalDiscount={personalDiscount}
        offerPercentage={offerPercentage}
        inStock={totalStock}
      />
    </FlexBox>
  );
};

export default ProductSearchItem;
