import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(8, "Password is too short").required("Required"),
});

interface SignInFormProps {
    toggleForm: () => void;
    handleSignIn: (data: any) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ toggleForm, handleSignIn }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema),
    });

    return (
        <form onSubmit={handleSubmit((data) => handleSignIn(data))}>
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
                Submit
            </Button>
            <Typography
                sx={{ mt: 2, fontSize: "16px", textAlign: "center" }}
            >
                {"Don't have an account? "}
                <Link
                    onClick={toggleForm}
                    underline="hover"
                    color="secondary"
                    sx={{ cursor: "pointer" }}
                >
                    Sign Up
                </Link>
            </Typography>
        </form>
    );
}

export default SignInForm;
