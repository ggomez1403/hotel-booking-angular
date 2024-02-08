import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsHeroComponent } from '../../components/rooms-hero/rooms-hero.component';
import { RoomsListComponent } from '../../components/rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms.component';

describe('RoomsComponent', () => {
	let component: RoomsComponent;
	let fixture: ComponentFixture<RoomsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RoomsComponent, RoomsHeroComponent, RoomsListComponent],
			imports: [HttpClientTestingModule]
		});

		fixture = TestBed.createComponent(RoomsComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render app-rooms-hero', () => {
		const heroElement = fixture.nativeElement.querySelector('app-rooms-hero');
		expect(heroElement).toBeTruthy();
	});

	it('should render app-rooms-list', () => {
		const listElement = fixture.nativeElement.querySelector('app-rooms-list');
		expect(listElement).toBeTruthy();
	});
});
