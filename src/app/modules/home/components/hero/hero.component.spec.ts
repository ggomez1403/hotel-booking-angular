import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
	let component: HeroComponent;
	let fixture: ComponentFixture<HeroComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HeroComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(HeroComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should display information and image correctly', () => {
		fixture.detectChanges();

		const titleElement = fixture.nativeElement.querySelector('h1');
		const subtitleElement = fixture.nativeElement.querySelector('h3');
		const descriptionElement = fixture.nativeElement.querySelector('p');
		const bookNowButton = fixture.nativeElement.querySelector('.btn[routerLink="/rooms"]');
		const takeATourButton = fixture.nativeElement.querySelector('.btn[href=""]');

		const imageElement = fixture.nativeElement.querySelector('img');
		const imageUrl = 'https://i.imgur.com/d4oRWHz.png';

		expect(titleElement.textContent).toBe('Paradise View');
		expect(subtitleElement.textContent).toBe('Hotel for every moment rich in emotion');
		expect(descriptionElement.textContent).toBe(
			'Every moment feels like the first time in paradise view'
		);

		expect(bookNowButton.textContent).toBe('Book Now');
		expect(bookNowButton.getAttribute('routerLink')).toBe('/rooms');

		expect(takeATourButton.textContent).toBe('Take a tour');
		expect(takeATourButton.getAttribute('href')).toBe('');

		expect(imageElement).toBeTruthy();
		expect(imageElement.getAttribute('src')).toBe(imageUrl);
		expect(imageElement.getAttribute('alt')).toBe('main page background');
	});
});
