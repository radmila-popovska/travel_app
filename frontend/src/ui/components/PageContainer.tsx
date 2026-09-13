import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

interface PageContainerProps extends BoxProps {
    children: React.ReactNode;
}

const PageContainer = ({ children, sx, ...props }: PageContainerProps) => {
    return (
        <Box
            sx={{
                py: 4,
                ...sx
            }}
            {...props}
        >
            {children}
        </Box>
    );
};

export default PageContainer;


