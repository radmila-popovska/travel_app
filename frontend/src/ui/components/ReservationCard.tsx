import { Box, Card, CardContent, Typography } from '@mui/material';
import type { Reservation } from '../../api/types/reservation.ts';

interface ReservationCardProps {
    reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #ddd' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Reservation #{reservation.id}
                </Typography>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>User ID:</strong> {reservation.userId}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Accommodation ID:</strong> {reservation.accommodationId}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Reserved At:</strong> {reservation.reservedAt}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Release At:</strong> {reservation.releaseAt}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ReservationCard;

