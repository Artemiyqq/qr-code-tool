import { Box } from "@mui/material"
import QrCodeForm from "./QrCodeTextForm";
import { useQrCode } from "../../hooks/useQrCode";
import GeneratedQrCodeBox from "./GeneratedQrCodeBox";
import QrCodeWifiForm from "./QrCodeWifiForm";
import { QrCodeContentType } from "../../enums/qr-code-content-type.enum";
import SelectQrCodeType from "./SelectQrCodeType";

const QrCodeGenerationBox = () => {
    const { generateQrCode, qrCodeContentType } = useQrCode() ?? {
        isQrCodeGenerated: false,
        qrCodeValue: '',
    };

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
            }}>
            <SelectQrCodeType />
            {qrCodeContentType === QrCodeContentType.Text ? <QrCodeForm /> : <QrCodeWifiForm />}
            {generateQrCode && (
                <GeneratedQrCodeBox />
            )}
        </Box>
    );
};

export default QrCodeGenerationBox;
