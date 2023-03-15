import NoResults from "@component/NoResults";
import { IProduct } from "interfaces/product";
import React from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Pagination from "../pagination/Pagination";
import ProductCard1 from "../product-cards/ProductCard1";
import { SemiSpan } from "../Typography";

export interface ProductCard1ListProps {
  products: IProduct[];
  totalProducts: string | number;
  currentPage: number;
  pageSize: number;
  navigateToPage: (page: number) => void;
}

const ProductCard1List: React.FC<ProductCard1ListProps> = ({
  products,
  currentPage,
  pageSize,
  navigateToPage,
  totalProducts,
}) => {
  return products?.length ? (
    <FlexBox
      flexDirection="column"
      justifyContent="space-between"
      style={{ minHeight: "100vh" }}
    >
      <Grid container spacing={6}>
        {products
          ?.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
          .map((product) => (
            <Grid item md={4} xs={6} key={product.id}>
              <ProductCard1 product={product} />
            </Grid>
          ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan></SemiSpan>
        <Pagination
          pageCount={Math.ceil(+totalProducts / pageSize)}
          onChange={navigateToPage}
          currentPage={currentPage}
        />
      </FlexBox>
    </FlexBox>
  ) : (
    <NoResults />
  );
};

export default ProductCard1List;
