import { Box, Button, Input, Typography } from "@mui/material";
import { useQrCodeScanning } from "../../hooks/useQrCodeScanning";

const FileUploadForm = () => {
    const { scanQrCode, qrCodeValue } = useQrCodeScanning();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            scanQrCode(file);
        }
    };

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            {!qrCodeValue && (
                <Typography variant="h5" textAlign="center" mb={3} width="80%">
                    Select the file using the button below and the scan result will be displayed automatically
                </Typography>
            )}
            <Box display="flex" alignItems="center" sx={{ width: "100%", justifyContent: "center" }}>
                <Input
                    type="file"
                    sx={{ display: "none" }}
                    id="contained-button-file"
                    inputProps={{ accept: ".png, .jpg" }}
                    onChange={handleChange}
                />
                <label htmlFor="contained-button-file" style={{ width: "40%" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        sx={{
                            backgroundColor: "#fb5255",
                            height: "50px",
                            fontWeight: "bold",
                            width: "100%",
                        }}
                    >
                        <Typography variant="h5">Upload QR CODE</Typography>
                    </Button>
                </label>
            </Box>
            <Typography sx={{ marginTop: "10px", color: "red" }}>
                ONLY PNG AND JPG TYPES SUPPORTED
            </Typography>
        </Box>
    );
};

export default FileUploadForm;
