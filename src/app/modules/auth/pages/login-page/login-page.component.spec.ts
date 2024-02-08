import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LoginAuthService } from '../../services/login-auth.service';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
	let component: LoginPageComponent;
	let fixture: ComponentFixture<LoginPageComponent>;
	let loginAuthServiceSpy: jasmine.SpyObj<LoginAuthService>;

	beforeEach(() => {
		const authServiceSpy = jasmine.createSpyObj('LoginAuthService', [
			'sendCredentials',
			'getTokenClaims'
		]);

		TestBed.configureTestingModule({
			declarations: [LoginPageComponent],
			imports: [RouterTestingModule],
			providers: [FormBuilder, { provide: LoginAuthService, useValue: authServiceSpy }]
		});

		fixture = TestBed.createComponent(LoginPageComponent);
		component = fixture.componentInstance;
		loginAuthServiceSpy = TestBed.inject(LoginAuthService) as jasmine.SpyObj<LoginAuthService>;

		component.ngOnInit();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize form on ngOnInit', () => {
		expect(component.loginForm).toBeDefined();
	});

	it('should call sendCredentials method on form submission', fakeAsync(() => {
		const email = 'test@example.com';
		const password = 'password123';

		component.loginForm.setValue({ email, password });

		loginAuthServiceSpy.sendCredentials.and.returnValue(of('mockToken'));

		component.onSubmit();
		tick();

		expect(loginAuthServiceSpy.sendCredentials).toHaveBeenCalledWith(email, password);
		expect(component.errorSession).toBeFalsy();
	}));

	it('should handle error on form submission', fakeAsync(() => {
		const email = 'test@example.com';
		const password = 'password123';

		component.loginForm.setValue({ email, password });

		loginAuthServiceSpy.sendCredentials.and.returnValue(throwError('Mock error'));

		component.onSubmit();
		tick();

		expect(loginAuthServiceSpy.sendCredentials).toHaveBeenCalledWith(email, password);
		expect(component.errorSession).toBeTruthy();
	}));
});
