import { useEffect, useState } from 'react';
import countryApi from '../api/countryApi.ts';
import type { Country } from '../api/types/country.ts';

interface UseCountryState {
    country?: Country;
    loading: boolean;
    error?: string;
}

const useCountry = (id?: number) => {
    const [state, setState] = useState<UseCountryState>({
        loading: Boolean(id)
    });

    useEffect(() => {
        if (!id) {
            return;
        }

        countryApi
            .findById(id)
            .then((response) => {
                setState({
                    country: response.data,
                    loading: false
                });
            })
            .catch((error) => {
                console.error(`Error fetching country with id ${id}:`, error);
                setState({
                    loading: false,
                    error: error.message
                });
            });
    }, [id]);

    return state;
};

export default useCountry;
