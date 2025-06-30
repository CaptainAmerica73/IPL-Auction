import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Bids, Bid } from "../interfaces/bids";
import { axiosInstance } from "../services/axiosInstance";
import { clientSocket } from "../socket";

export const fetchBids = createAsyncThunk("bids", async () => {
  const res = await axiosInstance.get(`http://localhost:3000/bids`);
  return { data: res.data };
});

const initialState: Bids = {
  bids: [],
  totalPages: 1,
  currentPage: 1,
  totalBids: 0,
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
      clientSocket.emit("newBid", action.payload);
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
          data: { bids: Bid[]; totalBids: number };
        }>
      ) => {
        state.isLoading = false;
        state.totalBids = action.payload.data.totalBids;
        state.totalPages = Math.ceil(action.payload.data.totalBids / 10);
        state.currentPage = 1;
        state.bids = action.payload.data.bids;
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
