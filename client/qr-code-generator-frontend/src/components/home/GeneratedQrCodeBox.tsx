import { Box } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useQrCode } from "../../hooks/useQrCode";
import DownloadQrCode from "./DownloadQrCode";

const qrCodeStyle = {
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 0 30px 0 rgba(0,0,0,0.2)",
};

const GeneratedQrCode = () => {
    const { qrCodeValue: value } = useQrCode() ?? { value: '' };

    return (
        <Box display="flex" justifyContent="center" pl={11} height="100%">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                <QRCodeSVG id="qr-code" value={value} size={300} style={qrCodeStyle} />
            </Box>
            <Box display="flex" alignItems="center"  pl={1} height="100%">
                <DownloadQrCode />
            </Box>
        </Box>
    );
};

export default GeneratedQrCode;