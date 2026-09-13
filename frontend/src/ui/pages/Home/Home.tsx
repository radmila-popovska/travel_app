import { Box, Button, Stack, Alert, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.tsx';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                background: 'linear-gradient(135deg, #F5F9FF 0%, #EEF4FF 50%, #F8FAFC 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: 6,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1050px',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        overflow: 'hidden',
                        borderRadius: 5,
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 20px 60px rgba(30, 64, 175, 0.10)',
                    }}
                >
                    <Box
                        sx={{
                            px: {
                                xs: 3,
                                sm: 6,
                                md: 9,
                            },
                            py: {
                                xs: 6,
                                md: 9,
                            },
                            textAlign: 'center',
                            background: '#FFFFFF',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 2,
                                py: 0.8,
                                mb: 3,
                                borderRadius: 10,
                                backgroundColor: '#EFF6FF',
                                color: '#2563EB',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                            }}
                        >
                            YOUR NEXT STAY STARTS HERE
                        </Box>

                        <Typography
                            variant="h1"
                            sx={{
                                maxWidth: '850px',
                                mx: 'auto',
                                color: '#172033',
                                mb: 2,
                            }}
                        >
                            Find Your Perfect
                            <Box
                                component="span"
                                sx={{
                                    color: '#2563EB',
                                    display: 'block',
                                }}
                            >
                                Accommodation
                            </Box>
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                maxWidth: '650px',
                                mx: 'auto',
                                color: '#64748B',
                                fontSize: '1.1rem',
                                mb: 5,
                            }}
                        >
                            Discover comfortable places to stay, explore new
                            destinations and book your next trip with ease.
                        </Typography>

                        {isAuthenticated && user && (
                            <Alert
                                severity="success"
                                sx={{
                                    maxWidth: '650px',
                                    mx: 'auto',
                                    mb: 4,
                                    textAlign: 'left',
                                }}
                            >
                                Welcome back, <strong>{user.name}</strong>! You&apos;re
                                logged in as{' '}
                                <strong>
                                    {user.role?.replace('ROLE_', '')}
                                </strong>.
                            </Alert>
                        )}

                        {!isAuthenticated && (
                            <Alert
                                severity="info"
                                sx={{
                                    maxWidth: '650px',
                                    mx: 'auto',
                                    mb: 4,
                                    textAlign: 'left',
                                }}
                            >
                                Sign in to browse and book accommodations, or
                                create a new account to get started.
                            </Alert>
                        )}

                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: {
                                    xs: 'column',
                                    sm: 'row',
                                },
                                gap: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {isAuthenticated ? (
                                <>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() =>
                                            navigate('/accommodations')
                                        }
                                        sx={{
                                            minWidth: {
                                                xs: '100%',
                                                sm: 220,
                                            },
                                            py: 1.5,
                                        }}
                                    >
                                        Browse Accommodations
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate('/hosts')}
                                        sx={{
                                            minWidth: {
                                                xs: '100%',
                                                sm: 180,
                                            },
                                            py: 1.5,
                                        }}
                                    >
                                        Meet Hosts
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() =>
                                            navigate('/countries')
                                        }
                                        sx={{
                                            minWidth: {
                                                xs: '100%',
                                                sm: 190,
                                            },
                                            py: 1.5,
                                        }}
                                    >
                                        Explore Countries
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/login')}
                                        sx={{
                                            minWidth: {
                                                xs: '100%',
                                                sm: 220,
                                            },
                                            py: 1.5,
                                        }}
                                    >
                                        Login to Your Account
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() =>
                                            navigate('/register')
                                        }
                                        sx={{
                                            minWidth: {
                                                xs: '100%',
                                                sm: 220,
                                            },
                                            py: 1.5,
                                        }}
                                    >
                                        Create New Account
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(3, 1fr)',
                            },
                            borderTop: '1px solid #E8ECF3',
                            backgroundColor: '#F8FAFC',
                        }}
                    >
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 3,
                                px: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: '#172033',
                                    mb: 0.5,
                                }}
                            >
                                Find a place
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Browse available accommodations
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 3,
                                px: 2,
                                borderLeft: {
                                    xs: 'none',
                                    sm: '1px solid #E8ECF3',
                                },
                                borderTop: {
                                    xs: '1px solid #E8ECF3',
                                    sm: 'none',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: '#172033',
                                    mb: 0.5,
                                }}
                            >
                                Explore destinations
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Discover countries and new places
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 3,
                                px: 2,
                                borderLeft: {
                                    xs: 'none',
                                    sm: '1px solid #E8ECF3',
                                },
                                borderTop: {
                                    xs: '1px solid #E8ECF3',
                                    sm: 'none',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: '#172033',
                                    mb: 0.5,
                                }}
                            >
                                Book with ease
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Simple and convenient booking
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Home;