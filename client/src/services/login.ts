import axios from "axios";
import {axiosInstance} from "./axiosInstance";

export const login = async (formData: {
    userName: string;
    password: string;
}) => {
    try {
        const response = await axiosInstance.post(
            "http://localhost:3000/auth/login",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status !== 200) {
            throw new Error(response.data.message || "Failed to log in");
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                error:
                    error.response?.data?.message || "An error occurred during login",
            };
        }
    }
};
