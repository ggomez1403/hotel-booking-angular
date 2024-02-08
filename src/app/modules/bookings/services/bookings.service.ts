import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Reservation } from '../../../core/models/Reservation.model';
import { ReservationResponse } from '../../../core/models/ReservationResponse.model';

@Injectable({
	providedIn: 'root'
})
export class BookingsService {
	constructor(private http: HttpClient) {}

	private readonly apiUrl = environment.api;

	createReservation(body: Reservation): Observable<void> {
		return this.http.post(`${this.apiUrl}/reservation/reservations`, body).pipe(map(() => {}));
	}

	getUserReservations(userId: number): Observable<ReservationResponse[]> {
		return this.http
			.get(`${this.apiUrl}/reservation?userId=${userId}`)
			.pipe(map((response: any) => response));
	}

	getAllReservations(): Observable<ReservationResponse[]> {
		return this.http
			.get(`${this.apiUrl}/reservation/reservations`)
			.pipe(map((response: any) => response));
	}

	getSingleReservation(reservationId: number): Observable<ReservationResponse> {
		return this.http
			.get(`${this.apiUrl}/reservation/reservations/${reservationId}`)
			.pipe(map((response: any) => response));
	}

	getSingleReservationByUserId(userId: number): Observable<ReservationResponse[]> {
		return this.http
			.get(`${this.apiUrl}/reservation?userId=${userId}`)
			.pipe(map((response: any) => response));
	}

	updateReservation(reservationId: number, body: Reservation): Observable<Object> {
		return this.http.put(`${this.apiUrl}/reservation/reservations/${reservationId}`, body);
	}

	deleteReservation(reservationId: number): Observable<Object> {
		return this.http.delete(`${this.apiUrl}/reservation/reservations/${reservationId}`);
	}
}
