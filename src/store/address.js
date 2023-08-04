import { createSlice } from '@reduxjs/toolkit';

const initialAddressState = { address: null, quickAddress: null };

const addressSlice = createSlice({
    name: 'address',
    initialState: initialAddressState,
    reducers: {
        setAddress(state, action) {
            state.address = action.payload;
        },
        setQuickAddress(state, action) {
            state.quickAddress = action.payload;
        },
        removeAddress(state) {
            state.address = null;
            state.quickAddress = null;
        },
    },
});

export default addressSlice;
