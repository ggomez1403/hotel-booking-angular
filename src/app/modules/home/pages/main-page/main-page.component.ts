import { Component, OnInit } from '@angular/core';
import { Facility } from '../../interfaces/facility.interface';
import { LuxuryRoom } from '../../interfaces/luxuryRoom.interface';
import { Testimony } from '../../interfaces/testimony.interface';
import { HomeService } from '../../services/home.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
	ngOnInit(): void {
		window.scrollTo(0, 0);
	}

	constructor(private homeService: HomeService) {}

	get facilities(): Facility[] {
		return [...this.homeService.facilities];
	}

	get luxuriousRooms(): LuxuryRoom[] {
		return [...this.homeService.luxuriousRooms];
	}

	get testimonies(): Testimony[] {
		return [...this.homeService.testimonies];
	}
}
