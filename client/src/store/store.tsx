import { configureStore } from "@reduxjs/toolkit";
import bidReducers from "../slices/bidslice";
import playerReducers from "../slices/playerslice";
import auctionReducers from "../slices/auctionslice";
import authReducers from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    bids: bidReducers,
    players: playerReducers,
    auctions: auctionReducers,
    auth: authReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
