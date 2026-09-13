import { useEffect, useState } from 'react';
import accommodationApi from '../api/accommodationApi.ts';
import type { Accommodation } from '../api/types/accommodation.ts';

interface UseAccommodationDetailsResult {
    accommodation: Accommodation | null;
    loading: boolean;
    error: string | null;
}

const useAccommodationDetails = (id: number): UseAccommodationDetailsResult => {
    const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccommodation = async () => {
            try {
                setLoading(true);
                const response = await accommodationApi.findById(id);
                setAccommodation(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load accommodation details');
                setAccommodation(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodation();
    }, [id]);

    return { accommodation, loading, error };
};

export default useAccommodationDetails;

