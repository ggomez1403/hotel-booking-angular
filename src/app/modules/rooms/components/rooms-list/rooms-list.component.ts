import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../../../../core/models/Room.model';
import { RoomsService } from '../../services/rooms.service';

@Component({
	selector: 'app-rooms-list',
	templateUrl: './rooms-list.component.html',
	styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit, OnDestroy {
	constructor(private roomService: RoomsService) {}

	private subscription?: Subscription;
	public rooms: Room[] = [];

	ngOnInit(): void {
		this.getRoomsInfo();
	}

	getRoomsInfo(): void {
		this.subscription = this.roomService.getAllRooms().subscribe(
			(rooms) => {
				this.rooms = rooms;
			},
			(error) => {
				console.error('Error when making HTTP request: ', error);
			}
		);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
