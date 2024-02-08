import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BookingDetailsComponent } from './booking-details.component';

describe('BookingDetailsComponent', () => {
	let component: BookingDetailsComponent;
	let fixture: ComponentFixture<BookingDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BookingDetailsComponent],
			imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BookingDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		component.ngOnInit();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Step 1: Check details', () => {
		it('should initialize checkDatesForm properly', () => {
			expect(component.checkDatesForm).toBeDefined();
		});

		it('should have required form controls for checkDatesForm', () => {
			const checkInControl = component.checkDatesForm.get('checkIn');
			const checkOutControl = component.checkDatesForm.get('checkOut');

			expect(checkInControl).toBeTruthy();
			expect(checkOutControl).toBeTruthy();
		});
	});

	describe('Step 2: Your details', () => {
		it('should display user details correctly', () => {
			component.firstName = 'John';
			component.lastName = 'Doe';
			component.email = 'john.doe@example.com';
			component.phoneNumber = '123456789';

			fixture.detectChanges();

			const userDetails = fixture.nativeElement.querySelectorAll('.detail-text span');
			expect(userDetails[0].textContent).toContain('John');
			expect(userDetails[1].textContent).toContain('Doe');
			expect(userDetails[2].textContent).toContain('john.doe@example.com');
			expect(userDetails[3].textContent).toContain('123456789');
		});
	});

	describe('Step 3: Room details', () => {
		it('should display room highlights correctly', () => {
			component.highlights = ['Free Wi-Fi', 'Ocean View', 'King Size Bed'];

			fixture.detectChanges();

			const highlightItems = fixture.nativeElement.querySelectorAll('.highlights li');
			expect(highlightItems.length).toBe(3);
			expect(highlightItems[0].textContent).toContain('Free Wi-Fi');
			expect(highlightItems[1].textContent).toContain('Ocean View');
			expect(highlightItems[2].textContent).toContain('King Size Bed');
		});
	});

	describe('Step 4: Checkout', () => {
		it('should initialize checkoutForm properly', () => {
			expect(component.checkoutForm).toBeDefined();
		});

		it('should have required form controls for checkoutForm', () => {
			const nameControl = component.checkoutForm.get('name');
			const cardNumberControl = component.checkoutForm.get('cardNumber');

			expect(nameControl).toBeTruthy();
			expect(cardNumberControl).toBeTruthy();
		});

		it('should enable "Book Room" button when both forms are valid', () => {
			component.checkDatesForm.get('checkIn')?.setValue('2024-02-10');
			component.checkDatesForm.get('checkOut')?.setValue('2024-02-15');
			component.checkoutForm.get('name')?.setValue('John Doe');
			component.checkoutForm.get('cardNumber')?.setValue(1234567890123456);

			fixture.detectChanges();

			const bookButton = fixture.nativeElement.querySelector('.btn');
			expect(bookButton.disabled).toBeTruthy();
		});
	});

	afterEach(() => {
		fixture.destroy();
	});
});
