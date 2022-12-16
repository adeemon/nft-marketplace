import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer"
import { deflateSync } from "zlib";
import { RootState } from "../store/store";
import { Product } from "../types/Types";
import { StateType } from "../types/Types";

type CartState = StateType & {isOpened: boolean};

const initialState : CartState = {
    products: [],
    isOpened: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action : PayloadAction<Product>) => {
            if (!checkIsContains(current(state.products), action.payload.id)) {
                state.products.push(action.payload);
            }
        },
        removeProduct: (state, action : PayloadAction<number>) => {
            state.products = state.products.filter(element => {
                return element.id != action.payload;
            })
        },
        clearCart: (state) => {
            state.products = [];
        },
        toggleCartWindow: (state, action : PayloadAction<boolean>) => {
            state.isOpened = action.payload;
        },
        createOrder: (state) => {
            console.log('Ordered: ', current(state.products));
            state.products = [];
            state.isOpened = false;
        }
    }
})


export const checkIsContains = (arrayOfObj : Array<Product>, id : number) => {
    let output = false;
    arrayOfObj.forEach((element) => {
        if (element?.id === id) {
            output = true;
        }
    })
    return output;
}

export const selectCartProducts = (state : RootState) => {
    return state.cart.products
}

export const selectCartIsOpened = (state : RootState) => {
    return state.cart.isOpened
}

export const {
    addProductToCart,
    removeProduct,
    clearCart,
    toggleCartWindow,
    createOrder
} = cartSlice.actions;

export default cartSlice.reducer;