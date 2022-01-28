import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/fetchUsersAction";


export const store = configureStore({
    reducer: {
        users: usersSlice.reducer
    }
})