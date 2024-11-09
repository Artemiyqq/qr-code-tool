import React, { createContext, useState } from "react";
import { qrCodeService } from "../services/qr-code.service";

interface QrCodeScanningContextProps {
    qrCodeValue: string | null;
    setQrCodeValue: (value: string | null) => void;
    scanQrCode: (file: File) => Promise<void>;
}

export const QrCodeScanningContext = createContext<QrCodeScanningContextProps | undefined>(undefined);

export const QrCodeScanningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

    const scanQrCode = async (file: File) => {
        await qrCodeService.scan(file).then(response => setQrCodeValue(response));
    }

    return (
        <QrCodeScanningContext.Provider
            value={{
                qrCodeValue,
                setQrCodeValue,
                scanQrCode,
            }}
        >
            {children}
        </QrCodeScanningContext.Provider>
    );
}
