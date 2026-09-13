import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    IconButton,
    Tooltip,
    Stack
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import CategoryIcon from '@mui/icons-material/Category';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
import type { Accommodation } from '../../api/types/accommodation.ts';

interface AccommodationCardProps {
    accommodation: Accommodation;
    onEdit: (accommodation: Accommodation) => void;
    onDelete: (accommodation: Accommodation) => void;
    canEdit: boolean;
}

const getCategoryImage = (category: string) => {
    switch (category.toUpperCase()) {
        case 'HOUSE':
            return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80';
        case 'MOTEL':
            return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80';
        default:
            return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80';
    }
};

const AccommodationCard = ({ accommodation, onEdit, onDelete, canEdit }: AccommodationCardProps) => {
    const navigate = useNavigate();

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
                    borderColor: 'primary.light',
                },
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="180" // Малку повисока слика за подобра пропорција
                    image={getCategoryImage(accommodation.category)}
                    alt={accommodation.name}
                    sx={{ objectFit: 'cover' }}
                />

                <Chip
                    icon={accommodation.rented ? <CancelRoundedIcon fontSize="small" /> : <CheckCircleRoundedIcon fontSize="small" />}
                    label={accommodation.rented ? 'Rented' : 'Available'}
                    color={accommodation.rented ? 'error' : 'success'}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontWeight: 700,
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                />

                <Chip
                    label={accommodation.category}
                    size="small"
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        bgcolor: 'rgba(15, 23, 42, 0.8)',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.65rem',
                        letterSpacing: '0.5px',
                        backdropFilter: 'blur(4px)',
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                    variant="h6"
                    component="h2"
                    noWrap
                    sx={{ fontWeight: 700, mb: 2, color: 'text.primary', fontSize: '1.1rem' }}
                >
                    {accommodation.name}
                </Typography>

                {/* Распоред со подобрен празен простор без да се судира текстот */}
                <Stack
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                        bgcolor: 'action.hover',
                        p: 1.5,
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HotelIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {accommodation.numRooms} {accommodation.numRooms === 1 ? 'Room' : 'Rooms'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CategoryIcon sx={{ fontSize: 20, color: 'action.active' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Condition: <strong style={{ color: '#0f172a' }}>{accommodation.condition}</strong>
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>

            <Box
                sx={{
                    p: 2.5,
                    pt: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/accommodations/${accommodation.id}`)}
                    sx={{
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1,
                        bgcolor: '#1e293b',
                        '&:hover': { bgcolor: '#0f172a' }
                    }}
                >
                    Details
                </Button>

                {canEdit && (
                    <>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => onEdit(accommodation)}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    p: 1,
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.50' }
                                }}
                            >
                                <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => onDelete(accommodation)}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    p: 1,
                                    color: 'error.main',
                                    '&:hover': { bgcolor: 'error.50' }
                                }}
                            >
                                <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Box>
        </Card>
    );
};

export default AccommodationCard;