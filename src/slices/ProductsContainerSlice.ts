import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer"
import { useDispatch } from "react-redux";
import { deflateSync } from "zlib";
import { RootState } from "../store/store";
import { Product } from "../types/Types";
import { StateType } from "../types/Types";

type ProductsStateType = StateType & {isFilled : boolean};



const initialState : ProductsStateType = {
    products: [
        // {
        //     name: "Dana Prosacco",
        //     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/96.jpg",
        //     price: "2",
        //     nftName: "officia",
        //     image: "https://loremflickr.com/640/480",
        //     id: 1
        //    },
        //    {
        //     name: "Della Lind",
        //     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/494.jpg",
        //     price: "6",
        //     nftName: "sunt",
        //     image: "https://loremflickr.com/640/480",
        //     id: 2
        //    },
    ],
    isFilled: false,
}

export const productsContainerSlice = createSlice({
    name: 'productsContainer',
    initialState,
    reducers: {
        fillTheState: (state, action : PayloadAction<Array<Product>>) => {
            if (!state.isFilled) {
                state.products = [...state.products, ...action.payload];
                state.isFilled = true;
            }
        },
        removeProduct: (state, action : PayloadAction<number>) => {
            console.log('remove time!')
            console.log(current(state.products));
            state.products = state.products.filter(element => element.id != action.payload);
        },
        addProduct: (state, action : PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
    }
})

export const selectAllProducts = (state : RootState) => {
    return state.productsContainer.products;
}

export const selectIsFiled = (state : RootState) => {
    return state.productsContainer.isFilled;
}

export const {
    removeProduct,
    addProduct,
    fillTheState,
} = productsContainerSlice.actions;
export default productsContainerSlice.reducer;