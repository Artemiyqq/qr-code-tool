import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";

const schema = yup.object({
    textForGenerator: yup.string().required('Required'),
}).required();

const QrCodeForm = () => {
    const { qrCodeValueChanged, setGenerateQrCode } = useQrCodeGeneration() ?? {
        qrCodeValueChanged: () => { },
        setGenerateQrCode: () => { }
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        qrCodeValueChanged(data.textForGenerator);
        setGenerateQrCode(true);
    };

    return (
        <Box component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            <TextField
                sx={{ width: '77%', marginRight: '1%' }}
                {...register("textForGenerator")}
                label="Enter URL/Plain Text/Email"
                error={!!errors.textForGenerator}
            />
            <Button
                variant="contained"
                type="submit"
                sx={{ height: '55px', backgroundColor: '#fb5255', fontWeight: 'bold' }}>
                Generate
            </Button>
        </Box>
    )
};

export default QrCodeForm;