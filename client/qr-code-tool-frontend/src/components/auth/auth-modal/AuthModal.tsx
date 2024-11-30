import { Alert, Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
import { SignInProps } from "../../../types/SignInProps";
import { useAccount } from "../../../hooks/useAccount";
import { SignUpProps } from "../../../types/SignUpProps";
import './auth-modal.css';
import AuthAlertMessages from "../../../enums/auth-alert-messages.enum";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [error, setError] = useState<string | null>(null);
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const toggleForm = () => {
        setError(null);
        setIsSignUpForm(!isSignUpForm);
    }

    const { signIn, signUp } = useAccount();

    const handleSignIn = async (data: any) => {
        try {
            const signInData: SignInProps = {
                email: data.email,
                password: data.password
            };
            await signIn(signInData);
            setAlertMessage(AuthAlertMessages.SignInSuccess);
            setShowAlert(true);
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
            const responseForAlert = await signUp(signUpData);
            setAlertMessage(responseForAlert);
            setShowAlert(true);
            onClose();
        }
        catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

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
            {showAlert && (
                <Alert severity="success" onClose={() => setShowAlert(false)} variant="filled" className="alert-container">
                    {alertMessage}
                </Alert>
            )}
        </>
    );
};

export default AuthModal;