import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	declarations: [HeaderComponent, FooterComponent],
	imports: [CommonModule, RouterModule.forRoot([]), ReactiveFormsModule],
	exports: [HeaderComponent, FooterComponent]
})
export class SharedModule {}
