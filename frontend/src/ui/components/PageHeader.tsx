import { Box, Typography, Button } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface PageHeaderProps {
    title: string;
    onAdd?: () => void;
    canAdd?: boolean;
}

const PageHeader = ({ title, onAdd, canAdd }: PageHeaderProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontWeight: 800,
                    color: '#0f172a', // Вредност со висока видливост (наместо бел текст)
                    letterSpacing: '-0.5px'
                }}
            >
                {title}
            </Typography>

            {canAdd && onAdd && (
                <Button
                    variant="contained"
                    disableElevation
                    startIcon={<AddRoundedIcon />}
                    onClick={onAdd}
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.2,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.35)',
                    }}
                >
                    Add Accommodation
                </Button>
            )}
        </Box>
    );
};

export default PageHeader;