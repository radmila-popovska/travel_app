import axiosInstance from '../axios/axios.ts';
import type {Accommodation, AccommodationFormData} from './types/accommodation.ts';

const accommodationApi = {
    findAll: async () => {
        return await axiosInstance.get('/accommodations');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<Accommodation>(`/accommodations/${id}`);
    },
    add: async (data: AccommodationFormData) => {
        return await axiosInstance.post<Accommodation>('/accommodations/add', data);
    },
    edit: async (id: string, data: AccommodationFormData) => {
        return await axiosInstance.put<Accommodation>(`/accommodations/${id}/edit`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<Accommodation>(`/accommodations/${id}/delete`);
    }

};

export default accommodationApi;
