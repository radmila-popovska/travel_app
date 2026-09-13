import { Box, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import type { Host } from '../../api/types/host.ts';

interface HostCardProps {
    host: Host;
    onView?: (id: number) => void;
}

const HostCard = ({ host, onView }: HostCardProps) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <PersonIcon
                        sx={{
                            color: 'primary.main',
                            fontSize: 28
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '0.95rem', sm: '1rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {host.name} {host.surname}
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: '0.85rem',
                        marginTop: 1
                    }}
                >
                    <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Country ID:
                    </Box>
                    {' '}{host.countryId}
                </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions sx={{ p: 2, pt: 1 }}>
                <Button
                    fullWidth
                    startIcon={<InfoIcon />}
                    variant="contained"
                    size="small"
                    onClick={() => onView?.(host.id)}
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    View Profile
                </Button>
            </CardActions>
        </Card>
    );
};

export default HostCard;
