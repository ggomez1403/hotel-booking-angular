import { Component, OnInit } from '@angular/core';
import { Facility } from '../../interfaces/facility.interface';
import { LuxuryRoom } from '../../interfaces/luxuryRoom.interface';
import { Testimony } from '../../interfaces/testimony.interface';
import { SharedService } from '../../services/shared-service.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
	ngOnInit(): void {
		window.scrollTo(0, 0);
	}

	constructor(private sharedService: SharedService) {}

	get facilities(): Facility[] {
		return [...this.sharedService.facilities];
	}

	get luxuriousRooms(): LuxuryRoom[] {
		return [...this.sharedService.luxuriousRooms];
	}

	get testimonies(): Testimony[] {
		return [...this.sharedService.testimonies];
	}
}
