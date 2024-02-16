import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InjectSessionInterceptor } from './core/interceptors/inject-session.interceptor';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ContactModule } from './modules/contact/contact.module';
import { ExploreModule } from './modules/explore/explore.module';
import { HomeModule } from './modules/home/home.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HomeModule,
		AppRoutingModule,
		AuthModule,
		BookingsModule,
		SharedModule,
		RoomsModule,
		HttpClientModule,
		AdminModule,
		ExploreModule,
		ContactModule
	],
	providers: [
		CookieService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InjectSessionInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
