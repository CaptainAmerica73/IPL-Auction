import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../interfaces/users";

const savedUser = sessionStorage.getItem("user") || "";

const initialState: User = savedUser
    ? JSON.parse(savedUser)
    : {
        _id: "",
        role: "user",
        isAuthenticated: false,
        userName: "",
        teamName: "",
        auction: null,
    };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state: User,
            action: PayloadAction<Omit<User, "isAuthenticated">>
        ) => {
            const {_id, userName, role, auction, teamName} = action.payload;
            state._id = _id;
            state.userName = userName;
            state.role = role;
            state.isAuthenticated = true;
            state.auction = auction;
            state.teamName = teamName;

            sessionStorage.setItem("user", JSON.stringify(state));
        },
        addAuctionToUser: (state: User, action: PayloadAction<{ auctionId: string; teamName: string }>) => {
            state.auction = action.payload.auctionId;
            state.teamName = action.payload.teamName;
            sessionStorage.setItem("user", JSON.stringify(state));
        },
        removeAuctionFromUser: (state: User) => {
            state.auction = null;
            state.teamName = "";
            sessionStorage.setItem("user", JSON.stringify(state));
        },
        logout: (state: User) => {
            state._id = "";
            state.userName = "";
            state.role = "user";
            state.teamName = "";
            state.isAuthenticated = false;
            state.auction = null;
            sessionStorage.removeItem("user");
        },
    },
});

export const {setUser, addAuctionToUser, removeAuctionFromUser, logout} = authSlice.actions;
export default authSlice.reducer;
