import { axiosInstance } from "apis/axios";

export const getDeliveryMethods = (token: string) => {
    return axiosInstance.get('/deliverytypes', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}