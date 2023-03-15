import { axiosInstance } from "apis/axios";

// https://testdinengros.khotwa-tech.com/api/v1/dinengros/settings/policy;

export const getPolicyApi = () => {
    return axiosInstance.get('/settings/policy')
}