import { useState } from 'react';
import { Box } from '@mui/material';
import useCountries from '../../../hooks/useCountries.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import CountryGrid from '../../components/CountryGrid.tsx';
import CountryAddDialog from '../../components/CountryAddDialog.tsx';
import CountryEditDialog from '../../components/CountryEditDialog.tsx';
import CountryDeleteDialog from '../../components/CountryDeleteDialog.tsx';
import type { Country } from '../../../api/types/country.ts';

const CountriesPage = () => {
    const { countries, loading, error, onAdd, onEdit, onDelete } = useCountries();
    const { isAdmin } = useAuth();
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleOpenEditDialog = (country: Country) => {
        setSelectedCountry(country);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setSelectedCountry(null);
    };

    const handleOpenDeleteDialog = (country: Country) => {
        setSelectedCountry(country);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedCountry(null);
    };

    if (loading) {
        return <LoadingState message="Loading countries..." />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <PageHeader
                title="Countries"
                subtitle="Manage countries"
                onAdd={isAdmin() ? handleOpenAddDialog : undefined}
                canAdd={isAdmin()}
            />
            {countries.length === 0 ? (
                <EmptyState message="No countries available" />
            ) : (
                <CountryGrid
                    countries={countries}
                    onEdit={handleOpenEditDialog}
                    onDelete={handleOpenDeleteDialog}
                    canEdit={isAdmin()}
                />
            )}

            <CountryAddDialog
                open={addDialogOpen}
                onClose={handleCloseAddDialog}
                onAdd={onAdd}
            />

            {selectedCountry && (
                <>
                    <CountryEditDialog
                        open={editDialogOpen}
                        country={selectedCountry}
                        onClose={handleCloseEditDialog}
                        onEdit={onEdit}
                    />
                    <CountryDeleteDialog
                        open={deleteDialogOpen}
                        country={selectedCountry}
                        onClose={handleCloseDeleteDialog}
                        onDelete={onDelete}
                    />
                </>
            )}
        </Box>
    );
};

export default CountriesPage;
