import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './Auth/LoginButton';
import Tooltip from '@mui/material/Tooltip';

export default function MenuAppBar() {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();
    const [anchorEl, setAnchorEl] = React.useState(null);

    function LogoutFunc() {
        setAnchorEl(null);
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const homePage = () => {
        setAnchorEl(null);
        window.location = '/'
    }

    return (
        <Box sx={{ flexGrow: 1, margin: 0.5 }}>
            <AppBar position="static" color="success" sx={{ borderRadius: 10 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ChatApp
                    </Typography>
                    {(!isLoading && isAuthenticated) && (
                        <div>
                            <Tooltip title={user.email}>
                                <IconButton
                                    onClick={handleMenu}
                                >
                                    <Avatar alt={user.name} src={user.picture} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => LogoutFunc()}>Logout</MenuItem>
                                <MenuItem onClick={() => homePage()}>Home Page</MenuItem>
                            </Menu>
                        </div>
                    )}

                    {(!isLoading && !isAuthenticated) && (
                        <LoginButton></LoginButton>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}