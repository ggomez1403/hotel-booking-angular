import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Room } from '../../../core/models/Room.model';

@Injectable({
	providedIn: 'root'
})
export class RoomsService {
	constructor(private http: HttpClient) {}

	private readonly apiUrl = environment.api;

	getAllRooms(): Observable<Room[]> {
		return this.http.get(`${this.apiUrl}/room/rooms`).pipe(map((response: any) => response));
	}

	getSingleRoom(roomId: number): Observable<Room> {
		return this.http.get(`${this.apiUrl}/room/rooms/${roomId}`).pipe((response: any) => response);
	}
}
