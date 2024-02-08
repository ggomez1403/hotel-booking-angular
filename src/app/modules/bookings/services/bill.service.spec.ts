import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { BillService } from './bill.service';

describe('BillService', () => {
	let service: BillService;
	let httpTestingController: HttpTestingController;
	let apiUrl = environment.api;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [BillService]
		});

		service = TestBed.inject(BillService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should create a bill detail', () => {
		const billDetailData = {
			description: 'Test Bill Detail',
			reservationId: 123
		};

		service.createBillDetail(billDetailData).subscribe();

		const req = httpTestingController.expectOne(`${apiUrl}/bill-detail/bill-details`);
		expect(req.request.method).toEqual('POST');
		expect(req.request.body).toEqual(billDetailData);

		req.flush({});
	});

	it('should get bill details by reservationId', () => {
		const reservationId = 123;

		service.getBillDetailByReservationId(reservationId).subscribe();

		const req = httpTestingController.expectOne(
			`${apiUrl}/bill-detail?reservationId=${reservationId}`
		);
		expect(req.request.method).toEqual('GET');

		req.flush([]);
	});

	it('should get bills by billDetailId', () => {
		const billDetailId = 123;

		service.getBillByBillDetailId(billDetailId).subscribe();

		const req = httpTestingController.expectOne(`${apiUrl}/bill?billDetailId=${billDetailId}`);
		expect(req.request.method).toEqual('GET');

		req.flush([]);
	});

	it('should create a bill', () => {
		const billData = {
			billDetailId: 1,
			issuedDate: '2023-12-12'
		};

		service.createBill(billData).subscribe();

		const req = httpTestingController.expectOne(`${apiUrl}/bill/bills`);
		expect(req.request.method).toEqual('POST');
		expect(req.request.body).toEqual(billData);

		req.flush({});
	});

	it('should delete a bill detail', () => {
		const billDetailId = 123;

		service.deleteBillDetail(billDetailId).subscribe();

		const req = httpTestingController.expectOne(
			`${apiUrl}/bill-detail/bill-details/${billDetailId}`
		);
		expect(req.request.method).toEqual('DELETE');

		req.flush({});
	});

	it('should delete a bill', () => {
		const billId = 123;

		service.deleteBill(billId).subscribe();

		const req = httpTestingController.expectOne(`${apiUrl}/bill/bills/${billId}`);
		expect(req.request.method).toEqual('DELETE');

		req.flush({});
	});
});
