import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useHost from '../../../hooks/useHost.ts';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';

const HostDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const hostId = id ? parseInt(id) : 0;
    const { host, loading, error } = useHost(hostId);

    if (loading) {
        return <LoadingState message="Loading host details..." />;
    }

    if (error || !host) {
        return <ErrorState message={error || 'Host not found'} />;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/hosts')}
                sx={{ mb: 3 }}
            >
                Back to Hosts
            </Button>

            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                        {host.name} {host.surname}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Host ID
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {host.id}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Country ID
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {host.countryId}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default HostDetailsPage;