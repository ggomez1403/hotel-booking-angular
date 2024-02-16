import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-about-us-page',
	templateUrl: './about-us-page.component.html',
	styleUrls: ['./about-us-page.component.css']
})
export class AboutUsPageComponent implements OnInit {
	ngOnInit(): void {
		window.scrollTo(0, 0);
	}
}
