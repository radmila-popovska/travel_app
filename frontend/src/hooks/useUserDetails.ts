import { useEffect, useState } from 'react';
import userApi from '../api/userApi.ts';
import type { User } from '../api/types/user.ts';

interface UseUserDetailsResult {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const useUserDetails = (id: number): UseUserDetailsResult => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await userApi.findById(id);
                setUser(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load user details');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    return { user, loading, error };
};

export default useUserDetails;

