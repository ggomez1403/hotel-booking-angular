import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Facility } from '../../interfaces/facility.interface';
import { FacilitiesComponent } from './facilities.component';

describe('FacilitiesComponent', () => {
	let component: FacilitiesComponent;
	let fixture: ComponentFixture<FacilitiesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FacilitiesComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(FacilitiesComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should display facilitiesList correctly', () => {
		const testFacilities: Facility[] = [
			{ icon: 'fa-icon1', name: 'Facility 1' },
			{ icon: 'fa-icon2', name: 'Facility 2' }
		];

		component.facilitiesList = testFacilities;
		fixture.detectChanges();

		const facilityElements = fixture.nativeElement.querySelectorAll('.single-facility');

		expect(facilityElements.length).toBe(testFacilities.length);

		testFacilities.forEach((facility, index) => {
			const facilityElement = facilityElements[index];
			const iconElement = facilityElement.querySelector('.fa-solid');
			const nameElement = facilityElement.querySelector('p');

			expect(iconElement).toBeTruthy();
			expect(nameElement.textContent).toBe(facility.name);
		});
	});
});
