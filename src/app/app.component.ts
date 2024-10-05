import { Component, OnInit } from '@angular/core';
import { Currency } from './shared/interfaces/currency.interface';
import { CurrencyQuotationService } from './shared/services/currency-quotation/currency-quotation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private currencyService: CurrencyQuotationService) {}

  ngOnInit() {
    this.currencyService
      .getUniqueQuotation('USD')
      .subscribe((data: Currency) => console.log(data));
  }
}
