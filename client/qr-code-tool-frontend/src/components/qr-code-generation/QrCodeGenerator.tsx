import { QrCodeContentType } from "../../enums/qr-code-content-type.enum";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";
import GeneratedQrCodeBox from "./GeneratedQrCodeBox";
import QrCodeForm from "./QrCodeTextForm";
import QrCodeWifiForm from "./QrCodeWifiForm";
import SelectQrCodeType from "./SelectQrCodeType";

const QrCodeGenerator = () => {
    const { qrCodeValue, qrCodeContentType } = useQrCodeGeneration();

    return (
        <>
            <SelectQrCodeType />
            {qrCodeContentType === QrCodeContentType.Text ? <QrCodeForm /> : <QrCodeWifiForm />}
            {qrCodeValue && (
                <GeneratedQrCodeBox />
            )}
        </>
    );
};

export default QrCodeGenerator;
