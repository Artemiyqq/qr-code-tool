import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box, Button, Checkbox, FormControl, FormControlLabel,
    FormHelperText, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";

const encryptionTypes = [
    { value: 'WPA3', label: 'WPA3' },
    { value: 'WPA2', label: 'WPA2' },
    { value: 'WPA', label: 'WPA' },
    { value: 'WEP', label: 'WEP' },
]

const schema = yup.object({
    ssid: yup.string().required('Required'),
    password: yup.string().required('Required'),
    encryptionType: yup.string().required('Required'),
    isHidden: yup.boolean(),
})

const QrCodeWifiForm = () => {
    const { qrCodeValueChanged } = useQrCodeGeneration();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        qrCodeValueChanged(`WIFI:S:${data.ssid};T:${data.encryptionType};P:${data.password};H:${data.isHidden};`);
    };

    return (
        <Box component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', justifyContent: 'center', flexDirection: "column" }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                    label="SSID (Name of the Wi-Fi)"
                    {...register("ssid")}
                    error={!!errors.ssid}
                    sx={{ paddingRight: '1%', width: '30%' }}
                />
                <TextField
                    label="Password"
                    {...register("password")}
                    error={!!errors.password}
                    type="password"
                    sx={{ paddingRight: '1%', width: '30%' }}
                    autoComplete="off"
                />
                <FormControl sx={{ width: '15%', paddingRight: '1%' }} error={!!errors.encryptionType}>
                    <InputLabel id="encryption-type-label">Encryption</InputLabel>
                    <Select
                        labelId="encryption-type-label"
                        label="Encryption"
                        defaultValue={encryptionTypes[0].value}
                        {...register('encryptionType')}
                    >
                        {encryptionTypes.map(encryptionType => (
                            <MenuItem key={encryptionType.value} value={encryptionType.value}>
                                {encryptionType.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.encryptionType && <FormHelperText>{errors.encryptionType.message}</FormHelperText>}
                </FormControl>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ height: '55px', backgroundColor: '#fb5255', fontWeight: 'bold' }}>
                    Generate
                </Button>
            </Box>
            <Box sx={{ marginTop: '5px', marginLeft: '5%' }}>
                <FormControlLabel {...register("isHidden")} control={<Checkbox />} label="Is Wi-Fi hidden?" />
            </Box>
        </Box>
    );
}

export default QrCodeWifiForm;