import { Box } from "@mui/material"
import { QRCodeSVG } from "qrcode.react";
import QrCodeForm from "./QrCodeForm";
import { useQrCode } from "../../hooks/useQrCode";

const QrCodeGenerationBox = () => {
    const { generateQrCode, qrCodeValue } = useQrCode() ?? {
        isQrCodeGenerated: false,
        qrCodeValue: '',
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: "70%",
                height: "60%",
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0 0 30px 0 rgba(0,0,0,0.2)",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <QrCodeForm />
            {generateQrCode && (
                <QRCodeSVG
                    value={qrCodeValue}
                    size={300}
                    style={{
                        padding: "20px",
                        borderRadius: "20px",
                        boxShadow: "0 0 30px 0 rgba(0,0,0,0.2)",
                        marginTop: "5%",
                    }}
                />
            )}
        </Box>
    );
};

export default QrCodeGenerationBox;
