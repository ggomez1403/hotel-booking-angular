import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Bill } from '../../../core/models/Bill.model';
import { BillDetail } from '../../../core/models/BillDetail.model';
import { BillDetailResponse } from '../../../core/models/BillDetailResponse.model';
import { BillResponse } from '../../../core/models/BillResponse.model';

@Injectable({
	providedIn: 'root'
})
export class BillService {
	constructor(private http: HttpClient) {}

	private readonly apiUrl = environment.api;

	createBillDetail(body: BillDetail): Observable<void> {
		return this.http.post(`${this.apiUrl}/bill-detail/bill-details`, body).pipe(map(() => {}));
	}

	getBillDetailByReservationId(reservationId: number): Observable<BillDetailResponse[]> {
		return this.http
			.get(`${this.apiUrl}/bill-detail?reservationId=${reservationId}`)
			.pipe(map((response: any) => response));
	}

	getBillByBillDetailId(billDetailId: number): Observable<BillResponse[]> {
		return this.http
			.get(`${this.apiUrl}/bill?billDetailId=${billDetailId}`)
			.pipe(map((response: any) => response));
	}

	createBill(body: Bill): Observable<void> {
		return this.http.post(`${this.apiUrl}/bill/bills`, body).pipe(map(() => {}));
	}

	deleteBillDetail(billDetailId: number): Observable<Object> {
		return this.http.delete(`${this.apiUrl}/bill-detail/bill-details/${billDetailId}`);
	}

	deleteBill(billId: number): Observable<Object> {
		return this.http.delete(`${this.apiUrl}/bill/bills/${billId}`);
	}
}
