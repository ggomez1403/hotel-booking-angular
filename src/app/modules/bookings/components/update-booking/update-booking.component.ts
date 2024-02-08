import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getReservationResponseTemplate } from '../../../../core/data-templates/data-templates';
import { Reservation } from '../../../../core/models/Reservation.model';
import { ReservationResponse } from '../../../../core/models/ReservationResponse.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
	selector: 'app-update-booking',
	templateUrl: './update-booking.component.html',
	styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit, OnDestroy {
	constructor(
		private readonly fb: FormBuilder,
		private bookingService: BookingsService,
		private route: ActivatedRoute
	) {}

	private subscription?: Subscription;

	public reservationId!: number;
	public reservation: ReservationResponse = getReservationResponseTemplate();

	public checkDatesForm!: FormGroup;

	public checkInDate!: string;
	public checkOutDate!: string;

	private startDate: Date = new Date();
	private endDate: Date = new Date();

	public daysDifference: number = 1;

	ngOnInit(): void {
		window.scrollTo(0, 0);

		this.checkDatesForm = this.initForm();

		this.getReservationInfo();
	}

	getReservationInfo(): void {
		this.reservationId = +this.route.snapshot.paramMap.get('id')!;
		this.subscription = this.bookingService
			.getSingleReservation(this.reservationId)
			.subscribe((reservation) => {
				this.reservation = reservation;
			});
	}

	submitReservationData(): void {
		const data: Reservation = {
			id: this.reservationId,
			startDate: this.checkInDate,
			endDate: this.checkOutDate,
			userId: this.reservation.user.id,
			roomId: this.reservation.room.id
		};

		this.bookingService.updateReservation(this.reservationId, data).subscribe(
			() => {
				console.log('Reservation successfully updated:');
			},
			(error) => {
				console.log('Error creating reservation:', error);
			}
		);
	}

	initForm(): FormGroup {
		return this.fb.group({
			checkIn: ['', Validators.required],
			checkOut: ['', Validators.required]
		});
	}

	get checkIn(): AbstractControl | null {
		return this.checkDatesForm.get('checkIn');
	}

	get checkOut(): AbstractControl | null {
		return this.checkDatesForm.get('checkOut');
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
