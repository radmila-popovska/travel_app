import type { Country, CountryFormData } from '../../api/types/country.ts';
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

interface FormData {
    name: string;
    continent: string;
}

const CONTINENTS = [
    { value: 'Africa', label: 'Africa' },
    { value: 'Antarctica', label: 'Antarctica' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'North America', label: 'North America' },
    { value: 'Oceania', label: 'Oceania' },
    { value: 'South America', label: 'South America' }
];

interface CountryEditDialogProps {
    country: Country;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: CountryFormData) => Promise<void>;
}

const CountryEditDialog = ({ country, open, onClose, onEdit }: CountryEditDialogProps) => {
    const [formData, setFormData] = useState<FormData>({
        name: country.name,
        continent: country.continent
    });

    useEffect(() => {
        setFormData({
            name: country.name,
            continent: country.continent
        });
    }, [country, open]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload: CountryFormData = {
            name: formData.name.trim(),
            continent: formData.continent.trim()
        };

        await onEdit(country.id, payload);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Country</DialogTitle>
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
                    <InputLabel>Continent</InputLabel>
                    <Select
                        label="Continent"
                        name="continent"
                        value={formData.continent}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {CONTINENTS.map((cont) => (
                            <MenuItem key={cont.value} value={cont.value}>
                                {cont.label}
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

export default CountryEditDialog;


