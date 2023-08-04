import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
    persistStore,
    persistReducer,
    createTransform,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import cartSlice from './cart';
import addressSlice from './address';
import authSlice from './auth';
import localforage from 'localforage';

const persistConfig = {
    key: 'root',
    storage: localforage,
};

const reducers = combineReducers({
    auth: authSlice.reducer,
    address: addressSlice.reducer,
    cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export const authActions = authSlice.actions;
export const addressActions = addressSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
