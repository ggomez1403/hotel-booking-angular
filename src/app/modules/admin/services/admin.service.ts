import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Room } from '../../../core/models/Room.model';

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	constructor(private http: HttpClient) {}

	private readonly apiUrl = environment.api;

	createRoom(body: Room): Observable<void> {
		return this.http.post(`${this.apiUrl}/room/rooms`, body).pipe(map(() => {}));
	}
}
