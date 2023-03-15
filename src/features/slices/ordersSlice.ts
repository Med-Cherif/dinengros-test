import { createSlice } from "@reduxjs/toolkit";
import { IOrderItem } from "interfaces/order";

interface IState {
    orders: IOrderItem[]
}

const initialState: IState = {
    orders: []
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getOrders: (state, action) => {
            state.orders = action.payload;
        },
        addNewOrder: (state, action) => {
            state.orders = [
                action.payload,
                ...state.orders
            ]
        }
    },
})

export default ordersSlice.reducer

export const ordersActions = ordersSlice.actions