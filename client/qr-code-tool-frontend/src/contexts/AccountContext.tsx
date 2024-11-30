import React, { createContext, useState } from "react";
import { authService } from "../services/account.service";
import { SignInProps } from "../types/SignInProps";
import { SignUpProps } from "../types/SignUpProps";
import AuthAlertMessages from "../enums/auth-alert-messages.enum";

interface AccountContextProps {
    signIn: (signInData: SignInProps) => Promise<void>;
    signUp: (signUpData: SignUpProps) => Promise<string>;
    signOut: () => void;
    accountId: string | null;
    isAuthenticated: boolean;
}

export const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [accountId, setAccountId] = useState<string | null>(null);

    const signIn = async (signInData: SignInProps): Promise<void> => {
        const response = await authService.signIn(signInData);
        setAccountId(response.id);
        setIsAuthenticated(true);
    };

    const signUp = async (signUpData: SignUpProps): Promise<string> => {
        await authService.signUp(signUpData);
        return AuthAlertMessages.SignUpSuccess;
    };

    const signOut = () => {
        setAccountId(null);
        setIsAuthenticated(false);
    };

    return (
        <AccountContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                accountId,
                isAuthenticated,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}
