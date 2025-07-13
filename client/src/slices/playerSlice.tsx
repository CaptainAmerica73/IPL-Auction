import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player, Players} from "../interfaces/players";
import {axiosInstance} from "../services/axiosInstance";

export const fetchPlayers = createAsyncThunk("players", async () => {
    const res = await axiosInstance.get(`http://localhost:3000/players`);
    return {data: res.data};
});

const initialState: Players = {
    players: [],
    totalPlayers: 0,
    // totalPages: 1,
    // currentPage: 1,
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
                    data: { players: Player[]; totalPlayers: number };
                }>
            ) => {
                state.isLoading = false;
                state.totalPlayers = action.payload.data.totalPlayers;
                // state.totalPages = Math.ceil(action.payload.data.totalPlayers / 10);
                // state.currentPage = 1;
                state.players = action.payload.data.players;
            }
        );
        builder.addCase(fetchPlayers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Failed to Fetch Data";
        });
    },
});

export default playerSlice.reducer;
