import axios from 'axios';
import { IUserLogin, IUserRegister } from './../../interfaces/user.d';
import { axiosWebInstance } from "apis/axios";

export const registerApi = (data: IUserRegister) => {
    return axiosWebInstance.post('/register', data);
}

export const login = (loginData: IUserLogin) => {
    return axiosWebInstance.post('/login', loginData);
}

export const logout = () => {
    return axiosWebInstance.post('/logout');
}

export const getUserDataApi = (token: string) => {
    return axiosWebInstance.get('/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const forgotPasswordApi = (email: string) => {
    return axiosWebInstance.post('/fogrotpassword', {
        email
    });
}

export const resetPasswordApi = (data: any) => {
    return axiosWebInstance.post('/checktoken', data);
}

export const updateUserProfileApi = (data: any) => {
    return axiosWebInstance.post('/profile', data);
}

export const updateUserAddressApi = (data: any) => {
    return axiosWebInstance.post('/addressfacturation', data);
}

export const updateUserPasswordApi = (data: any) => {
    return axiosWebInstance.post('/password', data);
}