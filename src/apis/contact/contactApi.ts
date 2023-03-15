import { axiosInstance } from 'apis/axios';

export const sendContactUsApi = (data: any) => {
    return axiosInstance.post('/shop/contactus', data)
}