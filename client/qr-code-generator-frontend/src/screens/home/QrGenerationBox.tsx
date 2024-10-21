import { Box } from "@mui/material"
import QrCodeForm from "./QrCodeForm";
import { useQrCode } from "../../hooks/useQrCode";
import GeneratedQrCodeBox from "./GeneratedQrCodeBox";

const QrCodeGenerationBox = () => {
    const { generateQrCode, } = useQrCode() ?? {
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
                <GeneratedQrCodeBox />
            )}
        </Box>
    );
};

export default QrCodeGenerationBox;
