import { useContext } from "react";
import { QrCodeContext } from "../contexts/QrCodeContext";

export const useQrCode = () => {
    const context = useContext(QrCodeContext);
    if (context === undefined) {
        throw new Error('useQrCodeContext must be used within a QrCodeProvider');
    } else {
        return context;
    }
}