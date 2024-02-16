import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/models/User.model';
import { AdminService } from '../../services/admin.service';

@Component({
	selector: 'app-all-users',
	templateUrl: './all-users.component.html',
	styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {
	subscription?: Subscription;
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'role'];
	dataSource!: MatTableDataSource<User>;

	users: User[] = [];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private adminService: AdminService) {}

	ngOnInit(): void {
		window.scrollTo(0, 0);
		this.getUsersInfo();
	}

	getUsersInfo(): void {
		this.subscription = this.adminService.getAllUsers().subscribe((data: User[]) => {
			this.users = data;
			this.dataSource = new MatTableDataSource(data);
			setTimeout(() => {
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
		});
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
