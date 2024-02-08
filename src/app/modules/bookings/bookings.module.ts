import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { BookingsRoutingModule } from './bookings-routing.module'
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component'
import { BookingDetailsComponent } from './components/booking-details/booking-details.component'
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { UpdateBookingComponent } from './components/update-booking/update-booking.component'

@NgModule({
	declarations: [BookingDetailsComponent, MyBookingsComponent, AllBookingsComponent, UpdateBookingComponent],
	imports: [
		CommonModule,
		BookingsRoutingModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule
	],
	providers: []
})
export class BookingsModule {}
