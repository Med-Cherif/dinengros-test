import { getAllDiscounts, getAllProducts, getUserDiscounts } from "apis/products/productsApi"
import { productActions } from "features/slices/productsSlice";
import { AppDispatch } from "features/store";

export const getProductsAction = (payload?: any) => async (dispatch: AppDispatch) => {
    try {
        const {data} = await getAllProducts(payload);
        dispatch(productActions.setProducts({products: data.data, total: data.meta.total}))
    } catch (error) {
        console.log(error);
    }
}

export const getNewArrivalsAction = (payload?: any) => async (dispatch: AppDispatch) => {
    try {
        const {data} = await getAllProducts(payload);
        dispatch(productActions.setNewArrivals(data.data))
    } catch (error) {
        console.log(error);
    }
}

export const getAllDiscountsAction = () => async (dispatch: AppDispatch) => {
    try {
        const {data: {data}} = await getAllDiscounts();
        dispatch(productActions.setDiscounts(data))
    } catch (error) {
        console.log(error);
    }
}

export const getUserDiscountsAction = () => async (dispatch: AppDispatch) => {
    try {
        const {data: {data}} = await getUserDiscounts();
        dispatch(productActions.setUserDiscounts(data))
    } catch (error) {
        console.log(error);
    }
}

export const getFeaturedProductsAction = (payload: any) => async (dispatch : AppDispatch) => {
    try {
        const {data: {data}} = await getAllProducts(payload);
        dispatch(productActions.setFeatured(data))
    } catch (error) {
        console.log(error)
    }
}