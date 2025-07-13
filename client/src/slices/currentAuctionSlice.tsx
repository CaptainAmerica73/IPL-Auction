import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {axiosInstance} from "../services/axiosInstance.ts";
import {PrivateAuction, PublicAuction} from "../interfaces/auctions.tsx";

export const fetchAuctionById = createAsyncThunk(
	"auctionById",
	async (id: string) => {
		try {
			const res = await axiosInstance.get(
				`http://localhost:3000/auctions/${id}`
			);
			return res.data;
		} catch (e) {
			console.log(e instanceof Error ? e.message : "Unknown error");
		}
	}
);

interface currentAuctionState {
	auction: PublicAuction | PrivateAuction | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: currentAuctionState = {
	auction: null,
	isLoading: false,
	error: null,
};

const currentAuctionSlice = createSlice({
	name: "currentAuction",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAuctionById.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			fetchAuctionById.fulfilled,
			(state, action: PayloadAction<PublicAuction | PrivateAuction>) => {
				state.isLoading = false;
				state.auction = action.payload;
			}
		);
		builder.addCase(fetchAuctionById.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message || "Failed to Fetch Data";
		});
	},
});

export default currentAuctionSlice.reducer;
