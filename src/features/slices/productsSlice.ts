import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        newArrivals: [],
        discounts: [],
        totalProducts: '',
        userDiscounts: [],
        featured: []
    },

    reducers: {
        setProducts: (state, {payload}) => {
            state.products = payload.products;
            state.totalProducts = payload.total
        },
        setNewArrivals: (state, {payload}) => {
            state.newArrivals = payload
        },
        setDiscounts: (state, {payload}) => {
            state.discounts = payload;
        },
        setUserDiscounts: (state, {payload}) => {
            state.userDiscounts = payload;
        },
        setFeatured: (state, {payload}) => {
            state.featured = payload;
        }
    },
})

export const productActions = productsSlice.actions;

export default productsSlice.reducer;
