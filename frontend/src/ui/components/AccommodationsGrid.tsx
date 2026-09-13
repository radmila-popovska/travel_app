import type { Accommodation } from '../../api/types/accommodation.ts';
import { Grid } from '@mui/material';
import AccommodationCard from '../components/AccommodationCard.tsx';

interface AccommodationGridProps {
    accommodations: Accommodation[];
}

const AccommodationGrid = ({ accommodations }: AccommodationGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {accommodations.map((accommodation) => (
                <Grid key={accommodation.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <AccommodationCard accommodation={accommodation}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default AccommodationGrid;
