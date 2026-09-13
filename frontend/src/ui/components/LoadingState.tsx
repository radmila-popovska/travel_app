import { Box, Typography, CircularProgress } from '@mui/material';

interface LoadingStateProps {
    message?: string;
}

const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
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
            <CircularProgress />
            <Typography variant="body1" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingState;

