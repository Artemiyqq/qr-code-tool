import { Box } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useQrCode } from "../../hooks/useQrCode";
import DownloadQrCode from "./DownloadQrCode";

const GeneratedQrCode = () => {
    const { qrCodeValue: value } = useQrCode() ?? { value: '' };

    return (
        <Box display="flex" justifyContent="center" alignItems="flex-start" pt={5} pl={10}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <QRCodeSVG id="qr-code" value={value} size={300} style={qrCodeStyle} />
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-start">
                <DownloadQrCode />
            </Box>
        </Box>
    );
};

const qrCodeStyle = {
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 0 30px 0 rgba(0,0,0,0.2)",
};

export default GeneratedQrCode;