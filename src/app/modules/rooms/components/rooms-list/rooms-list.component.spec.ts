import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Room } from '../../../../core/models/Room.model';
import { RoomsService } from '../../services/rooms.service';
import { RoomsListComponent } from './rooms-list.component';

describe('RoomsListComponent', () => {
	let component: RoomsListComponent;
	let fixture: ComponentFixture<RoomsListComponent>;
	let roomsServiceSpy: jasmine.SpyObj<RoomsService>;

	beforeEach(() => {
		const spy = jasmine.createSpyObj('RoomsService', ['getAllRooms']);
		TestBed.configureTestingModule({
			declarations: [RoomsListComponent],
			providers: [{ provide: RoomsService, useValue: spy }]
		});
		fixture = TestBed.createComponent(RoomsListComponent);
		component = fixture.componentInstance;
		roomsServiceSpy = TestBed.inject(RoomsService) as jasmine.SpyObj<RoomsService>;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get rooms from the service', () => {
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
		roomsServiceSpy.getAllRooms.and.returnValue(of(mockRooms));
		component.getRoomsInfo();
		expect(component.rooms).toEqual(mockRooms);
	});

	it('should handle error when getting rooms', () => {
		const error = 'Error fetching rooms';
		roomsServiceSpy.getAllRooms.and.returnValue(
			new Observable((observer) => observer.error(error))
		);
		spyOn(console, 'error');
		component.getRoomsInfo();
		expect(console.error).toHaveBeenCalledWith('Error when making HTTP request: ', error);
	});
});
