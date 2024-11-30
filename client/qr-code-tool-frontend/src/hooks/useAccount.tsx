import { useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error('useAccountContext must be used within a AccountProvider');
    } else {
        return context;
    }
}