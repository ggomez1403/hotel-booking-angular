import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent, HeaderComponent, FooterComponent],
			imports: [HttpClientModule, AppRoutingModule]
		});
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});

	it('should render app-header, router-outlet, and app-footer', () => {
		fixture.detectChanges();
		const compiled = fixture.nativeElement;

		expect(compiled.querySelector('app-header')).toBeTruthy();
		expect(compiled.querySelector('router-outlet')).toBeTruthy();
		expect(compiled.querySelector('app-footer')).toBeTruthy();
	});

	it('should have title set to "hotel-booking-angular"', () => {
		expect(component.title).toBe('hotel-booking-angular');
	});
});
