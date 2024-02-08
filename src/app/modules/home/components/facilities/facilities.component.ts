import { Component, Input } from '@angular/core'
import { Facility } from '../../interfaces/facility.interface'

@Component({
	selector: 'app-home-facilities',
	templateUrl: './facilities.component.html',
	styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent {
	@Input()
	public facilitiesList: Facility[] = [
		{
			icon: '',
			name: ''
		}
	]
}
