import { useParams, useNavigate } from 'react-router-dom';
import useAccommodationDetails from '../../../hooks/useAccommodationDetails.ts';
import {
    Box,
    Button,
    Typography,
    Container,
    Paper,
    Chip,
    Divider,
    Fade,
    Grid,
    Avatar
} from '@mui/material';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HotelIcon from '@mui/icons-material/Hotel';
import CategoryIcon from '@mui/icons-material/Category';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';

const AccommodationDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const accommodationId = id ? parseInt(id) : 0;
    const { accommodation, loading, error } = useAccommodationDetails(accommodationId);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <LoadingState message="Loading details..." />
            </Box>
        );
    }

    if (error || !accommodation) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <ErrorState message={error || "Accommodation not found"} />
            </Box>
        );
    }

    const detailsMap = [
        {
            label: 'Category',
            value: accommodation.category,
            icon: <CategoryIcon color="action" />,
        },
        {
            label: 'Number of Rooms',
            value: `${accommodation.numRooms} ${accommodation.numRooms === 1 ? 'room' : 'rooms'}`,
            icon: <HotelIcon color="action" />,
        },
        {
            label: 'Condition',
            value: accommodation.condition,
            icon: <BuildCircleIcon color="action" />,
        },
        {
            label: 'Host ID',
            value: `#${accommodation.hostId}`,
            icon: <PersonIcon color="action" />,
        },
    ];

    return (
        <Fade in timeout={400}>
            <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
                {/* Копче за назад */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/accommodations')}
                    variant="outlined"
                    color="inherit"
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        '&:hover': {
                            bgcolor: 'action.hover',
                            borderColor: 'text.secondary',
                        },
                    }}
                >
                    Back to Accommodations
                </Button>

                {/* Главна картичка со детали */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.04)',
                        background: 'linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%)',
                    }}
                >
                    {/* Хедер на деталниот приказ */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 2,
                            mb: 3
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                color: 'text.primary',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            {accommodation.name}
                        </Typography>

                        <Chip
                            icon={accommodation.rented ? <CancelIcon /> : <CheckCircleIcon />}
                            label={accommodation.rented ? 'Rented' : 'Available'}
                            color={accommodation.rented ? 'error' : 'success'}
                            variant="filled" // <- Променето од "soft" во "filled"
                            sx={{
                                fontWeight: 700,
                                px: 1,
                                py: 0.5,
                                fontSize: '0.875rem',
                                borderRadius: 2,
                            }}
                        />
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {/* Grid со атрибути */}
                    <Grid container spacing={2.5}>
                        {detailsMap.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: {
                                        xs: '100%', // xs: 12 (целосна ширина)
                                        sm: '50%'   // sm: 6 (половина ширина)
                                    }
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        borderRadius: 3,
                                        bgcolor: 'rgba(245, 247, 250, 0.6)',
                                        border: '1px solid',
                                        borderColor: 'rgba(0,0,0,0.03)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                                            bgcolor: 'rgba(245, 247, 250, 0.9)',
                                        }
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: 'background.paper',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                                            width: 44,
                                            height: 44,
                                        }}
                                    >
                                        {item.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.secondary',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 700,
                                                color: 'text.primary',
                                                mt: 0.2
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </Fade>
    );
};

export default AccommodationDetailsPage;