import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Launche, MonthAndYears } from '../../interfaces/launches.interface';

@Injectable({
  providedIn: 'root',
})
export class LaunchesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMonthsAndYears(): Observable<MonthAndYears[]> {
    return this.http.get<MonthAndYears[]>(`${this.apiUrl}/months`);
  }

  getLaunchesForMonth(month: string, year: string): Observable<Launche[]> {
    return this.http.get<Launche[]>(
      `${this.apiUrl}/${month.toLowerCase()}${year}`
    );
  }

  postLaunche(
    month: string,
    year: string,
    launche: Launche
  ): Observable<Launche[]> {
    return this.http.post<Launche[]>(
      `${this.apiUrl}/${month.toLowerCase()}${year}`,
      launche
    );
  }

  putLaunche(month: string, year: string, launche: Launche): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${month.toLowerCase()}${year}/${launche.id}`,
      launche
    );
  }

  deleteLaunche(
    month: string,
    year: string,
    idLaunche: number
  ): Observable<Launche[]> {
    return this.http.delete<Launche[]>(
      `${this.apiUrl}/${month.toLowerCase()}${year}/${idLaunche}`
    );
  }
}
