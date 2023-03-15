import { createSlice } from "@reduxjs/toolkit";


const categoriesSlice = createSlice({
    name: 'products',
    initialState: {
        categories: []
    },

    reducers: {
        setCategories: (state, {payload}: any) => {
            state.categories = payload
        }
    },
})

export const categoryActions = categoriesSlice.actions;

export default categoriesSlice.reducer;
