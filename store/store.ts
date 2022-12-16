import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import productsContainerReducer from "../slices/ProductsContainerSlice";
import favouritesSliceReducer from "../slices/FavouritesSlice";
import cartSliceReducer from "../slices/CartSlice";

const store = configureStore({
    reducer: {
        productsContainer: productsContainerReducer,
        favourites: favouritesSliceReducer,
        cart: cartSliceReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <Return>(
    callback: (state: RootState) => Return
) => {
    return useSelector((state: RootState) => callback(state));
}

export type RootState = ReturnType<typeof store.getState>

export default store;
