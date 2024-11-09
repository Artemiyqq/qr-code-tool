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

    scan: async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(`${API_URL}/scan`, formData);
            console.log(response.data.text);
            return response.data.text;
        } catch (error) {
            console.error("Error scanning QR code:", error);
            throw error;
        }
    },
};
