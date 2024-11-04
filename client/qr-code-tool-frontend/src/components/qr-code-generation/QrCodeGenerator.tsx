import QrCodeForm from "./QrCodeTextForm";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";
import GeneratedQrCodeBox from "./GeneratedQrCodeBox";
import QrCodeWifiForm from "./QrCodeWifiForm";
import { QrCodeContentType } from "../../enums/qr-code-content-type.enum";
import SelectQrCodeType from "./SelectQrCodeType";

const QrCodeGenerator = () => {
    const { generateQrCode, qrCodeContentType } = useQrCodeGeneration() ?? {
        isQrCodeGenerated: false,
        qrCodeValue: '',
    };

    return (
        <>
            <SelectQrCodeType />
            {qrCodeContentType === QrCodeContentType.Text ? <QrCodeForm /> : <QrCodeWifiForm />}
            {generateQrCode && (
                <GeneratedQrCodeBox />
            )}
        </>
    );
};

export default QrCodeGenerator;
