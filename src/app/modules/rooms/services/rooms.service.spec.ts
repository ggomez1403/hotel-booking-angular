import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Room } from '../../../core/models/Room.model';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
	let service: RoomsService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [RoomsService]
		});

		service = TestBed.inject(RoomsService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all rooms', () => {
		const mockRooms: Room[] = [
			{
				id: 1,
				imgUrl: 'img1.jpg',
				name: 'Room 1',
				available: true,
				type: 'Standard',
				capacity: 2,
				initialPrice: 100,
				taxesAndFees: 10,
				totalPrice: 110,
				bathroomAmenities: ['Shampoo', 'Soap'],
				bedroomAmenities: ['Air Conditioning', 'TV'],
				entertainmentAmenities: ['Wi-Fi', 'Cable TV'],
				foodAndDrinksAmenities: ['Mini Fridge', 'Coffee Maker'],
				internetAmenities: ['Wi-Fi'],
				moreAmenities: ['Balcony'],
				highlights: ['Mountain View', 'King Size Bed']
			}
		];

		service.getAllRooms().subscribe((rooms) => {
			expect(rooms).toEqual(mockRooms);
		});

		const req = httpTestingController.expectOne(`${environment.api}/room/rooms`);
		expect(req.request.method).toBe('GET');
		req.flush(mockRooms);
	});

	it('should get a single room', () => {
		const mockRoom: Room = {
			id: 1,
			imgUrl: 'img1.jpg',
			name: 'Room 1',
			available: true,
			type: 'Standard',
			capacity: 2,
			initialPrice: 100,
			taxesAndFees: 10,
			totalPrice: 110,
			bathroomAmenities: ['Shampoo', 'Soap'],
			bedroomAmenities: ['Air Conditioning', 'TV'],
			entertainmentAmenities: ['Wi-Fi', 'Cable TV'],
			foodAndDrinksAmenities: ['Mini Fridge', 'Coffee Maker'],
			internetAmenities: ['Wi-Fi'],
			moreAmenities: ['Balcony'],
			highlights: ['Mountain View', 'King Size Bed']
		};

		const roomId = 1;

		service.getSingleRoom(roomId).subscribe((room) => {
			expect(room).toEqual(mockRoom);
		});

		const req = httpTestingController.expectOne(`${environment.api}/room/rooms/${roomId}`);
		expect(req.request.method).toBe('GET');
		req.flush(mockRoom);
	});
});
