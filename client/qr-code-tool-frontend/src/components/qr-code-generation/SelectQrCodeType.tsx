import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { QrCodeContentType } from "../../enums/qr-code-content-type.enum";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";
import { useState } from "react";

const SelectQrCodeType = () => {
    const { setQrCodeContentType, setGenerateQrCode } = useQrCodeGeneration() ?? { setQrCodeType: () => { } };
    const [wasTypeChanged, setWasTypeChanged] = useState(false);

    const handleTypeChange = (newType: QrCodeContentType) => {
        setWasTypeChanged(true);
        setQrCodeContentType(newType);
        setGenerateQrCode(false);
    }

    return (
        <FormControl sx={{ marginBottom: '10px', marginLeft: '5%' }}>
            <FormLabel id="radio-buttons-group-label"
                sx={{
                    fontWeight: 'bold', color: 'black', fontSize: 20,
                    visibility: wasTypeChanged ? 'hidden' : 'visible',
                    marginTop: wasTypeChanged ? '0%' : '3%',
                }}>
                Qr Code Content
            </FormLabel>
            <RadioGroup
                row
                name="row-radio-buttons-group"
                defaultValue={QrCodeContentType.Text}
            >
                <FormControlLabel
                    value={QrCodeContentType.Text}
                    control={<Radio />}
                    label="Text/URL/Email"
                    onClick={() => handleTypeChange(QrCodeContentType.Text)}
                />
                <FormControlLabel
                    value={QrCodeContentType.WiFi}
                    control={<Radio />} label="WiFi Network"
                    onClick={() => handleTypeChange(QrCodeContentType.WiFi)}
                />
            </RadioGroup>
        </FormControl>
    );
};

export default SelectQrCodeType;