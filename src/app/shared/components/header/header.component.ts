import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginAuthService } from '../../../modules/auth/services/login-auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	isLoggedIn = false;

	subscription?: Subscription;

	constructor(private loginAuthService: LoginAuthService) {
		this.loginAuthService.getTokenClaims();
	}

	ngOnInit(): void {
		this.subscription = this.loginAuthService.authenticationChanged.subscribe(
			(isAuthenticated: boolean) => {
				this.isLoggedIn = isAuthenticated;
			}
		);

		this.subscription = this.loginAuthService.userInfo$.subscribe((userInfo) => {
			this.isLoggedIn = !!userInfo.id;
		});
	}

	logout(): void {
		this.loginAuthService.logout();
	}

	isAdmin(): boolean {
		return this.loginAuthService.isAdmin();
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
