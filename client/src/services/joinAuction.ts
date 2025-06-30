import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const joinAuction = async ({
  teamName,
  imageURL,
  auctionId,
  auctionPrivacy,
  password,
}: {
  teamName: string;
  imageURL: string;
  auctionId: string;
  auctionPrivacy: "private" | "public";
  password?: string;
}) => {
  try {
    const response = await axiosInstance.post(
      "/auctions/joinAuction",
      {
        teamName,
        imageURL,
        auctionId,
        ...(auctionPrivacy === "private" ? { password } : {}),
      },
      {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to join auction");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.message || "Failed to join auction",
      };
    }
  }
};
