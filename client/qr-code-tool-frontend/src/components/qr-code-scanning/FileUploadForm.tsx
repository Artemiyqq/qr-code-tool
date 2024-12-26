import { Box, Button, Input, Typography } from "@mui/material";
import { useQrCodeScanning } from "../../hooks/useQrCodeScanning";
import { useAccount } from "../../hooks/useAccount";
import AlertType from "../../enums/alert-type.enum";
import { useAlert } from "../../hooks/useAlert";

const FileUploadForm = () => {
    const { scanQrCode, qrCodeValue, incrementScanningCount } = useQrCodeScanning();
    const { isAuthenticated } = useAccount();
    const { showNewAlert } = useAlert();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAuthenticated){
            const canGenerate = incrementScanningCount();
            if (!canGenerate) {
                showNewAlert('Max QR code scannings reached. Please sign in', AlertType.Error);
                return;
            }
        }
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
                <label htmlFor="contained-button-file" style={{ width: "40%", display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        sx={{
                            backgroundColor: "#fb5255",
                            height: "50px",
                            fontWeight: "bold",
                            width: "100%",
                            minWidth: "250px",
                        }}
                    >
                        <Typography variant="h5" sx={{ width: "100%", textAlign: "center" }}>Upload QR CODE</Typography>
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
