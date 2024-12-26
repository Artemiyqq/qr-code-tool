import React, { createContext, useState } from "react";
import { qrCodeService } from "../services/qr-code.service";

interface QrCodeScanningContextProps {
    qrCodeValue: string | null;
    setQrCodeValue: (value: string | null) => void;
    scanQrCode: (file: File) => Promise<void>;
    incrementScanningCount: () => boolean;
}

export const QrCodeScanningContext = createContext<QrCodeScanningContextProps | undefined>(undefined);

export const QrCodeScanningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

    const MAX_SCANNING = 3;
    const STORAGE_KEY = 'qrCodeScanningCount';

    const [scanningCount, setScanningCount] = useState<number>(() => {
            const storedCount = localStorage.getItem(STORAGE_KEY);
            return storedCount ? parseInt(storedCount, 10) : 0;
    });

    const incrementScanningCount = (): boolean => {
        if (scanningCount >= MAX_SCANNING) {
            return false;
        }
        const newCount = scanningCount + 1;
        setScanningCount(newCount);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
        return true;
    };

    const scanQrCode = async (file: File) => {
        await qrCodeService.scan(file).then(response => setQrCodeValue(response));
    }

    return (
        <QrCodeScanningContext.Provider
            value={{
                qrCodeValue,
                setQrCodeValue,
                scanQrCode,
                incrementScanningCount
            }}
        >
            {children}
        </QrCodeScanningContext.Provider>
    );
}
