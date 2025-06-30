import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/users";

const savedUser = sessionStorage.getItem("user") || "";

const initialState: User = savedUser
  ? JSON.parse(savedUser)
  : {
      id: "",
      role: "user",
      isAuthenticated: false,
      userName: "",
      teamName: "",
      auctions: [],
      wallet: "0Cr",
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      const { id, userName, role, teamName, auctions, wallet } = action.payload;
      state.id = id;
      state.userName = userName;
      state.role = role;
      state.teamName = teamName || "";
      state.auctions = auctions || [];
      state.wallet = wallet || "0Cr";
      state.isAuthenticated = true;

      sessionStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state: User) => {
      state.id = "";
      state.userName = "";
      state.role = "user";
      state.teamName = "";
      state.auctions = [];
      state.wallet = "0Cr";
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
