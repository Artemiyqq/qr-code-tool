import React, { createContext, useState } from "react";

interface QrCodeContextProps {
    qrCodeValue: string;
    setQrValue: (value: string) => void;
    generateQrCode: boolean;
    setGenerateQrCode: (value: boolean) => void;
    qrCodeValueChanged: (value: string) => void;
}

export const QrCodeContext = createContext<QrCodeContextProps | undefined>(undefined);

export const QrCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children} ) => {
    const [qrCodeValue, setQrValue] = useState('');
    const [generateQrCode, setGenerateQrCode] = useState(false);

    const qrCodeValueChanged = (newValue: string) => {
        setGenerateQrCode(false);
        setQrValue(newValue);
    }

    return (
        <QrCodeContext.Provider
            value={{
                qrCodeValue,
                setQrValue,
                generateQrCode,
                setGenerateQrCode,
                qrCodeValueChanged
            }}
        >
            {children}
        </QrCodeContext.Provider>
    );
}
