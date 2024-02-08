import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacilitiesComponent } from '../../components/facilities/facilities.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { LuxuriousRoomsComponent } from '../../components/luxurious-rooms/luxurious-rooms.component';
import { TestimoniesComponent } from '../../components/testimonies/testimonies.component';
import { SharedService } from '../../services/shared-service.service';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
	let component: MainPageComponent;
	let fixture: ComponentFixture<MainPageComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				MainPageComponent,
				HeroComponent,
				FacilitiesComponent,
				LuxuriousRoomsComponent,
				TestimoniesComponent
			],
			providers: [SharedService]
		}).compileComponents();

		fixture = TestBed.createComponent(MainPageComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should have facilities defined', () => {
		expect(component.facilities).toBeDefined();
	});

	it('should have luxuriousRooms defined', () => {
		expect(component.luxuriousRooms).toBeDefined();
	});

	it('should have testimonies defined', () => {
		expect(component.testimonies).toBeDefined();
	});
});
