export interface Reservation {
    id: number;
    userId: number;
    accommodationId: number;
    reservedAt: string;
    releaseAt: string;
}

export interface ReservationFormData {
    accommodationId: number;
    reservedAt: string;
    releaseAt: string;
}

