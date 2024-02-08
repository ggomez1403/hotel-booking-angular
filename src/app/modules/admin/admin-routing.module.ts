import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SessionGuard } from '../../core/guards/session.guard';
import { AllBookingsComponent } from '../bookings/components/all-bookings/all-bookings.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
	{
		path: '',
		component: AdminPageComponent,
		canActivate: [SessionGuard, AuthGuard]
	},
	{
		path: 'all-bookings',
		component: AllBookingsComponent,
		canActivate: [SessionGuard, AuthGuard]
	},
	{
		path: 'create-room',
		component: CreateRoomComponent,
		canActivate: [SessionGuard, AuthGuard]
	},
	{
		path: 'auth/register',
		component: RegisterAdminComponent
	},
	{
		path: 'auth/login',
		component: LoginAdminComponent
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
