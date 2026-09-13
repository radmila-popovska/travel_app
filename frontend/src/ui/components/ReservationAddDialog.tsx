import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { useState } from 'react';
import type { ReservationFormData } from '../../api/types/reservation.ts';
import * as React from 'react';

interface FormData {
    accommodationId: string;
    reservedAt: string;
    releaseAt: string;
}

const initialFormData: FormData = {
    accommodationId: '',
    reservedAt: '',
    releaseAt: ''
};

interface ReservationAddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: ReservationFormData) => Promise<void>;
}

const ReservationAddDialog = ({ open, onClose, onAdd }: ReservationAddDialogProps) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setError(null);
        setIsSubmitting(true);

        try {
            const payload: ReservationFormData = {
                accommodationId: Number(formData.accommodationId),
                reservedAt: formData.reservedAt,
                releaseAt: formData.releaseAt
            };

            await onAdd(payload);
            setFormData({ ...initialFormData });
            onClose();
        } catch (err: any) {
            const errorMessage = err.customMessage || err.response?.data?.message || 'Failed to add reservation. Please try again.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Reservation</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    margin="dense"
                    label="Accommodation ID"
                    name="accommodationId"
                    value={formData.accommodationId}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    disabled={isSubmitting}
                    slotProps={{
                        htmlInput: { min: 1 }
                    }}
                />
                <TextField
                    margin="dense"
                    label="Reserved At"
                    name="reservedAt"
                    value={formData.reservedAt}
                    onChange={handleChange}
                    type="datetime-local"
                    fullWidth
                    disabled={isSubmitting}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    margin="dense"
                    label="Release At"
                    name="releaseAt"
                    value={formData.releaseAt}
                    onChange={handleChange}
                    type="datetime-local"
                    fullWidth
                    disabled={isSubmitting}
                    InputLabelProps={{ shrink: true }}
                />
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

export default ReservationAddDialog;

