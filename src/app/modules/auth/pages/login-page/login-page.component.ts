import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginAuthService } from '../../services/login-auth.service';

@Component({
	selector: 'app-auth-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
	constructor(
		private readonly fb: FormBuilder,
		private loginAuthService: LoginAuthService
	) {}
	subscription?: Subscription;
	errorSession: boolean = false;
	loginForm!: FormGroup;

	ngOnInit(): void {
		window.scrollTo(0, 0);

		this.loginForm = this.initForm();
		this.loginAuthService.getTokenClaims();
	}

	onSubmit(): void {
		const { email, password } = this.loginForm.value;
		this.subscription = this.loginAuthService.sendCredentials(email, password).subscribe(
			(response) => {
				console.log('the user has been logged in', response);
			},
			(error) => {
				this.errorSession = true;
				console.log('the user could not be logged in', error);
			}
		);
	}

	initForm(): FormGroup {
		return this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	get email(): AbstractControl | null {
		return this.loginForm.get('email');
	}

	get password(): AbstractControl | null {
		return this.loginForm.get('password');
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
