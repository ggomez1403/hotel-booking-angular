import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { RegisterAuthService } from './register-auth.service';

describe('RegisterAuthService', () => {
	let service: RegisterAuthService;
	let httpMock: HttpTestingController;
	let cookieService: CookieService;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [RegisterAuthService, CookieService]
		});

		service = TestBed.inject(RegisterAuthService);
		httpMock = TestBed.inject(HttpTestingController);
		cookieService = TestBed.inject(CookieService);
		router = TestBed.inject(Router);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should send registration credentials and set token in cookies', inject(
		[HttpTestingController],
		(httpClient: HttpTestingController) => {
			const mockResponse = 'mockToken';
			const mockUserData = {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				phoneNumber: '123456789',
				password: 'password123',
				role: 'user'
			};

			spyOn(router, 'navigate');

			service
				.sendRegistrationCredentials(
					mockUserData.firstName,
					mockUserData.lastName,
					mockUserData.email,
					mockUserData.phoneNumber,
					mockUserData.password,
					mockUserData.role
				)
				.subscribe((response: any) => {
					expect(response).toBe(mockResponse);
					expect(cookieService.get('token')).toBe(mockResponse);
					expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
				});

			const req = httpMock.expectOne(`${service['apiUrl']}/auth/register`);
			expect(req.request.method).toBe('POST');
			req.flush(mockResponse);

			httpMock.verify();
		}
	));
});
