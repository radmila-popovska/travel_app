import type { Host } from '../../api/types/host.ts';
import { Grid } from '@mui/material';
import HostCard from './HostCard.tsx';

interface HostGridProps {
    hosts: Host[];
    onEdit: (host: Host) => void;
    onDelete: (host: Host) => void;
    canEdit?: boolean;
}

const HostGrid = ({ hosts, onEdit, onDelete, canEdit = false }: HostGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {hosts.map((host) => (
                <Grid key={host.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <HostCard
                        host={host}
                        onEdit={() => onEdit(host)}
                        onDelete={() => onDelete(host)}
                        canEdit={canEdit}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default HostGrid;


