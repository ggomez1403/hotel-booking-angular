import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';

@Component({
	selector: 'app-create-room',
	templateUrl: './create-room.component.html',
	styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
	constructor(
		private readonly fb: FormBuilder,
		private adminService: AdminService
	) {}

	private subscription!: Subscription;

	private roomName!: string;
	private imageUrl!: string;
	private roomType!: string;
	private roomInitialPrice!: number;
	private roomCapacity!: number;
	private roomTaxesAndFees!: number;
	private bathroomArray!: string[];
	private bedroomArray!: string[];
	private entertainmentArray!: string[];
	private foodAndDrinksArray!: string[];
	private internetArray!: string[];
	private moreArray!: string[];
	private highlightsArray!: string[];

	public createRoomForm!: FormGroup;

	ngOnInit(): void {
		window.scrollTo(0, 0);
		this.createRoomForm = this.initForm();
	}

	getFormData(): void {
		this.roomName = this.name!.value;
		this.imageUrl = this.imgUrl!.value;
		this.roomType = this.type!.value;
		this.roomInitialPrice = parseInt(this.initialPrice!.value);
		this.roomCapacity = parseInt(this.capacity!.value);
		this.roomTaxesAndFees = parseInt(this.taxesAndFees!.value);
		this.bathroomArray = this.bathroom?.value.split(',').map((item: string) => item.trim());
		this.bedroomArray = this.bedroom?.value.split(',').map((item: string) => item.trim());
		this.entertainmentArray = this.entertainment?.value
			.split(',')
			.map((item: string) => item.trim());
		this.foodAndDrinksArray = this.foodAndDrinks?.value
			.split(',')
			.map((item: string) => item.trim());
		this.internetArray = this.internet?.value.split(',').map((item: string) => item.trim());
		this.moreArray = this.more?.value.split(',').map((item: string) => item.trim());
		this.highlightsArray = this.highlights?.value.split(',').map((item: string) => item.trim());
	}

	onSubmit(): void {
		this.getFormData();
		const data = {
			id: 0,
			name: this.roomName,
			imgUrl: this.imageUrl,
			type: this.roomType,
			capacity: this.roomCapacity,
			available: true,
			initialPrice: this.roomInitialPrice,
			taxesAndFees: this.roomTaxesAndFees,
			totalPrice: 0,
			bathroomAmenities: this.bathroomArray,
			bedroomAmenities: this.bedroomArray,
			entertainmentAmenities: this.entertainmentArray,
			foodAndDrinksAmenities: this.foodAndDrinksArray,
			internetAmenities: this.internetArray,
			moreAmenities: this.moreArray,
			highlights: this.highlightsArray
		};

		console.log(data);

		this.subscription = this.adminService.createRoom(data).subscribe(
			() => {
				console.log('Room created');
			},
			(error) => {
				console.error('Error creating Room', error);
			}
		);
	}

	initForm(): FormGroup {
		return this.fb.group({
			name: ['', Validators.required],
			imgUrl: ['', [Validators.required, this.isValidLink]],
			type: ['', Validators.required],
			capacity: ['', Validators.required],
			initialPrice: ['', Validators.required],
			bathroom: ['', Validators.required],
			taxesAndFees: ['', Validators.required],
			bedroom: ['', Validators.required],
			entertainment: ['', Validators.required],
			foodAndDrinks: ['', Validators.required],
			internet: ['', Validators.required],
			more: ['', Validators.required],
			highlights: ['', Validators.required]
		});
	}

	isValidLink(control: FormControl): ValidationErrors | null {
		const value = control.value;

		const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(value);

		return isValidUrl ? null : { notValidUrl: true };
	}

	get name(): AbstractControl | null {
		return this.createRoomForm.get('name');
	}

	get imgUrl(): AbstractControl | null {
		return this.createRoomForm.get('imgUrl');
	}

	get type(): AbstractControl | null {
		return this.createRoomForm.get('type');
	}

	get initialPrice(): AbstractControl | null {
		return this.createRoomForm.get('initialPrice');
	}

	get capacity(): AbstractControl | null {
		return this.createRoomForm.get('capacity');
	}

	get bathroom(): AbstractControl | null {
		return this.createRoomForm.get('bathroom');
	}

	get taxesAndFees(): AbstractControl | null {
		return this.createRoomForm.get('taxesAndFees');
	}

	get bedroom(): AbstractControl | null {
		return this.createRoomForm.get('bedroom');
	}

	get entertainment(): AbstractControl | null {
		return this.createRoomForm.get('entertainment');
	}

	get foodAndDrinks(): AbstractControl | null {
		return this.createRoomForm.get('foodAndDrinks');
	}

	get internet(): AbstractControl | null {
		return this.createRoomForm.get('internet');
	}

	get more(): AbstractControl | null {
		return this.createRoomForm.get('more');
	}

	get highlights(): AbstractControl | null {
		return this.createRoomForm.get('highlights');
	}
}
