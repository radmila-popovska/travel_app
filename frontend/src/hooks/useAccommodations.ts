import { useCallback, useEffect, useState } from 'react';
import accommodationApi from '../api/accommodationApi.ts';
import type { Accommodation, AccommodationFormData } from '../api/types/accommodation.ts';

const useAccommodations = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await accommodationApi.findAll();
            setAccommodations(response.data.content || []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
            setAccommodations([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: AccommodationFormData) => {
        try {
            await accommodationApi.add(data);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to create accommodation.'));
        }
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: AccommodationFormData) => {
        try {
            await accommodationApi.edit(id.toString(), data);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to update accommodation.'));
        }
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await accommodationApi.delete(id.toString());
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete accommodation.'));
        }
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { accommodations, loading, error, fetch, onAdd, onEdit, onDelete };
};

export default useAccommodations;
