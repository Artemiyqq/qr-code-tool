import { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAccount } from "../../hooks/useAccount";

const AccountButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget) };
    const handleMenuClose = () => { setAnchorEl(null) };

    const { signOut } = useAccount();

    return (
        <Box>
            <IconButton
                size="large"
                id="account-menu-button"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{
                    backgroundColor: "#1565C0",
                    color: "white",
                    borderRadius: "10px",
                    "&:hover": {
                        backgroundColor: "rgba(21,101,192,0.8)",
                    },
                    fontSize: "1.5em",
                    fontWeight: "bold"
                }}
            >
                <AccountCircleIcon />
                My Account
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{ sx: { width: '100%' } }}
            >
                <MenuItem onClick={signOut} sx={{ width: '100%', pt: 1 }}>Sign Out</MenuItem>
            </Menu>
        </Box>
    )
}

export default AccountButton;


