import { useState } from 'react';
import { Container, Box, Fade, Paper } from '@mui/material';
import useAccommodations from '../../../hooks/useAccommodations.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import AccommodationGrid from '../../components/AccommodationGrid.tsx';
import AccommodationAddDialog from '../../components/AccommodationAddDialog.tsx';
import AccommodationEditDialog from '../../components/AccommodationEditDialog.tsx';
import AccommodationDeleteDialog from '../../components/AccommodationDeleteDialog.tsx';
import type { Accommodation } from '../../../api/types/accommodation.ts';

const AccommodationsPage = () => {
    const { accommodations, loading, error, onAdd, onEdit, onDelete } = useAccommodations();
    const { isAdmin } = useAuth();
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

    const handleOpenAddDialog = () => setAddDialogOpen(true);
    const handleCloseAddDialog = () => setAddDialogOpen(false);

    const handleOpenEditDialog = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setSelectedAccommodation(null);
    };

    const handleOpenDeleteDialog = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedAccommodation(null);
    };

    if (loading) {
        return (
            <Box className="progress-box">
                <LoadingState message="Loading accommodations..." />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <ErrorState message={error.message} />
            </Box>
        );
    }

    return (
        <Fade in timeout={400}>
            <Container
                maxWidth="xl"
                className="accommodations-page"
                sx={{
                    py: { xs: 3, md: 5 },
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >
                {/* Хедер Секција со модерна позадина и заоблени ивици */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,247,250,0.9) 100%)',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
                    }}
                >
                    <PageHeader
                        title="Accommodations"
                        onAdd={isAdmin() ? handleOpenAddDialog : undefined}
                        canAdd={isAdmin()}
                    />
                </Paper>

                {/* Содржина (Grid или Empty State) */}
                <Box sx={{ flex: 1 }}>
                    {accommodations.length === 0 ? (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                textAlign: 'center',
                                borderRadius: 3,
                                border: '1px dashed',
                                borderColor: 'divider',
                                bgcolor: 'background.paper'
                            }}
                        >
                            <EmptyState message="No accommodations available" />
                        </Paper>
                    ) : (
                        <AccommodationGrid
                            accommodations={accommodations}
                            onEdit={handleOpenEditDialog}
                            onDelete={handleOpenDeleteDialog}
                            canEdit={isAdmin()}
                        />
                    )}
                </Box>

                {/* Дијалози */}
                <AccommodationAddDialog
                    open={addDialogOpen}
                    onClose={handleCloseAddDialog}
                    onAdd={onAdd}
                />

                {selectedAccommodation && (
                    <>
                        <AccommodationEditDialog
                            open={editDialogOpen}
                            accommodation={selectedAccommodation}
                            onClose={handleCloseEditDialog}
                            onEdit={onEdit}
                        />
                        <AccommodationDeleteDialog
                            open={deleteDialogOpen}
                            accommodation={selectedAccommodation}
                            onClose={handleCloseDeleteDialog}
                            onDelete={onDelete}
                        />
                    </>
                )}
            </Container>
        </Fade>
    );
};

export default AccommodationsPage;