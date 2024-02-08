import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../services/admin.service';
import { CreateRoomComponent } from './create-room.component';

describe('CreateRoomComponent', () => {
	let component: CreateRoomComponent;
	let fixture: ComponentFixture<CreateRoomComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CreateRoomComponent],
			imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
			providers: [AdminService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateRoomComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a form with required controls', () => {
		expect(component.createRoomForm.get('name')).toBeTruthy();
		expect(component.createRoomForm.get('imgUrl')).toBeTruthy();
		expect(component.createRoomForm.get('type')).toBeTruthy();
		expect(component.createRoomForm.get('initialPrice')).toBeTruthy();
		expect(component.createRoomForm.get('capacity')).toBeTruthy();
		expect(component.createRoomForm.get('bathroom')).toBeTruthy();
		expect(component.createRoomForm.get('taxesAndFees')).toBeTruthy();
		expect(component.createRoomForm.get('bedroom')).toBeTruthy();
		expect(component.createRoomForm.get('entertainment')).toBeTruthy();
		expect(component.createRoomForm.get('foodAndDrinks')).toBeTruthy();
		expect(component.createRoomForm.get('internet')).toBeTruthy();
		expect(component.createRoomForm.get('more')).toBeTruthy();
		expect(component.createRoomForm.get('highlights')).toBeTruthy();
	});

	it('should call onSubmit method on button click', () => {
		spyOn(component, 'onSubmit');
		const button = fixture.debugElement.nativeElement.querySelector('a.btn');
		button.click();
		expect(component.onSubmit).toHaveBeenCalled();
	});

	afterEach(() => {
		fixture.destroy();
	});
});
