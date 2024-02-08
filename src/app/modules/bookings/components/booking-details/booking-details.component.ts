import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getRoomTemplate } from '../../../../core/data-templates/data-templates';
import { Bill } from '../../../../core/models/Bill.model';
import { BillDetail } from '../../../../core/models/BillDetail.model';
import { BillDetailResponse } from '../../../../core/models/BillDetailResponse.model';
import { Reservation } from '../../../../core/models/Reservation.model';
import { ReservationResponse } from '../../../../core/models/ReservationResponse.model';
import { Room } from '../../../../core/models/Room.model';
import { LoginAuthService } from '../../../auth/services/login-auth.service';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { BillService } from '../../services/bill.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
	selector: 'app-booking-details',
	templateUrl: './booking-details.component.html',
	styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit, OnDestroy {
	constructor(
		private readonly fb: FormBuilder,
		private roomService: RoomsService,
		private route: ActivatedRoute,
		private loginService: LoginAuthService,
		private bookingService: BookingsService,
		private billDetailService: BillService
	) {}

	private subscription?: Subscription;

	public roomId!: number;
	public room: Room = getRoomTemplate();

	public highlights: string[] = [];

	public checkDatesForm!: FormGroup;
	public checkoutForm!: FormGroup;

	public userId!: number;

	private userInfoId?: number;
	public firstName?: string;
	public lastName?: string;
	public email?: string;
	public phoneNumber?: string;

	private reservationId!: number;
	private billDetailId!: number;

	private userInfoSubscription?: Subscription;

	public checkInDate!: string;
	public checkOutDate!: string;

	private startDate: Date = new Date();
	private endDate: Date = new Date();

	public daysDifference: number = 1;

	private reservations: ReservationResponse[] = [];
	private billDetails: BillDetailResponse[] = [];

	ngOnInit(): void {
		window.scrollTo(0, 0);

		this.getUserInfo();

		this.checkDatesForm = this.initCheckDatesForm();
		this.checkoutForm = this.initCheckoutForm();

		this.getRoomInfo();
	}

	getUserInfo(): void {
		this.userInfoSubscription = this.loginService.userInfo$.subscribe((userInfo) => {
			this.userInfoId = userInfo.id;
			this.firstName = userInfo.firstName;
			this.lastName = userInfo.lastName;
			this.email = userInfo.sub;
			this.phoneNumber = userInfo.phoneNumber;
		});

		this.loginService.getTokenClaims();

		this.userId = this.userInfoId!;
	}

	getRoomInfo(): void {
		this.roomId = +this.route.snapshot.paramMap.get('id')!;
		this.subscription = this.roomService.getSingleRoom(this.roomId).subscribe(
			(response) => {
				this.room = response;
				this.highlights = response.highlights;
			},
			(error) => {
				console.error('Error getting room details: ', error);
			}
		);
	}

	submitReservationData(): void {
		const reservationData: Reservation = {
			id: 0,
			startDate: this.checkInDate,
			endDate: this.checkOutDate,
			userId: this.userId,
			roomId: this.roomId
		};

		this.bookingService.createReservation(reservationData).subscribe(
			() => {
				console.log('Reservation successfully created');
				this.getReservationInfo();
			},
			(error) => {
				console.log('Error creating reservation:', error);
			}
		);
	}

	getReservationInfo(): void {
		this.subscription = this.bookingService.getSingleReservationByUserId(this.userId).subscribe(
			(response) => {
				this.reservations = response;
				for (let reservation of this.reservations) {
					this.reservationId = reservation.id;
				}
				const billDetailData: BillDetail = {
					reservationId: this.reservationId,
					description: `${this.room.name} room reservation / ${this.checkInDate} to ${this.checkOutDate}`
				};
				this.createBillDetail(billDetailData);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	createBillDetail(billDetailData: BillDetail): void {
		this.subscription = this.billDetailService.createBillDetail(billDetailData).subscribe(
			() => {
				console.log('Bill detail successfully created');
				this.getBillDetailInfo();
			},
			(error) => {
				console.error('Error creating bill detail: ', error);
			}
		);
	}

	getBillDetailInfo(): void {
		this.subscription = this.billDetailService
			.getBillDetailByReservationId(this.reservationId)
			.subscribe(
				(response) => {
					this.billDetails = response;
					for (let billDetail of this.billDetails) {
						this.billDetailId = billDetail.id;
					}
					const billData: Bill = {
						issuedDate: this.formatDate(new Date()),
						billDetailId: this.billDetailId
					};
					this.createBill(billData);
				},
				(error) => {
					console.error('Error creating bill', error);
				}
			);
	}

	formatDate(date: Date): string {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}`;

		return formattedDate;
	}

	createBill(billData: Bill): void {
		console.log(billData);
		this.subscription = this.billDetailService.createBill(billData).subscribe(
			() => {
				console.log('Bill successfully created');
			},
			(error) => {
				console.error('Error creating bill: ', error);
			}
		);
	}

	initCheckDatesForm(): FormGroup {
		return this.fb.group({
			checkIn: ['', Validators.required],
			checkOut: ['', Validators.required]
		});
	}

	initCheckoutForm(): FormGroup {
		return this.fb.group({
			name: ['', [Validators.required, Validators.minLength(3)]],
			cardNumber: [
				'',
				[Validators.required, Validators.min(1000000000000), Validators.max(999999999999999999)]
			],
			expMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
			expYear: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
			cvcNumber: ['', [Validators.required, Validators.min(0), Validators.max(999)]]
		});
	}

	get checkIn(): AbstractControl | null {
		return this.checkDatesForm.get('checkIn');
	}

	get checkOut(): AbstractControl | null {
		return this.checkDatesForm.get('checkOut');
	}

	get name(): AbstractControl | null {
		return this.checkoutForm.get('name');
	}

	get cardNumber(): AbstractControl | null {
		return this.checkoutForm.get('cardNumber');
	}

	get expMonth(): AbstractControl | null {
		return this.checkoutForm.get('expMonth');
	}

	get expYear(): AbstractControl | null {
		return this.checkoutForm.get('expYear');
	}

	get cvcNumber(): AbstractControl | null {
		return this.checkoutForm.get('cvcNumber');
	}

	onCheckInChange(event: Event): void {
		this.checkInDate = (event.target as HTMLInputElement).value;
		this.startDate = new Date(this.checkInDate);
		this.calculateDiff(this.startDate, this.endDate);
	}

	onCheckOutChange(event: Event): void {
		this.checkOutDate = (event.target as HTMLInputElement).value;
		this.endDate = new Date(this.checkOutDate);
		this.calculateDiff(this.startDate, this.endDate);
	}

	calculateDiff(startDate: Date, endDate: Date): void {
		const milisDiff = endDate.getTime() - startDate.getTime();
		this.daysDifference = Math.floor(milisDiff / (1000 * 60 * 60 * 24));
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
