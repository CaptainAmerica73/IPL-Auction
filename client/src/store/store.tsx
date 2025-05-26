import { configureStore } from "@reduxjs/toolkit";
import bidReducers from "../slices/bidslice";
import playerReducers from "../slices/playerslice";

export const store = configureStore({
  reducer: {
    bids: bidReducers,
    players: playerReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
