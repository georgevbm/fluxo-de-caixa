import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Currency } from '../../interfaces/currency.interface';
import { CurrencyQuotationService } from './currency-quotation.service';

describe('CurrencyQuotationService', () => {
  let service: CurrencyQuotationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyQuotationService],
    });

    service = TestBed.inject(CurrencyQuotationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a currency quotation', () => {
    const mockResponse = {
      USDBRL: {
        code: 'USDBRL',
        codein: 'BRL',
        name: 'Dólar americano para real',
        high: '5.25',
        low: '5.20',
        varBid: '0.05',
        pctChange: '0.10',
        bid: '5.24',
        ask: '5.26',
        timestamp: '1631691157',
        create_date: '2021-09-15 17:32:37',
      },
    };

    const expectedQuotation: Currency = mockResponse.USDBRL;

    service.getUniqueQuotation('USD').subscribe(quotation => {
      expect(quotation).toEqual(expectedQuotation);
    });

    const req = httpTestingController.expectOne(
      'https://economia.awesomeapi.com.br/json/last/USD'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });
});
