import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { QrCodeMode } from "../../enums/qr-code-mode.enum";
import QrCodeGenerator from "../qr-code-generation/QrCodeGenerator";
import ContentBox from "./ContentBox";

const Home = () => {
    const [qrCodeMode, setQrCodeMode] = useState(QrCodeMode.Generate);

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
                    onClick={() => setQrCodeMode(QrCodeMode.Generate)}
                >
                    Generate QR Code
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#fb5255', fontWeight: 'bold' }}
                    disabled={qrCodeMode === QrCodeMode.Scan}
                    onClick={() => setQrCodeMode(QrCodeMode.Scan)}
                >
                    Scan QR Code
                </Button>
            </Box>
            <ContentBox>
                <QrCodeGenerator />
            </ContentBox>
        </Container>
    );
}

export default Home;
