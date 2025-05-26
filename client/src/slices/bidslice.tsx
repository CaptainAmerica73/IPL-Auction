import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Bids, Bid } from "../interfaces/bids";
import axios from "axios";
import { socket } from "../socket";

export const fetchBids = createAsyncThunk("bids", async (page: number = 1) => {
  const res = await axios.get(`http://localhost:3000/bids?page=${page}`);
  return { data: res.data, page: page };
});

const initialState: Bids = {
  bids: [],
  totalPages: 1,
  currentPage: 1,
  status: "idle",
  isLoading: false,
  error: null,
};

const bidSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {
    addBid: (state, action: PayloadAction<Bid>) => {
      state.bids.unshift(action.payload);
      state.totalPages = Math.ceil(state.bids.length / 10);
      socket.emit("newBid", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBids.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchBids.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: { bids: Bid[]; totalPages: number };
          page: number;
        }>
      ) => {
        state.isLoading = false;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.page;
        if (action.payload.page === 1) {
          state.bids = action.payload.data.bids;
        } else {
          state.bids = [...state.bids, ...action.payload.data.bids];
        }
      }
    );
    builder.addCase(fetchBids.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to Fetch Data";
    });
  },
});

export const { addBid } = bidSlice.actions;
export default bidSlice.reducer;
