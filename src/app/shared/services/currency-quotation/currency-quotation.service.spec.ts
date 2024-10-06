import { TestBed } from '@angular/core/testing';
import { CurrencyQuotationService } from './currency-quotation.service';

describe('CurrencyQuotationService', () => {
  let service: CurrencyQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
