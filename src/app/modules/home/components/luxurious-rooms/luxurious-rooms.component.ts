import { Component, Input } from '@angular/core'
import { LuxuryRoom } from '../../interfaces/luxuryRoom.interface'

@Component({
	selector: 'app-home-luxurious-rooms',
	templateUrl: './luxurious-rooms.component.html',
	styleUrls: ['./luxurious-rooms.component.css']
})
export class LuxuriousRoomsComponent {
	@Input()
	public luxuriousRoomsList: LuxuryRoom[] = [
		{
			imgSrc: '',
			desc: '',
			name: ''
		}
	]
}
