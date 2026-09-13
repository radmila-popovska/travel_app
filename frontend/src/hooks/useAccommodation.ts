import { useEffect, useState } from 'react';
import accommodationApi from '../api/accommodationApi.ts';
import type { Accommodation } from '../api/types/accommodation.ts';

interface UseAccommodationState {
    accommodation?: Accommodation;
    loading: boolean;
    error?: string;
}

const useAccommodation = (id?: number) => {
    const [state, setState] = useState<UseAccommodationState>({
        loading: !id
    });

    useEffect(() => {
        if (!id) {
            setState({ loading: false });
            return;
        }

        setState({ loading: true });
        accommodationApi
            .findById(id)
            .then((response) => {
                setState({
                    accommodation: response.data,
                    loading: false
                });
            })
            .catch((error) => {
                console.error(`Error fetching accommodation with id ${id}:`, error);
                setState({
                    loading: false,
                    error: error.message
                });
            });
    }, [id]);

    return state;
};

export default useAccommodation;

