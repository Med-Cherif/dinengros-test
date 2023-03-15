import { axiosWebInstance } from "apis/axios";

export const getWishListApi = (token: string) => {
    return axiosWebInstance.get('/fav', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const addWishlistItemApi = (id: number |string) => {
    return axiosWebInstance.post('/fav/add', {
        product_id: id
    })
}

export const deleteWishlistItemApi = (id: number) => {
    return axiosWebInstance.delete(`/fav/delete/${id}`)
}