import { Grid } from '@mui/material';
import type { Reservation } from '../../api/types/reservation.ts';
import ReservationCard from './ReservationCard.tsx';

interface ReservationGridProps {
    reservations: Reservation[];
}

const ReservationGrid = ({ reservations }: ReservationGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {reservations.map((reservation) => (
                <Grid key={reservation.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ReservationCard reservation={reservation} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ReservationGrid;

