import axiosInstance from '../axios/axios.ts';
import type { Reservation, ReservationFormData } from './types/reservation.ts';

const reservationApi = {
    findAll: async () => {
        return await axiosInstance.get<Reservation[]>('/reservations');
    },

    reserve: async (data: ReservationFormData) => {
        return await axiosInstance.post<Reservation>('/reservations/reserve', data);
    }
};

export default reservationApi;

