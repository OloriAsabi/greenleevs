import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth'

export const store = configureStore({
    reducer: {
       // counter: counterReducer,
       auth: authReducer,

    }
})