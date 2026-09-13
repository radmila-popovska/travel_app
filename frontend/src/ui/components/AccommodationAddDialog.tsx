import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField
} from '@mui/material';
import useHosts from '../../hooks/useHosts.ts';
import { useState } from 'react';
import type { AccommodationFormData } from '../../api/types/accommodation.ts';
import * as React from 'react';

interface FormData {
    name: string;
    category: string;
    condition: string;
    numRooms: string;
    hostId: string;
}

const initialFormData: FormData = {
    name: '',
    category: '',
    condition: '',
    numRooms: '',
    hostId: ''
};

const CATEGORIES = [
    { value: 'ROOM', label: 'Room' },
    { value: 'HOUSE', label: 'House' },
    { value: 'FLAT', label: 'Flat' },
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'HOTEL', label: 'Hotel' },
    { value: 'MOTEL', label: 'Motel' }
];

const CONDITIONS = [
    { value: 'GOOD', label: 'Good' },
    { value: 'BAD', label: 'Bad' }
];

interface AccommodationAddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: AccommodationFormData) => Promise<void>;
}

const AccommodationAddDialog = ({ open, onClose, onAdd }: AccommodationAddDialogProps) => {
    const { hosts } = useHosts();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setError(null);
        setIsSubmitting(true);

        try {
            const payload: AccommodationFormData = {
                name: formData.name.trim(),
                category: formData.category.trim(),
                condition: formData.condition.trim(),
                numRooms: Number(formData.numRooms),
                hostId: Number(formData.hostId),
                rented: false
            };

            await onAdd(payload);
            setFormData({ ...initialFormData });
            onClose();
        } catch (err: any) {
            const errorMessage = err.customMessage || err.response?.data?.message || 'Failed to add accommodation. Please try again.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

// ...existing code...
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Accommodation</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    disabled={isSubmitting}
                />
                <FormControl margin="dense" fullWidth disabled={isSubmitting}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {CATEGORIES.map((cat) => (
                            <MenuItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth disabled={isSubmitting}>
                    <InputLabel>Condition</InputLabel>
                    <Select
                        label="Condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {CONDITIONS.map((cond) => (
                            <MenuItem key={cond.value} value={cond.value}>
                                {cond.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Number of Rooms"
                    name="numRooms"
                    value={formData.numRooms}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    disabled={isSubmitting}
                    slotProps={{
                        htmlInput: { min: 0 }
                    }}
                />
                <FormControl margin="dense" fullWidth disabled={isSubmitting}>
                    <InputLabel>Host</InputLabel>
                    <Select
                        label="Host"
                        name="hostId"
                        value={formData.hostId}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {hosts.map((host) => (
                            <MenuItem key={host.id} value={host.id}>
                                {host.name} {host.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccommodationAddDialog;





