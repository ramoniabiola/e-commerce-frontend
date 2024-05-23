import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const { product } = action.payload;
            state.products.push(product);   // Add the new product to the cart
            state.quantity = state.products.length;
            state.total = state.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
        },

        removeFromCart: (state, action) => {
            const { uuid } = action.payload;
            state.products = state.products.filter(product => product.uuid !== uuid);
            state.quantity = state.products.length;
            state.total = state.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        },

        fetchUserCartStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },

        fetchUserCartSuccess: (state, action) => {
            const { products } = action.payload;
            state.products = products;
            state.quantity = products.length;
            state.total = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
            state.isFetching = false;
            state.error = null;
        },
        
        fetchUserCartFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },

        clearCart: (state) => initialState
    },
});

export const { addProductToCart, removeFromCart, fetchUserCartFailure, fetchUserCartSuccess, fetchUserCartStart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
