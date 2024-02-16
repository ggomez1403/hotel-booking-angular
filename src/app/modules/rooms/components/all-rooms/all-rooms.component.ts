import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Room } from '../../../../core/models/Room.model';
import { RoomsService } from '../../services/rooms.service';

@Component({
	selector: 'app-all-rooms',
	templateUrl: './all-rooms.component.html',
	styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit, OnDestroy {
	subscription?: Subscription;
	displayedColumns: string[] = [
		'id',
		'name',
		'available',
		'capacity',
		'type',
		'imgUrl',
		'initialPrice',
		'taxesAndFees',
		'totalPrice',
		'bathroomAmenities',
		'bedroomAmenities',
		'entertainmentAmenities',
		'foodAndDrinksAmenities',
		'internetAmenities',
		'moreAmenities',
		'highlights'
	];
	dataSource!: MatTableDataSource<Room>;

	rooms: Room[] = [];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private roomsService: RoomsService) {}

	ngOnInit(): void {
		window.scrollTo(0, 0);
		this.getRoomsInfo();
	}

	getRoomsInfo(): void {
		this.subscription = this.roomsService.getAllRooms().subscribe((data: Room[]) => {
			this.rooms = data;
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
