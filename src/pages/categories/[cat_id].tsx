import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import React, { useCallback, useEffect, useState } from "react";
import useWindowSize from "@hook/useWindowSize";
import { getOneCategory } from "apis/categories/categoriesApi";
import { useRouter } from "next/router";
import { ICategory } from "interfaces/category";
import { IProduct } from "interfaces/product";
import { getGroupProducts } from "helpers/getGroupProducts";
import { useAppSelector } from "@hook/useRedux";
import { getAllProducts } from "apis/products/productsApi";
import { usePagination } from "@hook/usePagination";

const Category = () => {
  const router = useRouter();

  const width = useWindowSize();
  const isTablet = width < 1025;
  const [category, setCategory] = useState<ICategory>(null);
  const [categoryProducts, setCategoryProducts] = useState<IProduct[]>(null);
  const {currentPage, pageSize, navigateToPage} = usePagination({size: 10});

  const {userData} = useAppSelector(state => state.users);

  const {categories} = useAppSelector(state => state.categories);

  const nameFromQuery = router.query.name || '';

  const fetchCategory = async () => {
    const {data: {data: categoryData}} = await getOneCategory(router.query.cat_id as string);
    const {data: {data: productsData}} = await getAllProducts({cat_id: categoryData.id, name: nameFromQuery})
    setCategory(categoryData);
    if (userData) return setCategoryProducts(getGroupProducts(productsData, userData?.profile?.user_group?.id));
    return setCategoryProducts(productsData);
  }

  const filteredProducts = categoryProducts?.filter(prod => prod.name.includes(nameFromQuery as string));

  useEffect(() => {
    navigateToPage(1);
    fetchCategory();
  }, [router.query.cat_id, nameFromQuery])


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
          <H5>{nameFromQuery ? `søker ${nameFromQuery} i ${category?.name}` : `Alle Produkter in ${category?.name}`}</H5>
          <Paragraph color="text.muted">{filteredProducts?.length || 0} Produkter</Paragraph>
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
            <ProductCard1List 
                products={filteredProducts}
                currentPage={currentPage}
                navigateToPage={navigateToPage}
                totalProducts={filteredProducts?.length}
                pageSize={pageSize}
              />
          </Grid>
      </Grid>
    </Box>
  );
};

Category.layout = NavbarLayout;

export default Category;
