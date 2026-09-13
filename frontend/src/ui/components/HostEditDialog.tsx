import type { Host, HostFormData } from '../../api/types/host.ts';
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
import useCountries from '../../hooks/useCountries.ts';

interface FormData {
    name: string;
    surname: string;
    countryId: string;
}

interface HostEditDialogProps {
    host: Host;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: HostFormData) => Promise<void>;
}

const HostEditDialog = ({ host, open, onClose, onEdit }: HostEditDialogProps) => {
    const { countries } = useCountries();

    const [formData, setFormData] = useState<FormData>({
        name: host.name,
        surname: host.surname,
        countryId: host.countryId.toString()
    });

    useEffect(() => {
        setFormData({
            name: host.name,
            surname: host.surname,
            countryId: host.countryId.toString()
        });
    }, [host, open]);

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

        await onEdit(host.id, payload);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Host</DialogTitle>
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
                <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default HostEditDialog;

