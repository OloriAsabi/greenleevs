import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth'
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
    reducer: {
       auth: authReducer,
    },
    middleware: [thunkMiddleware],
});