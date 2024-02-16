import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-rooms-page',
	templateUrl: './rooms.component.html',
	styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
	ngOnInit(): void {
		window.scrollTo(0, 0);
	}
}
