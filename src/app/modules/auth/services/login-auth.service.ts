import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomJwtPayload } from '../../../core/models/CustomJwtPayload.model';

@Injectable({
	providedIn: 'root'
})
export class LoginAuthService {
	public authenticationChanged = new EventEmitter<boolean>();

	private readonly apiUrl = environment.api;
	private userInfoSource = new BehaviorSubject<{
		firstName?: string;
		lastName?: string;
		phoneNumber?: string;
		role?: string;
		id?: number;
		sub?: string;
		iat?: number;
		exp?: number;
	}>({});
	userInfo$ = this.userInfoSource.asObservable();

	constructor(
		private http: HttpClient,
		private cookie: CookieService,
		private router: Router
	) {}

	sendCredentials(email: string, password: string): Observable<any> {
		const body = {
			email,
			password
		};
		return this.http.post(`${this.apiUrl}/auth/authenticate`, body, { responseType: 'text' }).pipe(
			tap((response: any) => {
				this.cookie.set('token', response, 1, '/');
				this.router.navigate(['/']);
				this.authenticationChanged.emit(true);
			})
		);
	}

	getTokenClaims(): any {
		const token = this.cookie.get('token');
		if (token) {
			try {
				const decodedToken = jwtDecode<CustomJwtPayload>(token);

				this.setUserInfo({
					firstName: decodedToken.firstName,
					lastName: decodedToken.lastName,
					phoneNumber: decodedToken.phoneNumber,
					role: decodedToken.role,
					id: decodedToken.id,
					sub: decodedToken.sub,
					iat: decodedToken.iat,
					exp: decodedToken.exp
				});
			} catch (Error) {
				console.error('Error decodificando el token:', Error);
				return null;
			}
		}
		return null;
	}
	getUserIdFromToken(): string {
		const token = this.cookie.get('token');
		if (token) {
			try {
				const decodedToken = jwtDecode<CustomJwtPayload>(token);
				return decodedToken.id ? decodedToken.id.toString() : '';
			} catch (Error) {
				console.error('Error decodificando el token:', Error);
			}
		}
		return '';
	}

	setUserInfo(userInfo: {
		firstName?: string;
		lastName?: string;
		phoneNumber?: string;
		role?: string;
		id?: number;
		sub?: string;
		iat?: number;
		exp?: number;
	}): void {
		this.userInfoSource.next(userInfo);
	}

	logout(): void {
		this.cookie.delete('token');
		this.router.navigate(['/']);
		this.authenticationChanged.emit(false);
	}

	isAdmin(): boolean {
		const userInfo = this.userInfoSource.value;
		return userInfo.role === 'ADMIN';
	}
}
