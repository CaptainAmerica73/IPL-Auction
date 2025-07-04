import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const joinAuction = async ({
  auctionId,
  teamName,
  imageURL,
  password,
  auctionPrivacy,
}: {
  auctionId: string;
  teamName: string;
  imageURL: string;
  password?: string;
  auctionPrivacy: "private" | "public";
}) => {
  console.log("Joining auction with data:", auctionId);

  try {
    const response = await axiosInstance.post("/auctions/joinAuction", {
      teamName,
      imageURL,
      auctionId,
      ...(auctionPrivacy === "private" ? { password } : {}),
    });
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
