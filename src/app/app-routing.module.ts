import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './core/guards/session.guard';
import { MainPageComponent } from './modules/home/pages/main-page/main-page.component';

const routes: Routes = [
	{
		path: '',
		component: MainPageComponent
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: 'rooms',
		loadChildren: () => import('./modules/rooms/rooms.module').then((m) => m.RoomsModule),
		canActivate: [SessionGuard]
	},
	{
		path: 'bookings',
		loadChildren: () => import('./modules/bookings/bookings.module').then((m) => m.BookingsModule),
		canActivate: [SessionGuard]
	},
	{
		path: 'admin',
		loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
