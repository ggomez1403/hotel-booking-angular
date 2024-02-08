import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RegisterAuthService } from '../../services/register-auth.service';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
	let component: RegisterPageComponent;
	let fixture: ComponentFixture<RegisterPageComponent>;
	let registerAuthServiceSpy: jasmine.SpyObj<RegisterAuthService>;

	beforeEach(() => {
		const authServiceSpy = jasmine.createSpyObj('RegisterAuthService', [
			'sendRegistrationCredentials'
		]);

		TestBed.configureTestingModule({
			declarations: [RegisterPageComponent],
			imports: [RouterTestingModule],
			providers: [FormBuilder, { provide: RegisterAuthService, useValue: authServiceSpy }]
		});

		fixture = TestBed.createComponent(RegisterPageComponent);
		component = fixture.componentInstance;
		registerAuthServiceSpy = TestBed.inject(
			RegisterAuthService
		) as jasmine.SpyObj<RegisterAuthService>;

		component.ngOnInit();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize form on ngOnInit', () => {
		component.ngOnInit();
		expect(component.registerForm).toBeDefined();
	});

	it('should call sendRegistrationCredentials method on form submission', fakeAsync(() => {
		const formData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phoneNumber: '1234567890',
			password: 'password123'
		};

		component.registerForm.setValue(formData);

		registerAuthServiceSpy.sendRegistrationCredentials.and.returnValue(of('mockToken'));

		component.onSubmit();
		tick();

		expect(registerAuthServiceSpy.sendRegistrationCredentials).toHaveBeenCalledWith(
			formData.firstName,
			formData.lastName,
			formData.email,
			formData.phoneNumber,
			formData.password,
			component.userRole
		);
		expect(component.errorRegister).toBeFalsy();
	}));

	it('should handle error on form submission', fakeAsync(() => {
		const formData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phoneNumber: '1234567890',
			password: 'password123'
		};

		component.registerForm.setValue(formData);

		registerAuthServiceSpy.sendRegistrationCredentials.and.returnValue(throwError('Mock error'));

		component.onSubmit();
		tick();

		expect(registerAuthServiceSpy.sendRegistrationCredentials).toHaveBeenCalledWith(
			formData.firstName,
			formData.lastName,
			formData.email,
			formData.phoneNumber,
			formData.password,
			component.userRole
		);
		expect(component.errorRegister).toBeTruthy();
	}));
});
