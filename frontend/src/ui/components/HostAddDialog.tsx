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
import useCountries from '../../hooks/useCountries.ts';
import { useState } from 'react';
import type { HostFormData } from '../../api/types/host.ts';
import * as React from 'react';

interface FormData {
    name: string;
    surname: string;
    countryId: string;
}

const initialFormData: FormData = {
    name: '',
    surname: '',
    countryId: ''
};

interface HostAddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: HostFormData) => Promise<void>;
}

const HostAddDialog = ({ open, onClose, onAdd }: HostAddDialogProps) => {
    const { countries } = useCountries();
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload: HostFormData = {
            name: formData.name.trim(),
            surname: formData.surname.trim(),
            countryId: Number(formData.countryId)
        };

        await onAdd(payload);
        setFormData({ ...initialFormData });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Host</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="First Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl margin="dense" fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                        label="Country"
                        name="countryId"
                        value={formData.countryId}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default HostAddDialog;

