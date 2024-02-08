import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { SessionGuard } from './session.guard';

describe('SessionGuard', () => {
	let guard: SessionGuard;
	let cookieService: jasmine.SpyObj<CookieService>;
	let router: jasmine.SpyObj<Router>;

	beforeEach(() => {
		cookieService = jasmine.createSpyObj('CookieService', ['check']);
		router = jasmine.createSpyObj('Router', ['navigate']);

		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				SessionGuard,
				{ provide: CookieService, useValue: cookieService },
				{ provide: Router, useValue: router }
			]
		});

		guard = TestBed.inject(SessionGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should allow activation if cookie is present', () => {
		cookieService.check.and.returnValue(true);

		const canActivate = guard.canActivate(null!, null!);

		expect(canActivate).toBe(true);
		expect(router.navigate).not.toHaveBeenCalled();
	});

	it('should deny activation and navigate to "/auth/login" if cookie is not present', () => {
		cookieService.check.and.returnValue(false);

		const canActivate = guard.canActivate(null!, null!);

		expect(canActivate).toBe(false);
		expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
	});
});
