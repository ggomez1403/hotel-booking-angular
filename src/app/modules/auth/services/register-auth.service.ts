import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RegisterAuthService {
	private readonly apiUrl = environment.api;

	constructor(
		private http: HttpClient,
		private cookie: CookieService,
		private router: Router
	) {}

	sendRegistrationCredentials(
		firstName: string,
		lastName: string,
		email: string,
		phoneNumber: string,
		password: string,
		role: string
	): Observable<any> {
		const body = {
			firstName,
			lastName,
			email,
			phoneNumber,
			password,
			role
		};
		return this.http.post(`${this.apiUrl}/auth/register`, body, { responseType: 'text' }).pipe(
			tap((response: any) => {
				this.cookie.set('token', response, 1, '/');
				this.router.navigate(['/auth/login']);
			})
		);
	}
}
