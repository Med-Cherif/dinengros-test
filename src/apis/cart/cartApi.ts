import {axiosWebInstance} from "apis/axios";
import { IAddCartItem } from "interfaces/cart";

export const getCartApi = (token: string) => {
    return axiosWebInstance.get('/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const addItemToCartApi = (data: IAddCartItem) => {
    return axiosWebInstance.post(`/cart`, data);
}

export const updateCartItemApi = (id: number, qty: number) => {
    return axiosWebInstance.patch(`/cart/${id}`, {
        qty
    })
}

export const deleteCartItemApi = (id:number) => {
    return axiosWebInstance.delete(`/cart/${id}`)
}