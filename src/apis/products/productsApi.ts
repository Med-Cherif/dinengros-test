import { axiosInstance, axiosWebInstance } from "apis/axios";

export const getAllProducts = (data?: any) => {
    return axiosInstance.get('/products/filtrage', {
        params: {
            ...data,
            status: 'active',
            issues: "no_issues"
        },
    });
}

export const getOneProduct = (id: string | number) => {
    return axiosInstance.get(`/products/${id}`, {
        params: {
            from: 'client'
        }
    });
}

export const getFavProducts = (id: string | number) => {
    return axiosInstance.get(`/products/${id}`);
}


export const addProductToFav = (id: string | number) => {
    return axiosInstance.post(`/products/${id}`);
}

export const getAllDiscounts = () => {
    return axiosInstance.get('/shop_offers/shop')
}

export const getUserDiscounts = (id?: string | number) => {
    return axiosWebInstance.get(`/user/discount`);
}