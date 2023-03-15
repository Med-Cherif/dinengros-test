import React, { useEffect } from "react";
import { getAllDiscountsAction, getProductsAction, getUserDiscountsAction } from "features/actions/productActions";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import {
  getContactInfoAction,
  getFooterAction,
  getSocialMediaAction,
  getWebsiteSetupAction,
} from "features/actions/setupActions";
import { getCategoriesAction } from "features/actions/categoryActions";
import { getCartAction } from "features/actions/cartActions";
import { getWishListAction } from "features/actions/wishListActions";
import Spinner from "./Spinner";

const AppWrapper = ({ children }) => {
  const dispatch = useAppDispatch();
  const { users: {userData}, setup } = useAppSelector((state) => state);

  useEffect(() => {
    // User related
    if (userData.id) {
      dispatch(getCartAction())
      dispatch(getWishListAction())
      dispatch(getUserDiscountsAction());
    }
    // General
    dispatch(getProductsAction());
    dispatch(getCategoriesAction());
    dispatch(getAllDiscountsAction());
    // Website setup
    dispatch(getWebsiteSetupAction());
    dispatch(getFooterAction());
    dispatch(getSocialMediaAction());
    dispatch(getContactInfoAction());
  }, []);

  return (
    <React.Fragment>
      {setup.website.name ? children : 
        <div style={{height: '100vh', display: 'grid', placeItems: 'center'}}>
          <Spinner />
        </div>
      }
    </React.Fragment>
  );
};

export default AppWrapper;
