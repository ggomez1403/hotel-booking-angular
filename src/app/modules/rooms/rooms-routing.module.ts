import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoomDetailsComponent } from './components/room-details/room-details.component'
import { RoomsComponent } from './pages/rooms/rooms.component'

const routes: Routes = [
	{ path: '', component: RoomsComponent },
	{ path: ':id', component: RoomDetailsComponent }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoomsRoutingModule {}
