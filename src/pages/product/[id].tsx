import { GetServerSideProps } from "next";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductDescription from "@component/products/ProductDescription";
import ProductIntro from "@component/products/ProductIntro";
import { H5 } from "@component/Typography";
import useProduct from "@hook/useProduct";
import { useAppSelector } from "@hook/useRedux";
import { getOneProduct } from "apis/products/productsApi";
import { extractProductImages } from "helpers/extractProductImages";
import { getProductInfo } from "helpers/getProductInfo";
import { IProduct } from "interfaces/product";
import React, { useEffect, useState } from "react";
import NoImage from "../../../public/assets/images/products/no-image.jpg";

interface IProps {
  product: IProduct;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  return {
    notFound: true,
  };
  // try {
  //   const { id } = context.query;
  //   const {
  //     data: { data },
  //   } = await getOneProduct(id as string);
  //   return {
  //     props: {
  //       product: data,
  //     },
  //   };
  // } catch (error) {
  //   return {
  //     notFound: true,
  //   };
  // }
};

const ProductDetails: React.FC<IProps> = ({ product }) => {
  const {
    productPrice,
    discountedPrice,
    totalStock,
    selectedUnit,
    handleUnitChange,
    setSelectedUnit,
    cartItem,
    personalDiscount,
    addProductToCart,
    isLoading,
    image,
    offerPercentage,
  } = useProduct({
    product,
  });

  useEffect(() => {
    if (product) {
      setSelectedUnit(
        product?.units?.find(
          (unit) => unit?.name === "Eske" || unit?.id === 3
        ) || product?.units[0]
      );
    }
  }, [product]);

  return (
    <></>
    // <div>
    //   {product && (
    //     <Box position="relative">
    //       <ProductIntro
    //         addProductToCart={addProductToCart}
    //         isLoading={isLoading}
    //         cartItem={cartItem}
    //         product={product}
    //         imgUrl={[image]}
    //         handleUnitChange={handleUnitChange}
    //         selectedUnit={selectedUnit}
    //         price={productPrice}
    //         inStock={totalStock}
    //         discountedPrice={discountedPrice}
    //         personalDiscount={personalDiscount}
    //         offerPercentage={offerPercentage}
    //       />

    //       <FlexBox
    //         borderBottom="1px solid"
    //         borderColor="gray.400"
    //         mt="40px"
    //         mb="26px"
    //       >
    //         <H5
    //           mr="25px"
    //           p="4px 10px"
    //           color="primary.main"
    //           borderBottom="2px solid"
    //           borderColor="primary.main"
    //         >
    //           Description
    //         </H5>
    //       </FlexBox>

    //       <Box mb="50px">
    //         <ProductDescription description={product?.description} />
    //       </Box>
    //     </Box>
    //   )}
    // </div>
  );
};

ProductDetails.layout = NavbarLayout;

export default ProductDetails;
