import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    name?: string;
    email?: string;
    token?: string;
}

type InitialState = {
    user: User | null;
}

const initialState: InitialState = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    }
});

export default userSlice.reducer;
export const { storeUser, removeUser } = userSlice.actions;
