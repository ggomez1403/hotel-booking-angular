import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Testimony } from '../../interfaces/testimony.interface';
import { TestimoniesComponent } from './testimonies.component';

describe('TestimoniesComponent', () => {
	let component: TestimoniesComponent;
	let fixture: ComponentFixture<TestimoniesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestimoniesComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TestimoniesComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should display testimoniesList correctly', () => {
		const testTestimonies: Testimony[] = [
			{
				date: '2 Mar. 2023',
				stars: [
					'fa-solid fa-star',
					'fa-solid fa-star',
					'fa-solid fa-star',
					'fa-solid fa-star',
					'fa-solid fa-star'
				],
				desc: 'The service at the Paradise View was exceptional...',
				author: 'Anthony Bruff'
			},
			{
				date: '25 Mar. 2023',
				stars: [
					'fa-solid fa-star',
					'fa-solid fa-star',
					'fa-solid fa-star',
					'fa-solid fa-star',
					'fa-regular fa-star-half-stroke'
				],
				desc: 'Our stay at Paradise View was nothing short of exceptional...',
				author: 'Regina Gella'
			}
		];

		component.testimoniesList = testTestimonies;
		fixture.detectChanges();

		const testimonyElements = fixture.nativeElement.querySelectorAll('.single-testimonie');

		expect(testimonyElements.length).toBe(testTestimonies.length);

		testTestimonies.forEach((testimony, index) => {
			const testimonyElement = testimonyElements[index];
			const dateElement = testimonyElement.querySelector('.date span');
			const starsElements = testimonyElement.querySelectorAll('.stars i');
			const descElement = testimonyElement.querySelector('p');
			const authorElement = testimonyElement.querySelector('.author');

			expect(dateElement.textContent).toBe(testimony.date);

			expect(starsElements.length).toBe(testimony.stars.length);
			testimony.stars.forEach((star, starIndex) => {
				expect(starsElements[starIndex].className).toContain(star);
			});

			expect(descElement.textContent).toContain(testimony.desc);
			expect(authorElement.textContent).toBe(testimony.author);
		});
	});
});
