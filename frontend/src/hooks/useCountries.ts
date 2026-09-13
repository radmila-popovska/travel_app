import { useCallback, useEffect, useState } from 'react';
import countryApi from '../api/countryApi.ts';
import type { Country, CountryFormData } from '../api/types/country.ts';

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await countryApi.findAll();
            const data = Array.isArray(response.data) ? response.data : response.data.content || [];
            setCountries(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
            setCountries([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: CountryFormData) => {
        try {
            await countryApi.add(data);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to create country.'));
        }
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: CountryFormData) => {
        try {
            await countryApi.edit(id, data);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to update country.'));
        }
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await countryApi.delete(id);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete country.'));
        }
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { countries, loading, error, fetch, onAdd, onEdit, onDelete };
};

export default useCountries;

