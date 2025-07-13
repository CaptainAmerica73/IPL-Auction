import { configureStore } from "@reduxjs/toolkit";
import bidReducers from "../slices/bidSlice.tsx";
import playerReducers from "../slices/playerSlice.tsx";
import auctionReducers from "../slices/auctionSlice.tsx";
import authReducers from "../slices/authSlice";
import currentAuctionReducers from "../slices/currentAuctionSlice";

export const store = configureStore({
  reducer: {
    bids: bidReducers,
    players: playerReducers,
    auctions: auctionReducers,
    currentAuction: currentAuctionReducers,
    auth: authReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
