import { createContext, useEffect, useState } from "react";
import AlertType from "../enums/alert-type.enum";

interface AlertContextProps {
    alertMessage: string | null;
    alertType: AlertType | null;
    showAlert: boolean;
    showNewAlert: (message: string, type: AlertType) => void
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<AlertType | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const showNewAlert = (message: string, type: AlertType) => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
    }

    return (
        <AlertContext.Provider
            value={{
                alertMessage,
                alertType,
                showAlert,
                showNewAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};