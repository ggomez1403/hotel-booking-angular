import { Component, Input } from '@angular/core'
import { Testimony } from '../../interfaces/testimony.interface'

@Component({
	selector: 'app-home-testimonies',
	templateUrl: './testimonies.component.html',
	styleUrls: ['./testimonies.component.css']
})
export class TestimoniesComponent {
	@Input()
	public testimoniesList: Testimony[] = [
		{
			date: '',
			stars: [''],
			desc: '',
			author: ''
		}
	]
}
