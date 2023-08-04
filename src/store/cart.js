import { createSlice } from '@reduxjs/toolkit';
const initialCartState = { total: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        setCart(state, action) {
            state.total = action.payload;
        },
        removeCart(state) {
            state.total = 0;
        },
    },
});

export default cartSlice;
