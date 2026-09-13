import { useCallback, useEffect, useState } from 'react';
import hostApi from '../api/hostApi.ts';
import type { Host, HostFormData } from '../api/types/host.ts';

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await hostApi.findAll();
            const data = Array.isArray(response.data) ? response.data : response.data.content || [];
            setHosts(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
            setHosts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: HostFormData) => {
        try {
            await hostApi.add(data);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to create host.'));
        }
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: HostFormData) => {
        try {
            await hostApi.edit(id, data);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to update host.'));
        }
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await hostApi.delete(id);
            await fetch();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete host.'));
        }
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { hosts, loading, error, fetch, onAdd, onEdit, onDelete };
};

export default useHosts;

