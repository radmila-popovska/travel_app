import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Container,
    useMediaQuery,
    useTheme,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    Tooltip
} from '@mui/material';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';

const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Accommodations', path: '/accommodations' },
    { label: 'Hosts', path: '/hosts' },
    { label: 'Countries', path: '/countries' },
    { label: 'Users', path: '/users' },
    { label: 'Reservations', path: '/reservations' },
    { label: 'Statistics', path: '/statistics', adminOnly: true }
];

const Navigation = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { isAuthenticated, logout, user } = useAuth();

    const isAdmin = user?.role === 'ROLE_ADMINISTRATOR';

    const filteredItems = navigationItems.filter(
        item => !item.adminOnly || isAdmin
    );

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMobileOpen(false);
        setMenuAnchor(null);
    };

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const getUserInitials = () => {
        if (!user) return '?';
        const first = user.name?.charAt(0) || '';
        const second = user.surname?.charAt(0) || '';
        return `${first}${second}`.toUpperCase();
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const drawerContent = (
        <Box
            sx={{
                width: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper'
            }}
        >
            {/* Drawer Header */}
            <Box
                sx={{
                    px: 3,
                    py: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                        }}
                    >
                        <HomeWorkRoundedIcon fontSize="small" />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                            Accommodation
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
                            HUB
                        </Typography>
                    </Box>
                </Box>

                <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.secondary' }}>
                    <CloseRoundedIcon />
                </IconButton>
            </Box>

            <Divider sx={{ borderColor: 'divider' }} />

            {/* Navigation Items */}
            <List sx={{ px: 2, py: 2 }}>
                {filteredItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.8 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={active}
                                onClick={handleDrawerToggle}
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1.2,
                                    px: 2,
                                    transition: 'all 0.2s ease',
                                    '&.Mui-selected': {
                                        backgroundColor: '#0f172a',
                                        color: 'white',
                                        fontWeight: 700,
                                        '&:hover': {
                                            backgroundColor: '#1e293b'
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: 'action.hover'
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontWeight: active ? 700 : 500,
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ flex: 1 }} />

            {/* User Section */}
            {isAuthenticated && user ? (
                <>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                backgroundColor: 'rgba(245, 247, 250, 0.8)',
                                border: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 42,
                                    height: 42,
                                    backgroundColor: '#0f172a',
                                    fontWeight: 700,
                                    fontSize: '0.95rem'
                                }}
                            >
                                {getUserInitials()}
                            </Avatar>

                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ fontWeight: 700, color: 'text.primary' }}
                                >
                                    {user.name} {user.surname}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                    {user.role?.replace('ROLE_', '')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ px: 2, pb: 2.5 }}>
                        <ListItemButton
                            onClick={handleLogout}
                            sx={{
                                borderRadius: 2.5,
                                color: 'error.main',
                                py: 1.2,
                                border: '1px solid',
                                borderColor: 'error.light',
                                '&:hover': {
                                    backgroundColor: 'error.50'
                                }
                            }}
                        >
                            <LogoutRoundedIcon sx={{ mr: 1.5, fontSize: 20 }} />
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        Logout
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </Box>
                </>
            ) : (
                <>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Button
                            fullWidth
                            component={Link}
                            to="/login"
                            variant="outlined"
                            startIcon={<LoginRoundedIcon />}
                            onClick={handleDrawerToggle}
                            sx={{
                                mb: 1.5,
                                borderRadius: 2.5,
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            fullWidth
                            component={Link}
                            to="/register"
                            variant="contained"
                            disableElevation
                            startIcon={<PersonAddAlt1RoundedIcon />}
                            onClick={handleDrawerToggle}
                            sx={{
                                borderRadius: 2.5,
                                textTransform: 'none',
                                fontWeight: 700,
                                py: 1,
                                bgcolor: '#0f172a',
                                '&:hover': { bgcolor: '#1e293b' }
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    color: 'text.primary',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.06)'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            minHeight: { xs: 64, md: 72 },
                            justifyContent: 'space-between'
                        }}
                    >
                        {/* Logo */}
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                textTransform: 'none',
                                color: 'text.primary',
                                p: 0,
                                minWidth: 0,
                                '&:hover': { backgroundColor: 'transparent' }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#0f172a',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
                                    }}
                                >
                                    <HomeWorkRoundedIcon fontSize="small" />
                                </Box>

                                <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 800,
                                            lineHeight: 1,
                                            fontSize: '1.05rem',
                                            letterSpacing: '-0.3px'
                                        }}
                                    >
                                        Accommodation
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'primary.main',
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        HUB
                                    </Typography>
                                </Box>
                            </Box>
                        </Button>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                {filteredItems.map((item) => {
                                    const active = isActive(item.path);
                                    return (
                                        <Button
                                            key={item.path}
                                            component={Link}
                                            to={item.path}
                                            sx={{
                                                px: 2,
                                                py: 0.9,
                                                borderRadius: 2.5,
                                                textTransform: 'none',
                                                fontWeight: active ? 700 : 500,
                                                fontSize: '0.9rem',
                                                color: active ? '#0f172a' : 'text.secondary',
                                                backgroundColor: active ? 'rgba(15, 23, 42, 0.06)' : 'transparent',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    backgroundColor: active ? 'rgba(15, 23, 42, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                                                    color: '#0f172a'
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    );
                                })}

                                {/* User Menu / Auth Buttons */}
                                {isAuthenticated && user ? (
                                    <Box sx={{ ml: 2 }}>
                                        <Tooltip title="Account settings">
                                            <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        backgroundColor: '#0f172a',
                                                        fontWeight: 700,
                                                        fontSize: '0.9rem',
                                                        border: '2px solid',
                                                        borderColor: 'divider',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                                    }}
                                                >
                                                    {getUserInitials()}
                                                </Avatar>
                                            </IconButton>
                                        </Tooltip>

                                        <Menu
                                            anchorEl={menuAnchor}
                                            open={Boolean(menuAnchor)}
                                            onClose={handleMenuClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            slotProps={{
                                                paper: {
                                                    elevation: 0,
                                                    sx: {
                                                        mt: 1.5,
                                                        minWidth: 220,
                                                        borderRadius: 3,
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                                        p: 1
                                                    }
                                                }
                                            }}
                                        >
                                            <Box sx={{ px: 2, py: 1.5 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                    {user.name} {user.surname}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                                    {user.role?.replace('ROLE_', '')}
                                                </Typography>
                                            </Box>

                                            <Divider sx={{ my: 1 }} />

                                            <MenuItem
                                                onClick={handleLogout}
                                                sx={{
                                                    color: 'error.main',
                                                    borderRadius: 2,
                                                    fontWeight: 600,
                                                    py: 1
                                                }}
                                            >
                                                <LogoutRoundedIcon sx={{ mr: 1.5, fontSize: 18 }} />
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                                        <Button
                                            component={Link}
                                            to="/login"
                                            startIcon={<LoginRoundedIcon />}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                color: 'text.secondary',
                                                borderRadius: 2.5,
                                                px: 2
                                            }}
                                        >
                                            Login
                                        </Button>

                                        <Button
                                            component={Link}
                                            to="/register"
                                            variant="contained"
                                            disableElevation
                                            startIcon={<PersonAddAlt1RoundedIcon />}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                borderRadius: 2.5,
                                                px: 2.5,
                                                py: 0.9,
                                                bgcolor: '#0f172a',
                                                '&:hover': { bgcolor: '#1e293b' }
                                            }}
                                        >
                                            Register
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <IconButton
                                onClick={handleDrawerToggle}
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 2.5,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    bgcolor: 'background.paper'
                                }}
                            >
                                <MenuRoundedIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                slotProps={{
                    paper: {
                        sx: {
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
                        }
                    }
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Navigation;