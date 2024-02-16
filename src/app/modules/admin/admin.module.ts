import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AdminRoutingModule } from './admin-routing.module';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
	declarations: [
		AdminPageComponent,
		CreateRoomComponent,
		LoginAdminComponent,
		RegisterAdminComponent,
		AllUsersComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule
	]
})
export class AdminModule {}
