import { BillDetailResponse } from './BillDetailResponse.model';

export interface BillResponse {
	id: number;
	totalAmount: number;
	issuedDate: string;
	billDetail: BillDetailResponse;
}
