import type { Country } from '../../api/types/country.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface CountryDeleteDialogProps {
    country: Country;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const CountryDeleteDialog = ({ country, open, onClose, onDelete }: CountryDeleteDialogProps) => {
    const handleSubmit = async () => {
        await onDelete(country.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Country</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{country.name}</strong>? This action cannot be undone.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default CountryDeleteDialog;

