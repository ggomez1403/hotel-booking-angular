import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { BookingsService } from './bookings.service';

describe('BookingsService', () => {
	let service: BookingsService;
	let httpTestingController: HttpTestingController;
	let apiUrl = environment.api;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [BookingsService]
		});

		service = TestBed.inject(BookingsService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should create a reservation', () => {
		const reservationData = {
			id: 1,
			startDate: '2022-03-01',
			endDate: '2022-03-05',
			userId: 123,
			roomId: 456
		};

		service.createReservation(reservationData).subscribe();

		const req = httpTestingController.expectOne(`${apiUrl}/reservation/reservations`);
		expect(req.request.method).toEqual('POST');
		expect(req.request.body).toEqual(reservationData);

		req.flush({});
	});

	it('should get user reservations', () => {
		const userId = 123;

		service.getUserReservations(userId).subscribe();

		const req = httpTestingController.expectOne(`${apiUrl}/reservation?userId=${userId}`);
		expect(req.request.method).toEqual('GET');

		req.flush([]);
	});
});
