import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auction, Auctions } from "../interfaces/auctions";
import { axiosInstance } from "../services/axiosInstance";

export const fetchAuctions = createAsyncThunk("auctions", async () => {
  const res = await axiosInstance.get("http://localhost:3000/auctions");
  return res.data;
});

const initialState: Auctions = {
  auctions: [],
  totalAuctions: 0,
  isLoading: false,
  error: null,
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    addAuction: (state, action: PayloadAction<Auction>) => {
      state.auctions.unshift(action.payload);
      state.totalAuctions += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuctions.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAuctions.fulfilled,
      (state, action: PayloadAction<Auction[]>) => {
        state.isLoading = false;
        state.error = null;
        state.auctions = action.payload;
        state.totalAuctions = action.payload.length;
      }
    );
    builder.addCase(fetchAuctions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to Fetch Data";
    });
  },
});

export const { addAuction } = auctionSlice.actions;

export default auctionSlice.reducer;
