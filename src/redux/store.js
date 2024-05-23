import {configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer, 
    FLUSH,
    REHYDRATE, 
    PAUSE, 
    PURGE, 
    REGISTER, 
    PERSIST,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";


const persistConfig = {
    key: "root",
    version: 1,
    storage,
}


const rootReducer = combineReducers({ user: userReducer, cart: cartReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


const persistor = persistStore(store);

export { persistor };