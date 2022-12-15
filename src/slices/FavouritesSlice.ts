import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Product } from "../types/Types";
import { StateType } from "../types/Types";


const initialState : StateType = {
    products: [
        // {
        //     name: "Paula Watsica",
        //     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
        //     price: "2",
        //     nftName: "velit",
        //     image: "https://loremflickr.com/640/480/abstract",
        //     id: 20
        // },
        // {
        //     name: "Paula Watsica",
        //     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
        //     price: "2",
        //     nftName: "velit",
        //     image: "https://loremflickr.com/640/480/abstract",
        // id: 22
        // }
    ]
};
export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite: (state, action : PayloadAction<Product>) => {
            state.products.push(action.payload);
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