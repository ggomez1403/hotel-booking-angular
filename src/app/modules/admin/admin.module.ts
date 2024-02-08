import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
	declarations: [
		AdminPageComponent,
		CreateRoomComponent,
		LoginAdminComponent,
		RegisterAdminComponent
	],
	imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule]
})
export class AdminModule {}
