import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomsHeroComponent } from './components/rooms-hero/rooms-hero.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomsComponent } from './pages/rooms/rooms.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AllRoomsComponent } from './components/all-rooms/all-rooms.component';
import { RoomAmenitiesComponent } from './components/room-amenities/room-amenities.component';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
	declarations: [
		RoomDetailsComponent,
		RoomsHeroComponent,
		RoomsListComponent,
		RoomsComponent,
		RoomAmenitiesComponent,
		AllRoomsComponent
	],
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		RoomsRoutingModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule
	]
})
export class RoomsModule {}
