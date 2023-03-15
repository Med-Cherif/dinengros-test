import { axiosInstance } from "apis/axios";

export const getAllOffers = (token: string) => {
    return axiosInstance.get('/shop_offers?page_size=all', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getSingleOffer = (id: string) => {
    return axiosInstance.get(`/shop_offers/${id}`, {
        params: {
            from: 'client'
        }
    })
} 