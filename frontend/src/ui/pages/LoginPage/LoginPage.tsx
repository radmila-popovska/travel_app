
import { useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Login } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.tsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.username || !formData.password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            await login(formData.username, formData.password);
            navigate('/accommodations');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Login failed. Please check your credentials.'
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f7fb',
                py: 6
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)'
                    }}
                >
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                backgroundColor: 'primary.main',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.25)'
                            }}
                        >
                            <Login sx={{ fontSize: 30 }} />
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 1
                            }}
                        >
                            Welcome back
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            Sign in to continue to your account
                        </Typography>
                    </Box>

                    {/* Error */}
                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 2
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Form */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2.5
                        }}
                    >
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={isLoading}
                            autoComplete="username"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={isLoading}
                            autoComplete="current-password"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                                edge="end"
                                                disabled={isLoading}
                                                aria-label="toggle password visibility"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showPassword}
                                    onChange={(e) =>
                                        setShowPassword(e.target.checked)
                                    }
                                    disabled={isLoading}
                                />
                            }
                            label="Show password"
                            sx={{
                                mt: -1,
                                color: 'text.secondary'
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            sx={{
                                py: 1.5,
                                mt: 0.5,
                                borderRadius: 2,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow:
                                        '0 6px 16px rgba(25, 118, 210, 0.25)'
                                }
                            }}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Box>

                    {/* Demo credentials */}
                    <Box
                        sx={{
                            mt: 4,
                            p: 2.5,
                            borderRadius: 2,
                            backgroundColor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'grey.200'
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                mb: 1
                            }}
                        >
                            Demo credentials
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Username:{' '}
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                bob_brown
                            </Box>
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Password:{' '}
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                password123
                            </Box>
                        </Typography>
                    </Box>

                    {/* Register */}
                    <Box
                        sx={{
                            mt: 3,
                            pt: 3,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Don't have an account?{' '}
                            <Box
                                component={Link}
                                to="/register"
                                sx={{
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Register here
                            </Box>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
