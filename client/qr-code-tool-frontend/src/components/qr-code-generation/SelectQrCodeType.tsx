import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { QrCodeContentType } from "../../enums/qr-code-content-type.enum";
import { useQrCodeGeneration } from "../../hooks/useQrCodeGeneration";

const SelectQrCodeType = () => {
    const { setQrCodeContentType, qrCodeContentType } = useQrCodeGeneration();
    const [wasTypeChanged, setWasTypeChanged] = useState(false);

    const handleTypeChange = (newType: QrCodeContentType) => {
        setWasTypeChanged(true);
        setQrCodeContentType(newType);
    };

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
                defaultValue={qrCodeContentType}
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