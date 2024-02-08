import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsHeroComponent } from './rooms-hero.component';

describe('RoomsHeroComponent', () => {
	let component: RoomsHeroComponent;
	let fixture: ComponentFixture<RoomsHeroComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RoomsHeroComponent]
		});
		fixture = TestBed.createComponent(RoomsHeroComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render the correct title and description', () => {
		const titleElement: HTMLElement = fixture.nativeElement.querySelector('h1');
		const descriptionElement: HTMLElement = fixture.nativeElement.querySelector('p');

		expect(titleElement.textContent).toContain('Rooms and Suites');
		expect(descriptionElement.textContent).toContain(
			'The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design.'
		);
	});

	it('should have a link with the correct icon', () => {
		const linkElement: HTMLElement = fixture.nativeElement.querySelector('a');
		const iconElement: HTMLElement | null = linkElement.querySelector('i');

		expect(linkElement.getAttribute('href')).toEqual('');
		expect(iconElement!.classList).toContain('fa-solid', 'fa-arrow-down-long');
	});
});
