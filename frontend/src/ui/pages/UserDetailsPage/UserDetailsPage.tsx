import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useUserDetails from '../../../hooks/useUserDetails.ts';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';

const UserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const userId = id ? parseInt(id) : 0;
    const { user, loading, error } = useUserDetails(userId);

    if (loading) {
        return <LoadingState message="Loading user details..." />;
    }

    if (error || !user) {
        return <ErrorState message={error || 'User not found'} />;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/users')}
                sx={{ mb: 3 }}
            >
                Back to Users
            </Button>

            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                        {user.name} {user.surname}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Username
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {user.username}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Email
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {user.email}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Role
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {user.role}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserDetailsPage;

