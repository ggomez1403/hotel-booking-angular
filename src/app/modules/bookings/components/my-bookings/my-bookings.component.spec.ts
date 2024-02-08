import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAuthService } from '../../../auth/services/login-auth.service';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { BillService } from '../../services/bill.service';
import { BookingsService } from '../../services/bookings.service';
import { MyBookingsComponent } from './my-bookings.component';

describe('MyBookingsComponent', () => {
	let component: MyBookingsComponent;
	let fixture: ComponentFixture<MyBookingsComponent>;
	let bookingsServiceSpy: jasmine.SpyObj<BookingsService>;
	let roomsServiceSpy: jasmine.SpyObj<RoomsService>;
	let loginAuthServiceSpy: jasmine.SpyObj<LoginAuthService>;
	let billServiceSpy: jasmine.SpyObj<BillService>;

	beforeEach(() => {
		const bookingsServiceSpyObj = jasmine.createSpyObj('BookingsService', [
			'getUserReservations',
			'getSingleReservation',
			'deleteReservation'
		]);
		const roomsServiceSpyObj = jasmine.createSpyObj('RoomsService', ['getSingleRoom']);
		const loginAuthServiceSpyObj = jasmine.createSpyObj('LoginAuthService', ['getTokenClaims']);
		const billServiceSpyObj = jasmine.createSpyObj('BillService', [
			'getBillDetailByReservationId',
			'getBillByBillDetailId',
			'deleteBill',
			'deleteBillDetail'
		]);

		TestBed.configureTestingModule({
			declarations: [MyBookingsComponent],
			providers: [
				{ provide: BookingsService, useValue: bookingsServiceSpyObj },
				{ provide: RoomsService, useValue: roomsServiceSpyObj },
				{ provide: LoginAuthService, useValue: loginAuthServiceSpyObj },
				{ provide: BillService, useValue: billServiceSpyObj }
			]
		});

		fixture = TestBed.createComponent(MyBookingsComponent);
		component = fixture.componentInstance;
		bookingsServiceSpy = TestBed.inject(BookingsService) as jasmine.SpyObj<BookingsService>;
		roomsServiceSpy = TestBed.inject(RoomsService) as jasmine.SpyObj<RoomsService>;
		loginAuthServiceSpy = TestBed.inject(LoginAuthService) as jasmine.SpyObj<LoginAuthService>;
		billServiceSpy = TestBed.inject(BillService) as jasmine.SpyObj<BillService>;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('ngOnInit', () => {
		it('should call getUserInfo and getReservationInfo', () => {
			const getUserInfoSpy = spyOn(component, 'getUserInfo');
			const getReservationInfoSpy = spyOn(component, 'getReservationInfo');

			component.ngOnInit();

			expect(getUserInfoSpy).toHaveBeenCalled();
			expect(getReservationInfoSpy).toHaveBeenCalled();
		});
	});
});
