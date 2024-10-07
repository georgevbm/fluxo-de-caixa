import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CurrencyQuotationService } from '../../services/currency-quotation/currency-quotation.service';

@Component({
  selector: 'app-dialog-dollar',
  templateUrl: 'dialog-dollar.component.html',
  styleUrls: ['./dialog-dollar.component.scss'],
})
export class DialogDollar implements OnInit {
  quotationDollar$!: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<DialogDollar>,
    private currencyService: CurrencyQuotationService
  ) {}

  ngOnInit() {
    this.quotationDollar$ = this.currencyService.getUniqueQuotation('USD');
  }
}
