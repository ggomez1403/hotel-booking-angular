import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxuryRoom } from '../../interfaces/luxuryRoom.interface';
import { LuxuriousRoomsComponent } from './luxurious-rooms.component';

describe('LuxuriousRoomsComponent', () => {
	let component: LuxuriousRoomsComponent;
	let fixture: ComponentFixture<LuxuriousRoomsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LuxuriousRoomsComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(LuxuriousRoomsComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should display luxuriousRoomsList correctly', () => {
		const testLuxuriousRooms: LuxuryRoom[] = [
			{ imgSrc: 'img1.jpg', desc: 'Luxurious room with amenities', name: 'Room 1' },
			{ imgSrc: 'img2.jpg', desc: 'Another luxurious room description', name: 'Room 2' }
		];

		component.luxuriousRoomsList = testLuxuriousRooms;
		fixture.detectChanges();

		const roomElements = fixture.nativeElement.querySelectorAll('.single-room');

		expect(roomElements.length).toBe(testLuxuriousRooms.length);

		testLuxuriousRooms.forEach((room, index) => {
			const roomElement = roomElements[index];
			const imageElement = roomElement.querySelector('img');
			const descElement = roomElement.querySelector('p');

			expect(imageElement).toBeTruthy();
			expect(imageElement.getAttribute('src')).toBe(room.imgSrc);
			expect(imageElement.getAttribute('alt')).toBe(room.name);

			expect(descElement.textContent).toBe(room.desc);
		});
	});
});
