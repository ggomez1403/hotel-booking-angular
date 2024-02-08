import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FacilitiesComponent } from './components/facilities/facilities.component'
import { HeroComponent } from './components/hero/hero.component'
import { LuxuriousRoomsComponent } from './components/luxurious-rooms/luxurious-rooms.component'
import { TestimoniesComponent } from './components/testimonies/testimonies.component'
import { MainPageComponent } from './pages/main-page/main-page.component'

@NgModule({
	declarations: [
		FacilitiesComponent,
		HeroComponent,
		LuxuriousRoomsComponent,
		TestimoniesComponent,
		MainPageComponent
	],
	imports: [CommonModule, RouterModule.forRoot([])]
})
export class HomeModule {}
