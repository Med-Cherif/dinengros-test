import { axiosInstance } from 'apis/axios';

export const getWebsiteSetup = () => {
    return axiosInstance.get('/settings/setup')
}

export const getFooter = () => {
    return axiosInstance.get('/settings/footer')
}

export const getSocialMedia = () => {
    return axiosInstance.get('/settings/social_media')
}

export const getContactInfo = () => {
    return axiosInstance.get('/settings/consult')
}

export const getAbout = () => {
    return axiosInstance.get('/settings/about')
}

export const getSeo = () => {
    return axiosInstance.get('/settings/seo')
}