import axios from "axios";
import { SignInProps } from "../types/SignInProps";
import { SignUpProps } from "../types/SignUpProps";

const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/account`;

export const authService = {
    signIn: async (signInData: SignInProps) => {
        try {
            const response = await axios.post(`${API_URL}/sign-in`, signInData);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            else {
                console.error("Error signing in:", error.message);
                throw new Error("An unexpected error occurred.");
            }
        }
    },
    signUp: async (signUpData: SignUpProps) => {
        try {
            return await axios.post(`${API_URL}/sign-up`, signUpData);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            else {
                console.error("Error signing up:", error.message);
                throw new Error("An unexpected error occurred.");
            }
        }
    }
};