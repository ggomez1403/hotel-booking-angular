import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Room } from '../../../../core/models/Room.model';
import { RoomsService } from '../../services/rooms.service';
import { RoomAmenitiesComponent } from '../room-amenities/room-amenities.component';
import { RoomDetailsComponent } from './room-details.component';

describe('RoomDetailsComponent', () => {
	let component: RoomDetailsComponent;
	let fixture: ComponentFixture<RoomDetailsComponent>;
	let mockRoomsService: jasmine.SpyObj<RoomsService>;

	beforeEach(() => {
		mockRoomsService = jasmine.createSpyObj('RoomsService', ['getSingleRoom']);

		TestBed.configureTestingModule({
			declarations: [RoomDetailsComponent, RoomAmenitiesComponent],
			providers: [
				{ provide: RoomsService, useValue: mockRoomsService },
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: { paramMap: { get: () => '1' } }
					}
				}
			],
			imports: [RouterTestingModule]
		});

		fixture = TestBed.createComponent(RoomDetailsComponent);
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

	it('should render room details', () => {
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

		const roomNameElement = fixture.nativeElement.querySelector('h1');
		const roomImgElement = fixture.nativeElement.querySelector('img');
		const priceSummaryElement = fixture.nativeElement.querySelector('.price-summary');

		expect(roomNameElement.textContent).toContain(mockRoom.name);
		expect(roomImgElement.src).toContain(mockRoom.imgUrl);
	});
});
