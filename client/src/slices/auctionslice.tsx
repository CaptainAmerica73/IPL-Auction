import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Auctions,
  PrivateAuction,
  PublicAuction,
} from "../interfaces/auctions";
import { axiosInstance } from "../services/axiosInstance";
import { Team } from "../interfaces/teams";

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
    addAuction: (
      state,
      action: PayloadAction<PublicAuction | PrivateAuction>
    ) => {
      state.auctions.unshift(action.payload);
      state.totalAuctions += 1;
    },
    addTeamToAuction: (
      state,
      action: PayloadAction<{
        auctionId: string;
        owner: string;
        teamName: string;
        imageURL: string;
        wallet: string;
      }>
    ) => {
      const { auctionId, owner, teamName, imageURL, wallet } = action.payload;

      const auction = state.auctions.find((a) => a._id === auctionId);
      if (auction) {
        const newTeam: Team = {
          teamName,
          owner,
          imageURL,
          wallet,
          players: [],
        };
        auction.teams.push(newTeam);
        auction.currentTeams += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuctions.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAuctions.fulfilled,
      (state, action: PayloadAction<(PublicAuction | PrivateAuction)[]>) => {
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

export const { addAuction, addTeamToAuction } = auctionSlice.actions;

export default auctionSlice.reducer;
