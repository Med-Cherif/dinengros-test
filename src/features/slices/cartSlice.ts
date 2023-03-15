import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "interfaces/cart";
import { IWishListItem } from "interfaces/wish-list";

interface IState {
    cart: ICartItem[]
    wishList: IWishListItem[]
}

const initialState: IState = {
    cart: [],
    wishList: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = []
        },
        addItemToCart: (state, action) => {
            // product.id
            // unit.id
            const newItem = action.payload
            
            state.cart = [
                ...state.cart,
                newItem
            ]
            
        },
        updateCartItem: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        qty: action.payload.qty
                    }
                }
                return item;
            })
        },
        deleteCartItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },

        // Wishlist:
        getWishlist: (state, action) => {
            state.wishList = action.payload
        },
        addItemToWishlist: (state, action) => {
            state.wishList = [
                ...state.wishList,
                action.payload
            ]
        },
        deleteWishlistItem: (state, action) => {
            state.wishList = state.wishList.filter(item => item.id !== action.payload)
        }
    },
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
