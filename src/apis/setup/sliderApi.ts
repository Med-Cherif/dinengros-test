import { axiosInstance } from 'apis/axios';

export const getSlidersApi = () => {
    return axiosInstance.get('/sliders')
}