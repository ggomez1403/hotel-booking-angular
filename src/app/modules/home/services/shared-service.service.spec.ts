import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared-service.service';

describe('SharedService', () => {
	let sharedService: SharedService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SharedService]
		});

		sharedService = TestBed.inject(SharedService);
	});

	it('should be created', () => {
		expect(sharedService).toBeTruthy();
	});

	it('should have facilities defined', () => {
		expect(sharedService.facilities).toBeDefined();
		expect(sharedService.facilities.length).toBeGreaterThan(0);
	});

	it('should have luxuriousRooms defined', () => {
		expect(sharedService.luxuriousRooms).toBeDefined();
		expect(sharedService.luxuriousRooms.length).toBeGreaterThan(0);
	});

	it('should have testimonies defined', () => {
		expect(sharedService.testimonies).toBeDefined();
		expect(sharedService.testimonies.length).toBeGreaterThan(0);
	});
});
