import {AxiosError} from "axios";
import {axiosInstance} from "./axiosInstance";

export const enterAuction = async (id: string) => {
    try {
        const response = await axiosInstance.post(`/auctions/enterAuction/${id}`);
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
};
