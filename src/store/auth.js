import { createSlice } from '@reduxjs/toolkit';
import decodeToken from 'jwt-decode';

const initialAuthState = {
    access_token: null,
    username: null,
    userId: null,
    expiration: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            const data = decodeToken(action.payload.access_token);
            state.access_token = action.payload.access_token;
            state.userId = data.userId;
            state.expiration = data.exp;
            state.username = data.username;
            state.isAuthenticated = true;
        },
        updateToken(state, action) {
            const data = decodeToken(action.payload);
            state.access_token = action.payload;
            state.expiration = data.exp;
        },
        updateName(state, action) {
            state.username = action.payload;
        },
    },
});

export default authSlice;
