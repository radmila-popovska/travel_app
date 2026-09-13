import type { Accommodation, AccommodationFormData } from '../../api/types/accommodation.ts';
import {
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
import { useState, useEffect } from 'react';
import * as React from 'react';
import useHosts from '../../hooks/useHosts.ts';

interface FormData {
    name: string;
    category: string;
    condition: string;
    numRooms: string;
    hostId: string;
}

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

interface AccommodationEditDialogProps {
    accommodation: Accommodation;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: AccommodationFormData) => Promise<void>;
}

const AccommodationEditDialog = ({ accommodation, open, onClose, onEdit }: AccommodationEditDialogProps) => {
    const { hosts } = useHosts();

    const [formData, setFormData] = useState<FormData>({
        name: accommodation.name,
        category: accommodation.category,
        condition: accommodation.condition,
        numRooms: accommodation.numRooms.toString(),
        hostId: accommodation.hostId.toString()
    });

    useEffect(() => {
        setFormData({
            name: accommodation.name,
            category: accommodation.category,
            condition: accommodation.condition,
            numRooms: accommodation.numRooms.toString(),
            hostId: accommodation.hostId.toString()
        });
    }, [accommodation, open]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload: AccommodationFormData = {
            name: formData.name.trim(),
            category: formData.category.trim(),
            condition: formData.condition.trim(),
            numRooms: Number(formData.numRooms),
            hostId: Number(formData.hostId),
            rented: accommodation.rented
        };

        await onEdit(accommodation.id, payload);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Accommodation</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl margin="dense" fullWidth>
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
                <FormControl margin="dense" fullWidth>
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
                    slotProps={{
                        htmlInput: { min: 0 }
                    }}
                />
                <FormControl margin="dense" fullWidth>
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
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccommodationEditDialog;



