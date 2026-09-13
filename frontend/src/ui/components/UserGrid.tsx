import { Box } from '@mui/material';
import type { User } from '../../api/types/user.ts';
import UserCard from './UserCard.tsx';

interface UserGridProps {
    users: User[];
}

const UserGrid = ({ users }: UserGridProps) => {
    return (
        <Box
            component="div"
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 2
            }}
        >
            {users.map((user) => (
                <Box key={user.id} component="div">
                    <UserCard user={user} />
                </Box>
            ))}
        </Box>
    );
};

export default UserGrid;

