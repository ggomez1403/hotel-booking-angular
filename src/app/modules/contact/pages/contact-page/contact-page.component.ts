import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-contact-page',
	templateUrl: './contact-page.component.html',
	styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
	constructor(private readonly fb: FormBuilder) {}
	contactForm!: FormGroup;

	ngOnInit(): void {
		window.scrollTo(0, 0);
		this.contactForm = this.initForm();
	}

	onSubmit(): void {
		this.fullName?.reset();
		this.email?.reset();
		this.message?.reset();
	}

	initForm(): FormGroup {
		return this.fb.group({
			fullName: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.email]],
			message: ['', [Validators.required, Validators.minLength(5)]]
		});
	}

	get fullName(): AbstractControl | null {
		return this.contactForm.get('fullName');
	}

	get email(): AbstractControl | null {
		return this.contactForm.get('email');
	}

	get message(): AbstractControl | null {
		return this.contactForm.get('message');
	}
}
