import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Room } from '../../../../core/models/Room.model';
import { RoomsService } from '../../services/rooms.service';
import { RoomAmenitiesComponent } from './room-amenities.component';

describe('RoomAmenitiesComponent', () => {
	let component: RoomAmenitiesComponent;
	let fixture: ComponentFixture<RoomAmenitiesComponent>;
	let mockRoomsService: jasmine.SpyObj<RoomsService>;

	beforeEach(() => {
		mockRoomsService = jasmine.createSpyObj('RoomsService', ['getSingleRoom']);

		TestBed.configureTestingModule({
			declarations: [RoomAmenitiesComponent],
			providers: [
				{ provide: RoomsService, useValue: mockRoomsService },
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: { paramMap: { get: () => '1' } }
					}
				}
			]
		});

		fixture = TestBed.createComponent(RoomAmenitiesComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get room info on ngOnInit', () => {
		mockRoomsService.getSingleRoom.and.returnValue(of({} as Room));
		component.ngOnInit();
		expect(mockRoomsService.getSingleRoom).toHaveBeenCalled();
	});

	it('should render room amenities', () => {
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
		mockRoomsService.getSingleRoom.and.returnValue(of(mockRoom));
		fixture.detectChanges();

		const amenitiesElement = fixture.nativeElement.querySelector('.amenities');
		expect(amenitiesElement).toBeTruthy();
	});
});
