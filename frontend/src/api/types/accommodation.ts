export interface Accommodation {
    id: number,
    name: string;
    category: string;
    condition: string;
    numRooms: number;
    hostId: number;
    rented:boolean;
}

export interface AccommodationFormData{
    name: string;
    category: string;
    condition: string;
    numRooms: number;
    hostId: number;
    rented:boolean;
}