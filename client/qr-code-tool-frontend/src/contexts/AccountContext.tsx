import React, { createContext, useState } from "react";
import { authService } from "../services/account.service";
import { SignInProps } from "../types/SignInProps";

interface AccountContextProps {
    signIn: (signInData: SignInProps) => Promise<void>;
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

    const signOut = () => {
        setAccountId(null);
        setIsAuthenticated(false);
    };

    return (
        <AccountContext.Provider
            value={{
                signIn,
                signOut,
                accountId,
                isAuthenticated,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}
