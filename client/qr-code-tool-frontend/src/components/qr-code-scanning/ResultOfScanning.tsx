import { Box, Typography } from "@mui/material";
import { useQrCodeScanning } from "../../hooks/useQrCodeScanning";

const ResultOfScanning = () => {
    const { qrCodeValue } = useQrCodeScanning();
    return (
        <Box
            sx={{
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 0 30px 0 rgba(0,0,0,0.2)",
                height: "100%",
                alignSelf: "center",
                maxWidth: "80%",
                overflow: "auto",
            }}
        >
            <Typography 
                component="h6" 
                gutterBottom 
                sx={{ 
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    width: "100%",
                    maxHeight: "100%",
                }}
            >
                <span style={{ fontSize: "1.8rem", fontWeight: "bold", marginRight: "5px" }}>
                    Result:
                </span>
                <span style={{ fontSize: "1.5rem" }}>
                    {qrCodeValue}
                </span>
            </Typography>
        </Box>
    );
};

export default ResultOfScanning;