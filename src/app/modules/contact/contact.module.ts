import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

@NgModule({
	declarations: [ContactPageComponent],
	imports: [CommonModule, ReactiveFormsModule]
})
export class ContactModule {}
