import { useState } from 'react';
import { Container, Paper, TextField, Button, Box, Typography, Alert, Stack, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.tsx';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            setError('First name is required');
            return false;
        }
        if (!formData.surname.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setError('Valid email is required');
            return false;
        }
        if (!formData.username.trim()) {
            setError('Username is required');
            return false;
        }
        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        try {
            await register({
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                username: formData.username,
                password: formData.password
            });
            // Navigate to accommodations page on successful registration
            navigate('/accommodations');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Join us to book accommodations
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            label="First Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={isLoading}
                        />
                        <TextField
                            label="Last Name"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={isLoading}
                        />
                    </Stack>

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={isLoading}
                    />

                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={isLoading}
                        helperText="Choose a unique username (at least 3 characters)"
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
                        helperText="At least 6 characters"
                    />

                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={isLoading}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                                disabled={isLoading}
                            />
                        }
                        label="Show password"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ py: 1.5 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </Button>
                </Box>

                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee', textAlign: 'center' }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Box
                            component={Link}
                            to="/login"
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Login here
                        </Box>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;




