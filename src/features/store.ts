import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import productsReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice";
import categoriesReducer from './slices/categoriesSlice';
import cartReducer from "./slices/cartSlice";
import setupReducer from "./slices/setupSlice";
import ordersReducer from "./slices/ordersSlice"

const combinedReducer = combineReducers({
  products: productsReducer,
  users: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  setup: setupReducer,
  orders: ordersReducer,
});

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<typeof combinedReducer>;

export const wrapper = createWrapper(makeStore);
