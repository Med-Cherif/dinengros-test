import { RootState } from './../store';
import toastAlert from 'helpers/toastAlert';
import * as wishListApi from './../../apis/cart/wishListApi';
import { IAction } from 'interfaces/actions';
import { AppDispatch } from 'features/store';
import { cartActions } from "features/slices/cartSlice";

export const getWishListAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const {users: {accessToken: token}} = getState();
        const {data: {data}} = await wishListApi.getWishListApi(token as string);
        dispatch(cartActions.getWishlist(data));
    } catch (error) {
        console.log('error')
    }
}

export const toggleWishListItem = (actions: IAction, productID: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { cart: { wishList } } = getState()
    try {
        const exists = wishList.find(item => item.product.id === productID);
        if (exists) {
            await wishListApi.deleteWishlistItemApi(exists.id)
            dispatch(cartActions.deleteWishlistItem(exists.id))
            toastAlert('Product Deleted From Wishlist', 'error');
        } else {
            const { data } = await wishListApi.addWishlistItemApi(productID);
            dispatch(cartActions.addItemToWishlist(data.data));
            toastAlert('Product Added To Wishlist');
        }
    } catch (error) {
        toastAlert('Something went wrong', 'error');
    }
}

export const addItemToWishListAction = (actions: IAction, productID: number | string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await wishListApi.addWishlistItemApi(productID);
        dispatch(cartActions.addItemToWishlist(data.data));
        toastAlert('Product Added To Wishlist');
    } catch (error) {
        
        toastAlert('Something went wrong', 'error');
        // actions.onError(formatError(error));
    } finally {
        // actions.onFinally();
    }
}

export const deleteWishListItemAction = (actions: IAction, itemID: number) => async (dispatch: AppDispatch) => {
    try {
        await wishListApi.deleteWishlistItemApi(itemID)
        dispatch(cartActions.deleteWishlistItem(itemID))
        toastAlert('Product Deleted From Wishlist', 'error');
    } catch {
        toastAlert('Something went wrong', 'error');
    }
}