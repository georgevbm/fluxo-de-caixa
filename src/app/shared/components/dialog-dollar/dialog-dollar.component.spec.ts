import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CurrencyQuotationService } from '../../services/currency-quotation/currency-quotation.service';
import { DialogDollar } from './dialog-dollar.component';

describe('DialogDollar', () => {
  let component: DialogDollar;
  let fixture: ComponentFixture<DialogDollar>;
  let dialogRef: MatDialogRef<DialogDollar>;
  let currencyService: CurrencyQuotationService;

  const mockCurrencyService = {
    getUniqueQuotation: jest.fn().mockReturnValue(of({ bid: 5.25 })),
  };

  beforeEach(async () => {
    dialogRef = {} as MatDialogRef<DialogDollar>;

    await TestBed.configureTestingModule({
      declarations: [DialogDollar],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: CurrencyQuotationService, useValue: mockCurrencyService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDollar);
    component = fixture.componentInstance;

    currencyService = TestBed.inject(CurrencyQuotationService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set quotationDollar$ on ngOnInit', () => {
    component.ngOnInit();
    expect(currencyService.getUniqueQuotation).toHaveBeenCalledWith('USD');
    component.quotationDollar$.subscribe(data => {
      expect(data).toEqual({ bid: 5.25 });
    });
  });
});
