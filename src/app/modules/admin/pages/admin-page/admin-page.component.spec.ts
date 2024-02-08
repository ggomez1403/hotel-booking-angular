import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminPageComponent } from './admin-page.component';

describe('AdminPageComponent', () => {
	let component: AdminPageComponent;
	let fixture: ComponentFixture<AdminPageComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AdminPageComponent]
		});

		fixture = TestBed.createComponent(AdminPageComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should contain a welcome message', () => {
		const welcomeElement = fixture.debugElement.query(By.css('h1'));
		expect(welcomeElement).toBeTruthy();
		expect(welcomeElement.nativeElement.textContent).toContain('Welcome Back Admin');
	});

	it('should contain two navigation links', () => {
		const links = fixture.debugElement.queryAll(By.css('.options-container a'));
		expect(links.length).toBe(2);

		const createRoomLink = links[0].nativeElement.getAttribute('routerLink');
		const allBookingsLink = links[1].nativeElement.getAttribute('routerLink');

		expect(createRoomLink).toBe('/admin/create-room');
		expect(allBookingsLink).toBe('/admin/all-bookings');
	});
});
