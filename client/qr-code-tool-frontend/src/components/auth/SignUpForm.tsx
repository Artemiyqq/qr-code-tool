import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const signUpSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(8, "Password is too short").required("Required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Required'),
});

interface SignUpFormProps {
    toggleForm: () => void;
    handleSignUp: (data: any) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleForm, handleSignUp }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    return (
        <form onSubmit={handleSubmit(data => handleSignUp(data))}>
            <TextField
                sx={{ mt: 2 }}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Name"
                variant="outlined"
                autoComplete="name"
                fullWidth
            />
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
            <TextField
                sx={{ mt: 2 }}
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                label="Confirm Password"
                variant="outlined"
                type="password"
                autoComplete="new-password"
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
                {"Already have an account? "}
                <Link
                    onClick={toggleForm}
                    underline="hover"
                    color="secondary"
                    sx={{ cursor: "pointer" }}
                >
                    Sign In
                </Link>
            </Typography>
        </form>
    )
}

export default SignUpForm;
