import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { LoginAuthService } from './login-auth.service';

describe('LoginAuthService', () => {
	let service: LoginAuthService;
	let cookieService: CookieService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [LoginAuthService, CookieService]
		});
		service = TestBed.inject(LoginAuthService);
		cookieService = TestBed.inject(CookieService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set user info', () => {
		const userInfo = {
			firstName: 'John',
			lastName: 'Doe',
			phoneNumber: '12345789',
			sub: 'johndoe@gmail.com',
			role: 'USER',
			id: 123
		};
		service.setUserInfo(userInfo);
		service.userInfo$.subscribe((info) => {
			expect(info).toEqual(userInfo);
		});
	});

	it('should logout and emit authenticationChanged', () => {
		spyOn(cookieService, 'delete').and.stub();
		spyOn(service.authenticationChanged, 'emit').and.stub();

		service.logout();

		expect(cookieService.delete).toHaveBeenCalledWith('token');
		expect(service.authenticationChanged.emit).toHaveBeenCalledWith(false);
	});
});
