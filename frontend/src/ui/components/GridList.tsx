import { Grid } from '@mui/material';
import type { GridProps } from '@mui/material';

interface GridListProps extends GridProps {
    children: React.ReactNode;
    spacing?: number;
    columns?: number;
}

const GridList = ({ children, spacing = 3, columns = 4, sx, ...props }: GridListProps) => {
    return (
        <Grid
            container
            spacing={{ xs: 2, md: spacing }}
            sx={{
                ...sx
            }}
            {...props}
        >
            {children}
        </Grid>
    );
};

export default GridList;


