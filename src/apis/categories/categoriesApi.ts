import { axiosInstance } from "apis/axios";

export const getAllCategories = () => {
    return axiosInstance.get('/cats', {
        params: {
            from: 'client'
        }
    });
}

export const getOneCategory = (id: string | number) => {
    return axiosInstance.get(`/cats/${id}`, {
        params: {
            from: 'client'
        }
    });
}