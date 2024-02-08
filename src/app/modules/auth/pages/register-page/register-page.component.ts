import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterAuthService } from '../../services/register-auth.service';

@Component({
	selector: 'app-auth-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
	constructor(
		private readonly fb: FormBuilder,
		private registerAuth: RegisterAuthService
	) {}

	public registerForm!: FormGroup;
	public errorRegister: boolean = false;
	public userRole = 'USER';

	ngOnInit(): void {
		this.registerForm = this.initForm();
	}

	onSubmit(): void {
		const { firstName, lastName, email, phoneNumber, password } = this.registerForm.value;
		console.log(firstName, lastName, email, phoneNumber, password);

		this.registerAuth
			.sendRegistrationCredentials(firstName, lastName, email, phoneNumber, password, this.userRole)
			.subscribe(
				(response: any) => {
					console.log('Register completed', response);
				},
				(error) => {
					this.errorRegister = true;
					console.log('Failed to register', error);
				}
			);
	}

	initForm(): FormGroup {
		return this.fb.group({
			firstName: ['', [Validators.required, Validators.minLength(3)]],
			lastName: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			phoneNumber: ['', [Validators.required, Validators.minLength(10)]]
		});
	}

	get name(): AbstractControl | null {
		return this.registerForm.get('firstName');
	}

	get lastName(): AbstractControl | null {
		return this.registerForm.get('lastName');
	}

	get phoneNumber(): AbstractControl | null {
		return this.registerForm.get('phoneNumber');
	}

	get email(): AbstractControl | null {
		return this.registerForm.get('email');
	}

	get password(): AbstractControl | null {
		return this.registerForm.get('password');
	}
}
