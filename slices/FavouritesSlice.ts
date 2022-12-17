import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { Product } from "../types/Types";
import { StateType } from "../types/Types";


const initialState : StateType = {
    products: []
};
export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite: (state, action : PayloadAction<Product>) => {
            state.products.unshift(action.payload);
        },
        removeFavourite: (state, action : PayloadAction<number>) => {
            state.products = state.products.filter(element => {
                return element.id != action.payload;
            })
        }
    }
})

export const selectAllFavourites = (state : RootState) => {
    return state.favourites.products;
}
export const {
    addFavourite,
    removeFavourite,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;