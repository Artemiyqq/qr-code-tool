import { Box, BoxProps } from "@mui/material";

const ContextBox = (props: BoxProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "70%",
                height: "65%",
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0 0 30px 0 rgba(0,0,0,0.2)",
                flexDirection: "column",
                justifyContent: "center",
            }}
            {...props}
        >
            {props.children}
        </Box>
    );
};

export default ContextBox;
