import { useContext } from "react";
import { QrCodeGenerationContext } from "../contexts/QrCodeGenerationContext";

export const useQrCodeGeneration = () => {
    const context = useContext(QrCodeGenerationContext);
    if (context === undefined) {
        throw new Error('useQrCodeContext must be used within a QrCodeGenerationProvider');
    } else {
        return context;
    }
}