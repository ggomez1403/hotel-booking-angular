import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RoomDetailsComponent } from './components/room-details/room-details.component'
import { RoomsHeroComponent } from './components/rooms-hero/rooms-hero.component'
import { RoomsListComponent } from './components/rooms-list/rooms-list.component'
import { RoomsComponent } from './pages/rooms/rooms.component'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { RoomAmenitiesComponent } from './components/room-amenities/room-amenities.component'
import { RoomsRoutingModule } from './rooms-routing.module'

@NgModule({
	declarations: [
		RoomDetailsComponent,
		RoomsHeroComponent,
		RoomsListComponent,
		RoomsComponent,
		RoomAmenitiesComponent
	],
	imports: [CommonModule, MatCardModule, MatButtonModule, RoomsRoutingModule]
})
export class RoomsModule {}
