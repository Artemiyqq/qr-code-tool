import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
import { SignInProps } from "../../../types/SignInProps";
import { useAccount } from "../../../hooks/useAccount";
import { SignUpProps } from "../../../types/SignUpProps";
import './auth-modal.css';
import AuthAlertMessages from "../../../enums/auth-alert-messages.enum";
import AlertType from "../../../enums/alert-type.enum";
import { useAlert } from "../../../hooks/useAlert";
import { authService } from "../../../services/account.service";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [error, setError] = useState<string | null>(null);
    const [isSignUpForm, setIsSignUpForm] = useState(false);

    const { showNewAlert } = useAlert();

    const toggleForm = () => {
        setError(null);
        setIsSignUpForm(!isSignUpForm);
    }

    const { signIn } = useAccount();

    const handleSignIn = async (data: any) => {
        try {
            const signInData: SignInProps = {
                email: data.email,
                password: data.password
            };
            await signIn(signInData);
            showNewAlert(AuthAlertMessages.SignInSuccess, AlertType.Success);
            setError(null);
            onClose();
        }
        catch (error: any) {
            setError(error.message);
        }
    };

    const handleSignUp = async (data: any) => {
        try {
            const signUpData: SignUpProps = {
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            }
            await authService.signUp(signUpData);
            showNewAlert(AuthAlertMessages.SignUpSuccess, AlertType.Success);
            setError(null);
            onClose();
        }
        catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="sign-in-modal-title"
            >
                <Box
                    className="auth-box" sx={{ p: 4 }}
                >
                    <Typography id="sign-in-modal-title" variant="h4">
                        {isSignUpForm ? "Sign Up" : "Sign In"}
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {isSignUpForm ? (
                        <SignUpForm toggleForm={toggleForm} handleSignUp={handleSignUp} />
                    ) : (
                        <SignInForm toggleForm={toggleForm} handleSignIn={handleSignIn} />
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default AuthModal;