import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import userSlice from "../features/userSlice";

const store = configureStore({
    reducer: {
        userReducer: userSlice
    },
    middleware: [thunkMiddleware],
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch