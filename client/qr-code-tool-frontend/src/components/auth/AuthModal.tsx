import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import AuthType from "../../enums/auth-type.enum";
import AuthForm from "./AuthForm";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [error, setError] = useState<string | null>(null);
    const [isSignUpForm, setIsSignUpForm] = useState(false);

    const toggleForm = () => setIsSignUpForm(!isSignUpForm);

    const onSubmit = async (data: any, authType: AuthType) => {
        try {
            // TODO: Call the API to sign in
            onClose();
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="sign-in-modal-title"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0 0 30px 0 rgba(0,0,0,0.2)",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography id="sign-in-modal-title" variant="h4">
                    {isSignUpForm ? "Sign Up" : "Sign In"}
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <AuthForm onSubmit={onSubmit} isSignUpForm={isSignUpForm} toggleForm={toggleForm} />
            </Box>
        </Modal>
    );
};

export default AuthModal;