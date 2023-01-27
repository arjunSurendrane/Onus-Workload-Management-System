import { createSlice } from "@reduxjs/toolkit";
import axios from "../../api/index";

const INITIAL_STATE = {
    user: {

    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        create: (state, data) => {

        },
        registerUser: (state, data) => {
            state.user = data.payload

        },
        createCookie: () => {

        },
        deleteCookie: () => {

        }
    }
})


export const { create, registerUser, createCookie, deleteCookie } = userSlice.actions
export default userSlice.reducer