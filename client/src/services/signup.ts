import axios from "axios";
import {axiosInstance} from "./axiosInstance";

export const signup = async (formData: {
    userName: string;
    email: string;
    password: string;
    role: string;
}) => {
    try {
        const response = await axiosInstance.post(
            "http://localhost:3000/auth/signup",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 201) {
            throw new Error(response.data.message || "Failed to sign up");
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                error:
                    error.response?.data?.message || "An error occurred during signup",
            };
        }
    }
};
