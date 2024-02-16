import { Room } from './Room.model';
import { User } from './User.model';

export interface ReservationResponse {
	id: number;
	startDate: string;
	endDate: string;
	userId: number;
	roomId: number;
	amount: number;
	user: User;
	room: Room;
}
