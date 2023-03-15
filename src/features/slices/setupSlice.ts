import { createSlice } from "@reduxjs/toolkit";

const setupSlice = createSlice({
    name: 'products',
    initialState: {
        website: {
            name: '',
            favIcon: '',
            description: '',
            keywords: '',
        },
        header: {
            logo: ''
        },
        images: {
            noProductImage: ''
        },
        footer: {
            logo: '',
            links: [],
            categories: [],
            socialMedia: {
                facebook: '',
                whatsapp: '',
                instagram: '',
                twitter: '',
                youtube: ''
            },
            catalogue: {
                
            },
            copyright: '',
            mapInfo: {
                latitude: '',
                longitude: '',
            },
            contactInfo: {
                address: '',
                phone: '',
                email: '',
            }
        }
    },

    reducers: {
        setWebsiteInfo: (state, {payload}) => {
            state.website = {...state.website, ...payload};
        },

        setHeaderInfo: (state, {payload}) => {
            state.header = {...state.header, ...payload};
        },

        setFooterInfo: (state, {payload}) => {
            state.footer = {...state.footer, ...payload};
        },

        setImagesInfo: (state, {payload}) => {
            state.images = {...state.images, ...payload}
        }
    },
})

export const setupActions = setupSlice.actions;

export default setupSlice.reducer;
