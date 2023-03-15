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
  navigateToPage: (page: number) => void;
}

const DynamicProduct1List: React.FC<ProductCard1ListProps> = ({
  products,
  totalProducts,
  navigateToPage,
  currentPage,
}) => {
  return products.length ? (
    <FlexBox
      flexDirection="column"
      justifyContent="space-between"
      style={{ minHeight: "100vh" }}
    >
      <Grid container spacing={6}>
        {products.map((product) => (
          <Grid item lg={3} md={4} sm={6} xs={6} key={product.id}>
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
        <Pagination
          pageCount={Math.ceil(+totalProducts / 10)}
          currentPage={currentPage}
          onChange={navigateToPage}
        />
      </FlexBox>
    </FlexBox>
  ) : (
    <NoResults />
  );
};

export default DynamicProduct1List;
