import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <LockIcon sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          Access Denied
        </Typography>
        <Typography variant="h6" color="text.secondary">
          You don't have permission to access this page.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This page requires administrator privileges. Please contact an administrator if you believe this is a mistake.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;



