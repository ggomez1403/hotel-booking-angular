import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ReservationResponse } from '../../../../core/models/ReservationResponse.model';
import { BookingsService } from '../../services/bookings.service';
import { UpdateBookingComponent } from './update-booking.component';

describe('UpdateBookingComponent', () => {
	let component: UpdateBookingComponent;
	let fixture: ComponentFixture<UpdateBookingComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [UpdateBookingComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } }
				},
				BookingsService
			],
			imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(UpdateBookingComponent);
		component = fixture.componentInstance;
	});

	it('should initialize the form correctly', () => {
		const form = component.initForm();
		expect(form.get('checkIn')).toBeDefined();
		expect(form.get('checkOut')).toBeDefined();
	});

	it('should mark the form controls as required', () => {
		const form = component.initForm();
		const checkInControl = form.get('checkIn');
		const checkOutControl = form.get('checkOut');

		expect(checkInControl?.hasError('required')).toBeTruthy();
		expect(checkOutControl?.hasError('required')).toBeTruthy();
	});

	it('should calculate the difference between two dates', () => {
		const startDate = new Date('2024-02-08');
		const endDate = new Date('2024-02-10');

		component.calculateDiff(startDate, endDate);

		expect(component.daysDifference).toEqual(2);
	});

	it('should submit reservation data successfully', () => {
		const mockReservationData = {
			id: 1,
			startDate: '2024-02-08',
			endDate: '2024-02-10',
			userId: 123,
			roomId: 456
		};

		const bookingService = (component as any).bookingService;

		spyOn(bookingService, 'updateReservation').and.returnValue(of({}));

		component.reservationId = mockReservationData.id;
		component.checkInDate = mockReservationData.startDate;
		component.checkOutDate = mockReservationData.endDate;
		component.reservation = {
			user: { id: mockReservationData.userId },
			room: { id: mockReservationData.roomId }
		} as ReservationResponse;

		component.submitReservationData();

		expect(bookingService.updateReservation).toHaveBeenCalledWith(
			mockReservationData.id,
			mockReservationData
		);
	});
});
