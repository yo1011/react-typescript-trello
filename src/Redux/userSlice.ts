import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";

export const defaultUser: userType = {
    id: "",
    username: "",
    email: "",
    img: "",
    isOnline: false,
    lastSeen: "",
    creationTime: "",
    bio: "",
}

const initialState = {
    // user: [],
    currentUser: defaultUser,
    // currentSelectedUser: null,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;

            // store user in local storage
            localStorage.setItem("current_user", JSON.stringify(user))
            // set logged in user
            state.currentUser = action.payload
        },
        setUsers: (state, action) => {

        },
    }
})

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;