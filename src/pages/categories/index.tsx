import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductFilterCard from "@component/products/ProductFilterCard";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import React, { useEffect, useRef } from "react";
import useWindowSize from "@hook/useWindowSize";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import DynamicProduct1List from "@component/products/DynamicProduct1List";
import { usePagination } from "@hook/usePagination";
import { getProductsAction } from "features/actions/productActions";
import { useRouter } from "next/router";

const Category = () => {
  const {currentPage, navigateToPage} = usePagination({size: 10});
  const dispatch = useAppDispatch();
  const {products, totalProducts} = useAppSelector(state => state.products);
  const {categories} = useAppSelector(state => state.categories);

  const router = useRouter();

  const nameFromQuery = router.query.name || '';

  const width = useWindowSize();
  const isTablet = width < 1025;

  useEffect(() => {
    dispatch(getProductsAction({page: currentPage, name: nameFromQuery}))
  }, [currentPage])

  useEffect(() => {
    navigateToPage(1);
    dispatch(getProductsAction({page: currentPage, name: nameFromQuery}))
  }, [nameFromQuery])

  return (
    <Box pt="20px">
      <FlexBox
        p="1.25rem"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mb="55px"
        elevation={5}
        as={Card}
      >
        <div>
          <H5>{nameFromQuery ? `søker ${nameFromQuery}` : 'Alle Produkter'}</H5>
          <Paragraph color="text.muted">{totalProducts} Produkter</Paragraph>
        </div>
        <FlexBox alignItems="center" flexWrap="wrap">
          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton size="small">
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard categories={categories}/>
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard categories={categories}/>
        </Hidden>
           <Grid item lg={9} xs={12}>
              <DynamicProduct1List 
                navigateToPage={navigateToPage} 
                currentPage={currentPage}
                products={products}
                totalProducts={totalProducts}
              />
          </Grid>
      </Grid>
    </Box>
  );
};

Category.layout = NavbarLayout;

export default Category;
