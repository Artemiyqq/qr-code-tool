import { Stack } from "@mui/material";
import { useQrCodeScanning } from "../../hooks/useQrCodeScanning";
import ResultOfScanning from "./ResultOfScanning";
import FileUploadForm from "./FileUploadForm";

const QrCodeScanning = () => {
    const { qrCodeValue } = useQrCodeScanning();

    return (
        <Stack spacing={5}>
            <FileUploadForm />
            {qrCodeValue && <ResultOfScanning />}
        </ Stack>
    )
}

export default QrCodeScanning;
