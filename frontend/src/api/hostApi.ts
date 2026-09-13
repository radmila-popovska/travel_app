import axiosInstance from '../axios/axios.ts';
import type { Host, HostFormData } from './types/host.ts';

const hostApi = {
    findAll: async () => {
        return await axiosInstance.get('/hosts');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<Host>(`/hosts/${id}`);
    },

    add: async (data: HostFormData) => {
        return await axiosInstance.post<Host>('/hosts/add', data);
    },

    edit: async (id: number, data: HostFormData) => {
        return await axiosInstance.put<Host>(`/hosts/${id}/edit`, data);
    },

    delete: async (id: number) => {
        return await axiosInstance.delete<Host>(`/hosts/${id}/delete`);
    }
};

export default hostApi;
