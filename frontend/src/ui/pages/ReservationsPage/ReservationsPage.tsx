import { useState } from 'react';
import { Container } from '@mui/material';
import useReservations from '../../../hooks/useReservations.ts';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import ReservationGrid from '../../components/ReservationGrid.tsx';
import ReservationAddDialog from '../../components/ReservationAddDialog.tsx';

const ReservationsPage = () => {
    const { reservations, loading, error, onAdd } = useReservations();
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    if (loading) {
        return <LoadingState message="Loading reservations..." />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PageHeader
                title="Reservations"
                onAdd={handleOpenAddDialog}
                canAdd
            />
            {reservations.length === 0 ? (
                <EmptyState message="No reservations available" />
            ) : (
                <ReservationGrid reservations={reservations} />
            )}

            <ReservationAddDialog
                open={addDialogOpen}
                onClose={handleCloseAddDialog}
                onAdd={onAdd}
            />
        </Container>
    );
};

export default ReservationsPage;

