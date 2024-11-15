import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AuthType from "../../enums/auth-type.enum";

const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(8, "Password is too short").required("Required"),
});

interface AuthFormProps {
    onSubmit: (data: any, authType: AuthType) => void;
    isSignUpForm: boolean;
    toggleForm: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isSignUpForm, toggleForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInSchema),
    });
    
    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, isSignUpForm ? AuthType.SignUp : AuthType.SignIn))}>
            <TextField
                sx={{ mt: 2 }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                variant="outlined"
                autoComplete="email"
                fullWidth
            />
            <TextField
                sx={{ mt: 2 }}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                variant="outlined"
                type="password"
                autoComplete="current-password"
                fullWidth
            />
            <Button
                sx={{
                    mt: 2,
                    backgroundColor: "#fb5255",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "white",
                }}
                variant="contained"
                type="submit"
                fullWidth
            >
                SUBMIT
            </Button>
            <Typography
                sx={{ mt: 2, fontSize: "16px", textAlign: "center" }}
            >
                {isSignUpForm ? "Already have an account? " : "Don't have an account? "}
                <Link
                    onClick={toggleForm}
                    underline="hover"
                    color="secondary"
                    sx={{ cursor: "pointer" }}
                >
                    {isSignUpForm ? "Sign In" : "Sign Up"}
                </Link>
            </Typography>
        </form>
    )
}

export default AuthForm;