import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginAuthService } from '../../modules/auth/services/login-auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
	let guard: AuthGuard;
	let authService: jasmine.SpyObj<LoginAuthService>;
	let router: jasmine.SpyObj<Router>;

	beforeEach(() => {
		authService = jasmine.createSpyObj('LoginAuthService', ['isAdmin']);
		router = jasmine.createSpyObj('Router', ['navigate']);

		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				AuthGuard,
				{ provide: LoginAuthService, useValue: authService },
				{ provide: Router, useValue: router }
			]
		});

		guard = TestBed.inject(AuthGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should allow activation for admin users', () => {
		authService.isAdmin.and.returnValue(true);

		const canActivate = guard.canActivate(null!, null!);

		expect(canActivate).toBe(true);
		expect(router.navigate).not.toHaveBeenCalled();
	});

	it('should deny activation for non-admin users and navigate to "/"', () => {
		authService.isAdmin.and.returnValue(false);

		const canActivate = guard.canActivate(null!, null!);

		expect(canActivate).toBe(false);
		expect(router.navigate).toHaveBeenCalledWith(['/']);
	});
});
