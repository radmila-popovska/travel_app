import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

interface EmptyStateProps {
    title?: string;
    message: string;
}

const EmptyState = ({ title = 'No Data Available', message }: EmptyStateProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '40vh',
                gap: 2
            }}
        >
            <InboxIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: '400px' }}>
                {message}
            </Typography>
        </Box>
    );
};

export default EmptyState;

