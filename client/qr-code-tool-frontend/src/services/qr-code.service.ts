import axios from "axios";

const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/text-qr-code`;

export const qrCodeService = {
    generatePng: async (text: string) => {
        try {
            const response = await axios.get(`${API_URL}/generate-png`, {
                params: { text },
                responseType: "arraybuffer",
            });
            return response;
        } catch (error) {
            console.error("Error generating PNG:", error);
            throw error;
        }
    },

    generateSvg: async (text: string) => {
        try {
            const response = await axios.get(`${API_URL}/generate-svg`, {
                params: { text },
                responseType: "arraybuffer",
            });
            return response;
        } catch (error) {
            console.error("Error generating SVG:", error);
            throw error;
        }
    },
};
