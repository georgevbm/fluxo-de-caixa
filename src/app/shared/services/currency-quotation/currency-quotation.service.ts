import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Currency } from '../../interfaces/currency.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyQuotationService {
  private apiUrl = 'https://economia.awesomeapi.com.br/json/last';

  constructor(private http: HttpClient) {}

  getUniqueQuotation(currency: string): Observable<Currency> {
    return this.http
      .get<Currency>(`${this.apiUrl}/${currency}`)
      .pipe(map((data: any) => data[`${currency}BRL`]));
  }
}
