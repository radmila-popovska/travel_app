import { useCallback, useEffect, useState } from 'react';
import reservationApi from '../api/reservationApi.ts';
import type { Reservation, ReservationFormData } from '../api/types/reservation.ts';

const useReservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await reservationApi.findAll();
            const data = Array.isArray(response.data) ? response.data : response.data || [];
            setReservations(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
            setReservations([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: ReservationFormData) => {
        try {
            await reservationApi.reserve(data);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to create reservation.'));
        }
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { reservations, loading, error, fetch, onAdd };
};

export default useReservations;

