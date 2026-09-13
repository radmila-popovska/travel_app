import { Box } from '@mui/material';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import useUsers from '../../../hooks/useUsers.ts';
import UserGrid from '../../components/UserGrid.tsx';

const UsersPage = () => {
    const { users, loading, error } = useUsers();

    if (loading) {
        return <LoadingState message="Loading users..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <Box>
            <PageHeader title="Users" subtitle="Browse all registered users" />
            {users.length === 0 ? (
                <EmptyState message="No users available." />
            ) : (
                <UserGrid users={users} />
            )}
        </Box>
    );
};

export default UsersPage;

