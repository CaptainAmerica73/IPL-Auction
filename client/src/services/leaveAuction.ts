import {axiosInstance} from "./axiosInstance.ts";
import {AxiosError} from "axios";

export const leaveAuction = async (auctionId: string) => {
    try {
        const response = await axiosInstance.post(`/auctions/leaveAuction/${auctionId}`);
        if (response.status !== 201) {
            throw new Error("Error entering Auction");
        }

        return response.data;
    } catch (error) {
        console.log(error);

        return {
            error:
                error instanceof AxiosError
                    ? error.response?.data.message
                    : "Unknown Error occurred",
        };
    }
}