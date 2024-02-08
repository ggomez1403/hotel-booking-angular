import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { UpdateBookingComponent } from './components/update-booking/update-booking.component';

const routes: Routes = [
	{
		path: 'rooms/:id',
		component: BookingDetailsComponent
	},
	{
		path: 'my-bookings',
		component: MyBookingsComponent
	},
	{
		path: 'update-booking/:id',
		component: UpdateBookingComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BookingsRoutingModule {}
