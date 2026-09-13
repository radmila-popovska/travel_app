import { useState } from 'react';
import { Box } from '@mui/material';
import useHosts from '../../../hooks/useHosts.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import HostGrid from '../../components/HostGrid.tsx';
import HostAddDialog from '../../components/HostAddDialog.tsx';
import HostEditDialog from '../../components/HostEditDialog.tsx';
import HostDeleteDialog from '../../components/HostDeleteDialog.tsx';
import type { Host } from '../../../api/types/host.ts';

const HostsPage = () => {
    const { hosts, loading, error, onAdd, onEdit, onDelete } = useHosts();
    const { isAdmin } = useAuth();
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState<Host | null>(null);

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleOpenEditDialog = (host: Host) => {
        setSelectedHost(host);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setSelectedHost(null);
    };

    const handleOpenDeleteDialog = (host: Host) => {
        setSelectedHost(host);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedHost(null);
    };

    if (loading) {
        return <LoadingState message="Loading hosts..." />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <PageHeader
                title="Hosts"
                subtitle="Manage accommodation hosts"
                onAdd={isAdmin() ? handleOpenAddDialog : undefined}
                canAdd={isAdmin()}
            />
            {hosts.length === 0 ? (
                <EmptyState message="No hosts available" />
            ) : (
                <HostGrid
                    hosts={hosts}
                    onEdit={handleOpenEditDialog}
                    onDelete={handleOpenDeleteDialog}
                    canEdit={isAdmin()}
                />
            )}

            <HostAddDialog
                open={addDialogOpen}
                onClose={handleCloseAddDialog}
                onAdd={onAdd}
            />

            {selectedHost && (
                <>
                    <HostEditDialog
                        open={editDialogOpen}
                        host={selectedHost}
                        onClose={handleCloseEditDialog}
                        onEdit={onEdit}
                    />
                    <HostDeleteDialog
                        open={deleteDialogOpen}
                        host={selectedHost}
                        onClose={handleCloseDeleteDialog}
                        onDelete={onDelete}
                    />
                </>
            )}
        </Box>
    );
};

export default HostsPage;
