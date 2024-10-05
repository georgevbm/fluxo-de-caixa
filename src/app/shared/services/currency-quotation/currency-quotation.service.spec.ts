import { TestBed } from '@angular/core/testing';
import { DollarQuotationService } from './currency-quotation.service';

describe('CurrencyQuotationService', () => {
  let service: DollarQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DollarQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
