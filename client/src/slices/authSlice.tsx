import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/users";

const savedUser = sessionStorage.getItem("user") || "";

const initialState: User = savedUser
  ? JSON.parse(savedUser)
  : {
      _id: "",
      role: "user",
      isAuthenticated: false,
      userName: "",
      teamName: "",
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state: User,
      action: PayloadAction<Omit<User, "isAuthenticated" | "teamName">>
    ) => {
      const { _id, userName, role, auctions } = action.payload;
      state._id = _id;
      state.userName = userName;
      state.role = role;
      state.isAuthenticated = true;
      state.auctions = auctions || [];

      sessionStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state: User) => {
      state._id = "";
      state.userName = "";
      state.role = "user";
      state.teamName = "";
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
