import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import type { User } from '../../api/types/user.ts';

interface UserCardProps {
    user: User;
}

const UserCard = ({ user }: UserCardProps) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #ddd' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PersonIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {user.name} {user.surname}
                    </Typography>
                </Box>

                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Username:</strong> {user.username}
                </Typography>
                <Typography variant="body2">
                    <strong>Role:</strong> {user.role}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/users/${user.id}`)}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserCard;

