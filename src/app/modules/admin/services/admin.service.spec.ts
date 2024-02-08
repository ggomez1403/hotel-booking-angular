import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { Room } from '../../../core/models/Room.model';
import { AdminService } from './admin.service';

describe('AdminService', () => {
	let service: AdminService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [AdminService]
		});

		service = TestBed.inject(AdminService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('createRoom', () => {
		it('should send a POST request to create a room', () => {
			const dummyRoom: Room = {
				id: 1,
				imgUrl: 'dummyImageUrl',
				name: 'Dummy Room',
				available: true,
				type: 'Single',
				capacity: 2,
				initialPrice: 100,
				taxesAndFees: 10,
				totalPrice: 110,
				bathroomAmenities: [],
				bedroomAmenities: [],
				entertainmentAmenities: [],
				foodAndDrinksAmenities: [],
				internetAmenities: [],
				moreAmenities: [],
				highlights: []
			};

			service.createRoom(dummyRoom).subscribe();

			const req = httpMock.expectOne(`${environment.api}/room/rooms`);
			expect(req.request.method).toBe('POST');
			expect(req.request.body).toEqual(dummyRoom);

			req.flush({});
		});
	});
});
