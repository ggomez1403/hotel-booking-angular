import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
	HttpClientTestingModule,
	HttpTestingController,
	TestRequest
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { InjectSessionInterceptor } from './inject-session.interceptor';

describe('InjectSessionInterceptor', () => {
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;
	let cookieService: CookieService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: InjectSessionInterceptor,
					multi: true
				},
				CookieService
			],
			imports: [HttpClientTestingModule]
		});

		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
		cookieService = TestBed.inject(CookieService);
	});

	it('should add authorization header with token from cookie', () => {
		spyOn(cookieService, 'get').and.returnValue('mockToken');

		httpClient.get('/api/data').subscribe(() => {});

		const req: TestRequest = httpTestingController.expectOne('/api/data');
		expect(req.request.headers.has('authorization')).toBeTruthy();
		expect(req.request.headers.get('authorization')).toBe('Bearer mockToken');

		req.flush({});
	});

	it('should handle errors and continue without adding authorization header', () => {
		spyOn(cookieService, 'get').and.throwError('Cookie not available');

		httpClient.get('/api/data').subscribe(
			() => {},
			(error: HttpErrorResponse) => {}
		);

		const req: TestRequest = httpTestingController.expectOne('/api/data');
		expect(req.request.headers.has('authorization')).toBeFalsy();

		req.error(new ErrorEvent('Fake error'), { status: 500, statusText: 'Internal Server Error' });
	});

	afterEach(() => {
		httpTestingController.verify();
	});
});
