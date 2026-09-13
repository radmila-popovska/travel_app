import { useEffect, useState } from 'react';
import hostApi from '../api/hostApi.ts';
import type { Host } from '../api/types/host.ts';

interface UseHostState {
    host?: Host;
    loading: boolean;
    error?: string;
}

const useHost = (id?: number) => {
    const [state, setState] = useState<UseHostState>({
        loading: Boolean(id)
    });

    useEffect(() => {
        if (!id) {
            return;
        }

        hostApi
            .findById(id)
            .then((response) => {
                setState({
                    host: response.data,
                    loading: false
                });
            })
            .catch((error) => {
                console.error(`Error fetching host with id ${id}:`, error);
                setState({
                    loading: false,
                    error: error.message
                });
            });
    }, [id]);

    return state;
};

export default useHost;