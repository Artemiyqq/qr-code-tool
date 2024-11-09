import React, { createContext, useState } from "react";
import { QrCodeContentType } from "../enums/qr-code-content-type.enum";

interface QrCodeGenerationContextProps {
    qrCodeValue: string | null;
    setQrCodeValue: (value: string | null) => void;
    qrCodeValueChanged: (value: string) => void;
    qrCodeContentType: QrCodeContentType;
    setQrCodeContentType: (value: QrCodeContentType) => void;
}

export const QrCodeGenerationContext = createContext<QrCodeGenerationContextProps | undefined>(undefined);

export const QrCodeGenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
    const [qrCodeContentType, setQrCodeContentType] = useState<QrCodeContentType>(QrCodeContentType.Text);

    const qrCodeValueChanged = (newValue: string) => {
        setQrCodeValue(newValue);
    }

    return (
        <QrCodeGenerationContext.Provider
            value={{
                qrCodeValue,
                setQrCodeValue,
                qrCodeValueChanged,
                qrCodeContentType,
                setQrCodeContentType
            }}
        >
            {children}
        </QrCodeGenerationContext.Provider>
    );
}
