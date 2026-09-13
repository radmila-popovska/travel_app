import { Box, Typography, Alert } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface ErrorStateProps {
    title?: string;
    message: string;
}

const ErrorState = ({ title = 'Error Loading Data', message }: ErrorStateProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                gap: 2
            }}
        >
            <WarningIcon sx={{ fontSize: 64, color: 'error.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {title}
            </Typography>
            <Alert severity="error" sx={{ maxWidth: '500px' }}>
                {message}
            </Alert>
        </Box>
    );
};

export default ErrorState;



