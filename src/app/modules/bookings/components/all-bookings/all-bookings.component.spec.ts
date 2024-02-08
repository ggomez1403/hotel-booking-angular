import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { getReservationResponseTemplate } from '../../../../core/data-templates/data-templates';
import { ReservationResponse } from '../../../../core/models/ReservationResponse.model';
import { BookingsService } from '../../services/bookings.service';
import { AllBookingsComponent } from './all-bookings.component';

describe('AllBookingsComponent', () => {
	let component: AllBookingsComponent;
	let fixture: ComponentFixture<AllBookingsComponent>;
	let mockBookingsService: jasmine.SpyObj<BookingsService>;

	beforeEach(() => {
		mockBookingsService = jasmine.createSpyObj('BookingsService', ['getAllReservations']);

		TestBed.configureTestingModule({
			declarations: [AllBookingsComponent],
			imports: [MatTableModule, MatPaginatorModule, MatSortModule],
			providers: [{ provide: BookingsService, useValue: mockBookingsService }]
		});

		fixture = TestBed.createComponent(AllBookingsComponent);
		component = fixture.componentInstance;
	});

	it('should initialize component', () => {
		expect(component).toBeTruthy();
	});

	it('should call getReservationInfo on ngOnInit', () => {
		spyOn(component, 'getReservationInfo');
		component.ngOnInit();
		expect(component.getReservationInfo).toHaveBeenCalled();
	});

	it('should set reservations and dataSource on getReservationInfo', () => {
		const testData: ReservationResponse[] = [getReservationResponseTemplate()];
		mockBookingsService.getAllReservations.and.returnValue(of(testData));

		component.getReservationInfo();

		expect(component.reservations).toEqual(testData);
		expect(component.dataSource.data).toEqual(testData);
	});
});
