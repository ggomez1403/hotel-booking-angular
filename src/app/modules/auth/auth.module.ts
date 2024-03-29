import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { RegisterPageComponent } from './pages/register-page/register-page.component'

@NgModule({
	declarations: [LoginPageComponent, RegisterPageComponent],
	imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
	exports: [LoginPageComponent, RegisterPageComponent]
})
export class AuthModule {}
