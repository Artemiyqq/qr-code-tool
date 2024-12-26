import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";
import { useAccount } from "../../hooks/useAccount";
import { useAlert } from "../../hooks/useAlert";
import AlertType from "../../enums/alert-type.enum";

const schema = yup.object({
    textForGenerator: yup.string().required('Required'),
}).required();

const QrCodeForm = () => {
    const { qrCodeValueChanged, incrementGenerationCount } = useQrCodeGeneration();
    const { isAuthenticated } = useAccount();
    const { showNewAlert } = useAlert();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        if (!isAuthenticated){
            const canGenerate = incrementGenerationCount();
            if (!canGenerate) {
                showNewAlert('Max QR code generations reached. Please sign in', AlertType.Error);
                return;
            }
        }
        qrCodeValueChanged(data.textForGenerator);
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