import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterAuthService } from '../../../auth/services/register-auth.service';
import { RegisterAdminComponent } from './register-admin.component';

describe('RegisterAdminComponent', () => {
	let component: RegisterAdminComponent;
	let fixture: ComponentFixture<RegisterAdminComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RegisterAdminComponent],
			imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
			providers: [RegisterAuthService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterAdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a form with required controls', () => {
		expect(component.registerForm.get('firstName')).toBeTruthy();
		expect(component.registerForm.get('lastName')).toBeTruthy();
		expect(component.registerForm.get('phoneNumber')).toBeTruthy();
		expect(component.registerForm.get('email')).toBeTruthy();
		expect(component.registerForm.get('password')).toBeTruthy();
	});

	afterEach(() => {
		fixture.destroy();
	});
});
