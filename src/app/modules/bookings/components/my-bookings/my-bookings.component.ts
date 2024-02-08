import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillDetailResponse } from '../../../../core/models/BillDetailResponse.model';
import { BillResponse } from '../../../../core/models/BillResponse.model';
import { Reservation } from '../../../../core/models/Reservation.model';
import { ReservationResponse } from '../../../../core/models/ReservationResponse.model';
import { LoginAuthService } from '../../../auth/services/login-auth.service';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { BillService } from '../../services/bill.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
	selector: 'app-my-bookings',
	templateUrl: './my-bookings.component.html',
	styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit, OnDestroy {
	constructor(
		private bookingService: BookingsService,
		private roomsService: RoomsService,
		private loginService: LoginAuthService,
		private billService: BillService
	) {}

	private subscription?: Subscription;
	private userInfoSubscription?: Subscription;

	private userId?: number;

	private roomId?: number;
	public roomImgUrl!: string;
	public roomName!: string;

	public reservationId!: number;

	public reservations: ReservationResponse[] = [];

	ngOnInit(): void {
		window.scrollTo(0, 0);

		this.getUserInfo();

		this.getReservationInfo();
	}

	getUserInfo(): void {
		this.userInfoSubscription = this.loginService.userInfo$.subscribe((userInfo) => {
			this.userId = userInfo.id;
		});

		this.loginService.getTokenClaims();
	}

	getReservationInfo(): void {
		this.subscription = this.bookingService.getUserReservations(this.userId!).subscribe(
			(reservations) => {
				this.reservations = reservations;
				for (let reservation of reservations) {
					this.roomId = reservation.room.id;
					this.subscription = this.roomsService.getSingleRoom(this.roomId!).subscribe((room) => {
						this.roomImgUrl = room.imgUrl;
						this.roomName = room.name;
					});
				}
			},
			(error) => {
				console.error(error);
			}
		);
	}

	cancelBooking(reservationId: number): void {
		this.getReservationData(reservationId);
	}

	getReservationData(reservationId: number): void {
		this.subscription = this.bookingService
			.getSingleReservation(reservationId)
			.subscribe((reservation) => {
				this.getBillDetailByReservationId(reservationId, reservation);
			});
	}

	getBillDetailByReservationId(reservationId: number, reservation: Reservation): void {
		this.subscription = this.billService
			.getBillDetailByReservationId(reservation.id)
			.subscribe((billDetails) => {
				for (let billDetail of billDetails) {
					this.getBillByBillDetailId(reservationId, billDetail);
				}
			});
	}

	getBillByBillDetailId(reservationId: number, billDetail: BillDetailResponse): void {
		this.subscription = this.billService.getBillByBillDetailId(billDetail.id).subscribe((bills) => {
			for (let bill of bills) {
				this.deleteBill(bill, billDetail, reservationId);
			}
		});
	}

	deleteBill(bill: BillResponse, billDetail: BillDetailResponse, reservationId: number): void {
		this.subscription = this.billService.deleteBill(bill.id).subscribe(
			() => {
				console.log('Bill deleted successfully');
				this.deleteBillDetail(billDetail, reservationId);
			},
			(error) => {
				console.error('Error deleting bill: ', error);
			}
		);
	}

	deleteBillDetail(billDetail: BillDetailResponse, reservationId: number): void {
		this.subscription = this.billService.deleteBillDetail(billDetail.id).subscribe(
			() => {
				console.log('Bill detail deleted successfully');
				this.deleteReservation(reservationId);
			},
			(error) => {
				console.error('Error deleting bill detail: ', error);
			}
		);
	}

	deleteReservation(reservationId: number): void {
		this.subscription = this.bookingService.deleteReservation(reservationId).subscribe(
			() => {
				console.log('Reservation deleted successfully');
				this.reservations = this.reservations.filter((i) => i.id !== reservationId);
			},
			(error) => {
				console.error('Error deleting reservation: ', error);
			}
		);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
