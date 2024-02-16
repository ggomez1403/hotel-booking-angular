import { Reservation } from '../models/Reservation.model';
import { ReservationResponse } from '../models/ReservationResponse.model';
import { Room } from '../models/Room.model';
import { User } from '../models/User.model';

export function getUserTemplate(): User {
	return {
		id: 0,
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phoneNumber: '',
		role: ''
	};
}

export function getRoomTemplate(): Room {
	return {
		id: 0,
		imgUrl: '',
		name: '',
		available: true,
		type: '',
		capacity: 0,
		bathroomAmenities: [],
		bedroomAmenities: [],
		entertainmentAmenities: [],
		foodAndDrinksAmenities: [],
		internetAmenities: [],
		moreAmenities: [],
		highlights: [],
		initialPrice: 0,
		taxesAndFees: 0,
		totalPrice: 0
	};
}

export function getReservationResponseTemplate(): ReservationResponse {
	return {
		id: 0,
		startDate: '',
		endDate: '',
		roomId: 0,
		userId: 0,
		amount: 0,
		user: getUserTemplate(),
		room: getRoomTemplate()
	};
}

export function getReservationTemplate(): Reservation {
	return {
		id: 0,
		startDate: '',
		endDate: '',
		roomId: 0,
		userId: 0
	};
}
