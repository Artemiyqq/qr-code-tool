import React, { createContext, useState } from "react";
import { QrCodeContentType } from "../enums/qr-code-content-type.enum";

interface QrCodeContextProps {
    qrCodeValue: string;
    setQrCodeValue: (value: string) => void;
    generateQrCode: boolean;
    setGenerateQrCode: (value: boolean) => void;
    qrCodeValueChanged: (value: string) => void;
    qrCodeContentType: QrCodeContentType;
    setQrCodeContentType: (value: QrCodeContentType) => void;
}

export const QrCodeContext = createContext<QrCodeContextProps | undefined>(undefined);

export const QrCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children} ) => {
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [generateQrCode, setGenerateQrCode] = useState(false);
    const [qrCodeContentType, setQrCodeContentType] = useState<QrCodeContentType>(QrCodeContentType.Text);

    const qrCodeValueChanged = (newValue: string) => {
        setGenerateQrCode(false);
        setQrCodeValue(newValue);
    }

    return (
        <QrCodeContext.Provider
            value={{
                qrCodeValue,
                setQrCodeValue,
                generateQrCode,
                setGenerateQrCode,
                qrCodeValueChanged,
                qrCodeContentType,
                setQrCodeContentType
            }}
        >
            {children}
        </QrCodeContext.Provider>
    );
}
