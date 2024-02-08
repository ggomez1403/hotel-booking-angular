import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginAuthService } from '../../../auth/services/login-auth.service';
import { LoginAdminComponent } from './login-admin.component';

describe('LoginAdminComponent', () => {
	let component: LoginAdminComponent;
	let fixture: ComponentFixture<LoginAdminComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginAdminComponent],
			imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
			providers: [LoginAuthService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginAdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a form with required controls', () => {
		expect(component.loginForm.get('email')).toBeTruthy();
		expect(component.loginForm.get('password')).toBeTruthy();
	});

	afterEach(() => {
		fixture.destroy();
	});
});
