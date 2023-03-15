import { axiosWebInstance } from "apis/axios";
import { ICreateOrder } from "interfaces/order";

export const getOrdersApi = () => {
    return axiosWebInstance.get('/order')
}

export const getOneOrderApi = (id: number | string, token: string) => {
    return axiosWebInstance.get(`/order/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createOrderApi = (data: ICreateOrder) => {
    return axiosWebInstance.post('/order', data)
}