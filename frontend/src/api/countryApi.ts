import axiosInstance from '../axios/axios.ts';
import type { Country, CountryFormData } from './types/country.ts';

const countryApi = {
    findAll: async () => {
        return await axiosInstance.get('/countries');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<Country>(`/countries/${id}`);
    },

    add: async (data: CountryFormData) => {
        return await axiosInstance.post<Country>('/countries/add', data);
    },

    edit: async (id: number, data: CountryFormData) => {
        return await axiosInstance.put<Country>(`/countries/${id}/edit`, data);
    },

    delete: async (id: number) => {
        return await axiosInstance.delete<Country>(`/countries/${id}/delete`);
    }
};

export default countryApi;
