import { useContext } from "react";
import { QrCodeScanningContext } from "../contexts/QrCodeScanningContext";

export const useQrCodeScanning = () => {
    const context = useContext(QrCodeScanningContext);
    if (context === undefined) {
        throw new Error('useQrCodeScanning must be used within a QrCodeScanningProvider');
    } else {
        return context;
    }
}