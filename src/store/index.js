import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
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
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const appReducer = combineReducers({
    auth: authSlice.reducer,
    address: addressSlice.reducer,
    cart: cartSlice.reducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root');
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
