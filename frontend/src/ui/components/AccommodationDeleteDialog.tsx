import type { Accommodation } from '../../api/types/accommodation.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface AccommodationDeleteDialogProps {
    accommodation: Accommodation;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const AccommodationDeleteDialog = ({ accommodation, open, onClose, onDelete }: AccommodationDeleteDialogProps) => {
    const handleSubmit = async () => {
        await onDelete(accommodation.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Accommodation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{accommodation.name}</strong>? This action cannot be undone.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AccommodationDeleteDialog;

