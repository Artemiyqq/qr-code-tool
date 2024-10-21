import { IconButton, Menu, MenuItem } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";
import { qrCodeService } from "../../services/qr-code.service";
import { useQrCode } from "../../hooks/useQrCode";
import { QrCodeFileType } from "./qr-code-file-type.enum";

const DownloadQrCode = () => {
    const { qrCodeValue } = useQrCode() ?? { qrCodeValue: "" };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRequestDownload = async (fileType: QrCodeFileType) => {
        const response = fileType === QrCodeFileType.PNG ?
            await qrCodeService.generatePng(qrCodeValue) :
            await qrCodeService.generateSvg(qrCodeValue);

        return response.data;
    };

    const handleDownloadClick = async (fileType: QrCodeFileType) => {
        const data = await handleRequestDownload(fileType);
        const blob = new Blob([data], {
            type: fileType === QrCodeFileType.SVG ? "image/svg+xml" : "image/png"
        });
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = `qr-code.${fileType === QrCodeFileType.SVG ? "svg" : "png"}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <>
            <IconButton
                id="download-qr-code"
                aria-haspopup="true"
                aria-controls={isMenuOpen ? "download-qr-code-menu" : undefined}
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={handleMenuClick}
                sx={{ "&:hover": { backgroundColor: "unset" } }}
            >
                <FileDownloadOutlinedIcon
                    sx={{ fontSize: "70px", cursor: "pointer", color: "black" }}
                />
            </IconButton>
            <Menu
                id="download-qr-code-menu"
                aria-labelledby="download-qr-code"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                sx={{ marginLeft: "10px" }}
            >
                <MenuItem onClick={() => handleDownloadClick(QrCodeFileType.SVG)}>as SVG</MenuItem>
                <MenuItem onClick={() => handleDownloadClick(QrCodeFileType.PNG)}>as PNG</MenuItem>
            </Menu>
        </>
    );
};

export default DownloadQrCode;
