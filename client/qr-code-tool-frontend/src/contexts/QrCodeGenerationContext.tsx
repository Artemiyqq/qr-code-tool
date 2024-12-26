import React, { createContext, useState } from "react";
import { QrCodeContentType } from "../enums/qr-code-content-type.enum";

interface QrCodeGenerationContextProps {
    qrCodeValue: string | null;
    setQrCodeValue: (value: string | null) => void;
    qrCodeValueChanged: (value: string) => void;
    qrCodeContentType: QrCodeContentType;
    setQrCodeContentType: (value: QrCodeContentType) => void;
    incrementGenerationCount: () => boolean;
}

export const QrCodeGenerationContext = createContext<QrCodeGenerationContextProps | undefined>(undefined);

export const QrCodeGenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
    const [qrCodeContentType, setQrCodeContentType] = useState<QrCodeContentType>(QrCodeContentType.Text);
    
    const MAX_GENERATIONS = 5;
    const STORAGE_KEY = 'qrCodeGenerationCount';

    const [generationCount, setGenerationCount] = useState<number>(() => {
        const storedCount = localStorage.getItem(STORAGE_KEY);
        return storedCount ? parseInt(storedCount, 10) : 0;
    });

    const qrCodeValueChanged = (newValue: string) => {
        setQrCodeValue(newValue);
    };

    const incrementGenerationCount = (): boolean => {
        if (generationCount >= MAX_GENERATIONS) {
            return false;
        }
        const newCount = generationCount + 1;
        setGenerationCount(newCount);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
        return true;
    };

    return (
        <QrCodeGenerationContext.Provider
            value={{
                qrCodeValue,
                setQrCodeValue,
                qrCodeValueChanged,
                qrCodeContentType,
                setQrCodeContentType,
                incrementGenerationCount
            }}
        >
            {children}
        </QrCodeGenerationContext.Provider>
    );
}