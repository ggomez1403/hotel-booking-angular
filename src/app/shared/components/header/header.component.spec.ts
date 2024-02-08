import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { LoginAuthService } from '../../../modules/auth/services/login-auth.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let authService: LoginAuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			providers: [LoginAuthService],
			imports: [HttpClientModule]
		});

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		authService = TestBed.inject(LoginAuthService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize isLoggedIn correctly', () => {
		expect(component.isLoggedIn).toBe(false);
	});

	it('should update isLoggedIn on authenticationChanged event', () => {
		authService.authenticationChanged.emit(true);
		expect(component.isLoggedIn).toBe(false);
	});

	it('should update isLoggedIn based on userInfo$', () => {
		const userInfo = { id: 1, firstName: 'John', lastName: 'Doe', role: 'USER' };
		authService.setUserInfo(userInfo);
		expect(component.isLoggedIn).toBe(false);

		authService.setUserInfo({});
		expect(component.isLoggedIn).toBe(false);
	});

	it('should check if user is admin', () => {
		spyOn(authService, 'isAdmin').and.returnValue(true);
		const isAdmin = component.isAdmin();
		expect(isAdmin).toBe(true);
	});

	afterEach(() => {
		fixture.destroy();
	});
});
