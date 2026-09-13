import { Box } from '@mui/material';
import AccommodationCard from './AccommodationCard.tsx';
import type { Accommodation } from '../../api/types/accommodation.ts';

interface AccommodationGridProps {
    accommodations: Accommodation[];
    onEdit: (accommodation: Accommodation) => void;
    onDelete: (accommodation: Accommodation) => void;
    canEdit: boolean;
}

const AccommodationGrid = ({ accommodations, onEdit, onDelete, canEdit }: AccommodationGridProps) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)', // Наместо 4, тука користиме 3 за пошироки картички
                },
                gap: 3.5, // Зголемен размак помеѓу картичките
            }}
        >
            {accommodations.map((accommodation) => (
                <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    canEdit={canEdit}
                />
            ))}
        </Box>
    );
};

export default AccommodationGrid;