import { useEffect, useState } from 'react';
import userApi from '../api/userApi.ts';
import type { User } from '../api/types/user.ts';

interface UseUsersState {
    users: User[];
    loading: boolean;
    error?: string;
}

const useUsers = () => {
    const [state, setState] = useState<UseUsersState>({
        users: [],
        loading: true
    });

    useEffect(() => {
        userApi
            .findAll()
            .then((response) => {
                const users = Array.isArray(response.data) ? response.data : response.data.content || [];
                setState({
                    users,
                    loading: false
                });
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setState({
                    users: [],
                    loading: false,
                    error: error.message
                });
            });
    }, []);

    return state;
};

export default useUsers;

