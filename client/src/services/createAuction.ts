import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { PrivateAuction, PublicAuction } from "../interfaces/auctions";

export const createAuction = async (
  auctionData: Partial<PrivateAuction | PublicAuction>
) => {
  try {
    const response = await axiosInstance.post(
      "/auctions/createAuction",
      auctionData
    );
    if (response.status !== 201) {
      throw new Error("Failed to create auction");
    }
    console.log("Auction created successfully:", response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.message || "Failed to create auction",
      };
    }
  }
};
