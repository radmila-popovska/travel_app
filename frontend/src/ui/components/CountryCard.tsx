import { Box, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import type { Country } from '../../api/types/country.ts';

interface CountryCardProps {
    country: Country;
    onView?: (id: number) => void;
}

const CountryCard = ({ country, onView }: CountryCardProps) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.primary.main})`,
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/* Icon */}
                <Box sx={{ mb: 2 }}>
                    <PublicIcon
                        sx={{
                            fontSize: { xs: '2.5rem', sm: '3rem' },
                            color: 'primary.main',
                        }}
                    />
                </Box>

                {/* Country Name */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        mb: 1,
                    }}
                >
                    {country.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        mb: 1
                    }}
                >
                    {country.continent}
                </Typography>

                {/* ID */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: '0.8rem',
                        fontWeight: 500
                    }}
                >
                    ID: {country.id}
                </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions sx={{ justifyContent: 'center', p: 2, pt: 1 }}>
                <Button
                    startIcon={<InfoIcon />}
                    variant="contained"
                    size="small"
                    onClick={() => onView?.(country.id)}
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    Explore
                </Button>
            </CardActions>
        </Card>
    );
};

export default CountryCard;
