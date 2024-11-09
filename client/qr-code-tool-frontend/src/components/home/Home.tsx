import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { QrCodeMode } from "../../enums/qr-code-mode.enum";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";
import { useQrCodeScanning } from "../../hooks/useQrCodeScanning";
import QrCodeGenerator from "../qr-code-generation/QrCodeGenerator";
import QrCodeScanning from "../qr-code-scanning/QrCodeScanning";
import ContentBox from "./ContentBox";

const Home = () => {
    const [qrCodeMode, setQrCodeMode] = useState(QrCodeMode.Generate);
    const { setQrCodeValue: setQrCodeGenerationValue } = useQrCodeGeneration();
    const { setQrCodeValue: setQrCodeScanningValue } = useQrCodeScanning();

    const changeQrCodeMode = (mode: QrCodeMode) => {
        if (mode === QrCodeMode.Generate) setQrCodeGenerationValue(null);
        if (mode === QrCodeMode.Scan) setQrCodeScanningValue(null);
        setQrCodeMode(mode);
    };

    return (
        <Container sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "column",
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'left', width: "70%", mb: 2, gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#fb5255', height: '50px', fontWeight: 'bold' }}
                    disabled={qrCodeMode === QrCodeMode.Generate}
                    onClick={() => changeQrCodeMode(QrCodeMode.Generate)}
                >
                    Generate QR Code
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#fb5255', fontWeight: 'bold' }}
                    disabled={qrCodeMode === QrCodeMode.Scan}
                    onClick={() => changeQrCodeMode(QrCodeMode.Scan)}
                >
                    Scan QR Code
                </Button>
            </Box>
            <ContentBox>
                {qrCodeMode === QrCodeMode.Scan && <QrCodeScanning />}
                {qrCodeMode === QrCodeMode.Generate && <QrCodeGenerator />}
            </ContentBox>
        </Container>
    );
}

export default Home;
