import { Button, styled, TextField as MuiTextField } from "@mui/material"
import { useQrCode } from "../../hooks/useQrCode";

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
}));

const TextField = styled(MuiTextField)({
    width: '70%',
    borderColor: 'black',
    label: 'black',
    '& .Mui-focused': {
        label: {
            color: 'rgba(0,0,0,0.6) !important',
        },
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0,0,0,0.6) !important',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(0,0,0,0.6) !important',
    },
});

const QrCodeForm = () => {
    const { qrCodeValue, qrCodeValueChanged, setGenerateQrCode } = useQrCode() ?? {
        qrValue: '',
        qrCodeValueChanged: () => { },
        setGenerateQrCode: () => { }
    };

    return (
        <Container>
            <TextField
                id="text-for-generator"
                label="Enter text or URL"
                value={qrCodeValue}
                onChange={(e) => qrCodeValueChanged(e.target.value ?? '')}
            />
            <Button
                variant="contained"
                onClick={() => setGenerateQrCode(true)}
                sx={{ height: '55px', backgroundColor: '#fb5255', fontWeight: 'bold' }}>
                Generate
            </Button>
        </Container>
    )
};

export default QrCodeForm;