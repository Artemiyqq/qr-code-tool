import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import SignIn from "./AuthModal";

const AuthenticationButton = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

    const toogleModal = () => setIsSignInModalOpen(!isSignInModalOpen);

    return (
        <Box>
            <Tooltip
                title="Sign in or sign up to get full access to all features of the QR-code tool."
                slotProps={{ tooltip: { sx: { fontSize: "0.9em" } } }}
            >
                <Button
                    id="account-menu-button"
                    variant="contained"
                    sx={{ height: "50px", fontWeight: "bold", color: "white", fontSize: "1.2em" }}
                    onClick={toogleModal}
                >
                    Sign in or sign up
                </Button>
            </Tooltip>
            <SignIn isOpen={isSignInModalOpen} onClose={toogleModal} />
        </Box>
    );
};

export default AuthenticationButton;