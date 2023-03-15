import { getContactInfo, getFooter, getSeo, getSocialMedia, getWebsiteSetup } from "apis/setup/setupApi";
import { setupActions } from "features/slices/setupSlice";
import { AppDispatch } from "features/store";

export const getWebsiteSetupAction = () => async (dispatch: AppDispatch) => {
    
    try {
        const {data: {data}} = await getWebsiteSetup();
        const {data: {data: seoData}} = await getSeo();
        dispatch(setupActions.setWebsiteInfo({
            name: seoData.page_title || 'Din Engros',
            description: seoData.description || '',
            keywords: seoData.keywords || [],
            favIcon: data.fav_icon,
        }))
        dispatch(setupActions.setHeaderInfo({
            logo: data.logo
        }))
        dispatch(setupActions.setImagesInfo({
            noProductImage: data.product_image 
        }))
        dispatch(setupActions.setFooterInfo({
            catalogue: data.catalogue
        }))
    } catch (error) {
        console.log(error);
    }
}

export const getFooterAction = () => async (dispatch: AppDispatch) => {
    try {
        const {data: {data}} = await getFooter();
        dispatch(setupActions.setFooterInfo({
            links: data.links.filter(link => link.type === 'Link'),
            categories: data.links.filter(link => link.type === 'Category'),
            copyright: data.copyright,
            logo: data.logo,
        }))
    } catch (error) {
        console.log(error);
    }
}

export const getSocialMediaAction = () => async (dispatch: AppDispatch) => {
    try {
        const {data: {data}} = await getSocialMedia();
        dispatch(dispatch(setupActions.setFooterInfo({
            socialMedia: data
        })))
    } catch (error) {
        console.log(error);
    }
}

export const getContactInfoAction = () => async (dispatch: AppDispatch) => {
    try {
        const {data: {data}} = await getContactInfo();
        dispatch(dispatch(setupActions.setFooterInfo({
            contactInfo: {
                address: data.address,
                phone: data.phone,
                email: data.email,
            },
            mapInfo: {
                latitude: data.latitude,
                longitude: data.longitude,
            }
        })))
    
    } catch (error) {
        console.log(error);
    }
}