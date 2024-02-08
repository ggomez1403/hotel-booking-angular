import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getRoomTemplate } from '../../../../core/data-templates/data-templates';
import { Room } from '../../../../core/models/Room.model';
import { RoomsService } from '../../services/rooms.service';

@Component({
	selector: 'app-room-amenities',
	templateUrl: './room-amenities.component.html',
	styleUrls: ['./room-amenities.component.css']
})
export class RoomAmenitiesComponent implements OnInit, OnDestroy {
	constructor(
		private roomService: RoomsService,
		private route: ActivatedRoute
	) {}

	private subscription?: Subscription;
	public room: Room = getRoomTemplate();

	ngOnInit(): void {
		window.scrollTo(0, 0);

		this.getRoomInfo();
	}

	getRoomInfo(): void {
		const roomId = +this.route.snapshot.paramMap.get('id')!;
		this.subscription = this.roomService.getSingleRoom(roomId).subscribe(
			(response) => {
				this.room = response;
			},
			(error) => {
				console.error('Error getting room details: ', error);
			}
		);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
