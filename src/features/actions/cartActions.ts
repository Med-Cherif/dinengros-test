import { ICartItem } from "interfaces/cart";
import { RootState } from "features/store";
import toastAlert from "helpers/toastAlert";
import * as cartApis from "./../../apis/cart/cartApi";
import formatError from "helpers/formatError";
import { IAction } from "interfaces/actions";
import { AppDispatch } from "features/store";
import { IAddCartItem } from "./../../interfaces/cart.d";
import { cartActions } from "features/slices/cartSlice";

export const getCartAction =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const {
        users: { accessToken: token },
      } = getState();
      const {
        data: { data },
      } = await cartApis.getCartApi(token as string);
      dispatch(cartActions.getCart(data));
    } catch (error) {
      // console.log('error')
    }
  };

export const addItemToCartAction =
  (actions: IAction, requestBody: IAddCartItem) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { cart } = getState();
    try {
      const { data } = await cartApis.addItemToCartApi(requestBody);
      const item = data.data;
      // console.log({cart, item})
      const existingItem: ICartItem | null = cart.cart.find(
        (product) =>
          product.product.id === item.product.id &&
          product.unit.id === item.unit.id
      );
      if (!existingItem) {
        dispatch(cartActions.addItemToCart(item));
        toastAlert("Product Added To Cart Successfully");
      } else {
        dispatch(
          cartActions.updateCartItem({
            id: item.id,
            qty: item.qty,
          })
        );
        toastAlert("Quantity Added Successfully");
      }
      actions.onSuccess(item);
    } catch (error) {
      actions.onError(formatError(error));
    } finally {
      actions.onFinally();
    }
  };

export const updateCartItemAction =
  (id: number, qty: number) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await cartApis.updateCartItemApi(id, qty);
      dispatch(
        cartActions.updateCartItem({
          id: data.data.id,
          qty: data.data.qty,
        })
      );
      // toastAlert('Quantity Updated Successfully');
    } catch (error) {
      toastAlert("Something went wrong", "error");
    } finally {
    }
  };

export const deleteCartItemAction =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await cartApis.deleteCartItemApi(id);
      dispatch(cartActions.deleteCartItem(id));
      toastAlert("Product Deleted Successfully", "error");
    } catch {
      toastAlert("Something went wrong", "error");
    }
  };
