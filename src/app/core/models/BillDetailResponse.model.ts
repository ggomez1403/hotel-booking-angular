import { Reservation } from './Reservation.model';

export interface BillDetailResponse {
	id: number;
	description: string;
	reservation: Reservation;
}
