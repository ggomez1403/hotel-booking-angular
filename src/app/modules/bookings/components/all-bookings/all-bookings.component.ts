import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ReservationResponse } from '../../../../core/models/ReservationResponse.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
	selector: 'app-all-bookings',
	templateUrl: './all-bookings.component.html',
	styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit, OnDestroy {
	subscription?: Subscription;
	displayedColumns: string[] = [
		'id',
		'user.firstName',
		'user.lastName',
		'room.name',
		'room.type',
		'startDate',
		'endDate',
		'amount'
	];

	dataSource!: MatTableDataSource<ReservationResponse>;

	reservations: ReservationResponse[] = [];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private bookingsService: BookingsService) {}

	ngOnInit(): void {
		window.scrollTo(0, 0);

		this.getReservationInfo();
	}

	getReservationInfo(): void {
		this.subscription = this.bookingsService
			.getAllReservations()
			.subscribe((data: ReservationResponse[]) => {
				this.reservations = data;
				this.dataSource = new MatTableDataSource(data);
				setTimeout(() => {
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				});
			});
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
