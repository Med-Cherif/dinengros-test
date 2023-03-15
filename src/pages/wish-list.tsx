import CheckEmptyList from "@component/common/CheckEmptyList";
import EmptyWishListImage from "@component/common/EmptyWishListImage";
import { useAppSelector } from "@hook/useRedux";
import React from "react";
import Grid from "../components/grid/Grid";
import DashboardLayout from "../components/layout/CustomerDashboardLayout";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import ProductCard1 from "../components/product-cards/ProductCard1";

const WishList = () => {
  const { wishList } = useAppSelector((state) => state.cart);

  return (
    <div>
      <DashboardPageHeader title="Favorite Produkter" iconName="heart_filled" />
      <CheckEmptyList list={wishList} render={<EmptyWishListImage />}>
        <Grid container spacing={6}>
          {wishList.map((item) => (
            <Grid item lg={4} sm={6} xs={12} key={item.id}>
              <ProductCard1 product={item.product} />
            </Grid>
          ))}
        </Grid>
      </CheckEmptyList>
    </div>
  );
};

WishList.layout = DashboardLayout;

export default WishList;
