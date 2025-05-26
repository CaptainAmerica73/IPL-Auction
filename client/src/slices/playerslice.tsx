import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player, Players } from "../interfaces/players";
import axios from "axios";

export const fetchPlayers = createAsyncThunk(
  "players",
  async (page: number = 1) => {
    const res = await axios.get(`http://localhost:3000/players?page=${page}`);
    return { data: res.data, page: page };
  }
);

const initialState: Players = {
  players: [],
  totalPages: 1,
  currentPage: 1,
  isLoading: false,
  error: null,
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchPlayers.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: { players: Player[]; totalPages: number };
          page: number;
        }>
      ) => {
        state.isLoading = false;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.page;
        if (action.payload.page === 1) {
          state.players = action.payload.data.players;
        } else {
          state.players = [...state.players, ...action.payload.data.players];
        }
      }
    );
    builder.addCase(fetchPlayers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to Fetch Data";
    });
  },
});

export default playerSlice.reducer;
