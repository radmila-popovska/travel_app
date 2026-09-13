import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useCountry from '../../../hooks/useCountry.ts';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';

const CountryDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const countryId = id ? parseInt(id) : 0;
    const { country, loading, error } = useCountry(countryId);

    if (loading) {
        return <LoadingState message="Loading country details..." />;
    }

    if (error || !country) {
        return <ErrorState message={error || 'Country not found'} />;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/countries')}
                sx={{ mb: 3 }}
            >
                Back to Countries
            </Button>

            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                        {country.name}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Country ID
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {country.id}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Continent
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {country.continent}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CountryDetailsPage;