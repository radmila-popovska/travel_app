import { Box, Container, Typography, Link as MuiLink, Stack, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const linkStyle = {
        color: '#94a3b8',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
        '&:hover': {
            color: '#38bdf8',
            transform: 'translateX(3px)',
        },
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#0f172a',
                color: '#f8fafc',
                pt: { xs: 6, md: 8 },
                pb: 4,
                mt: 'auto',
                borderTop: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.1)'
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr' },
                        gap: 4,
                        mb: 6
                    }}
                >
                    {/* Бренд и Опис */}
                    <Box sx={{ pr: { md: 4 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    bgcolor: 'primary.main',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <HomeWorkRoundedIcon fontSize="small" />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                                Accommodation<span style={{ color: '#38bdf8' }}>Hub</span>
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.7, maxWidth: 320 }}>
                            Simplified property management and reservation system for modern accommodation hosts worldwide.
                        </Typography>
                    </Box>

                    {/* Страници */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Navigation
                        </Typography>
                        <Stack spacing={1.2}>
                            <MuiLink component={Link} to="/accommodations" sx={linkStyle}>
                                Accommodations
                            </MuiLink>
                            <MuiLink component={Link} to="/hosts" sx={linkStyle}>
                                Hosts
                            </MuiLink>
                            <MuiLink component={Link} to="/countries" sx={linkStyle}>
                                Countries
                            </MuiLink>
                        </Stack>
                    </Box>

                    {/* Информации */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Info
                        </Typography>
                        <Stack spacing={1.2}>
                            <MuiLink component={Link} to="#" sx={linkStyle}>
                                About Us
                            </MuiLink>
                            <MuiLink component={Link} to="#" sx={linkStyle}>
                                Contact
                            </MuiLink>
                            <MuiLink component={Link} to="#" sx={linkStyle}>
                                Privacy Policy
                            </MuiLink>
                        </Stack>
                    </Box>

                    {/* Социјални мрежи / Контакт */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Connect
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton
                                size="small"
                                sx={{
                                    color: '#94a3b8',
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    '&:hover': { bgcolor: '#38bdf8', color: '#0f172a' }
                                }}
                            >
                                <EmailRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    color: '#94a3b8',
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    '&:hover': { bgcolor: '#38bdf8', color: '#0f172a' }
                                }}
                            >
                                <LanguageRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    color: '#94a3b8',
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    '&:hover': { bgcolor: '#38bdf8', color: '#0f172a' }
                                }}
                            >
                                <SecurityRoundedIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                        © {currentYear} AccommodationHub. All rights reserved.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                        Built with Material-UI & React
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;