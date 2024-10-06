import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Launche,
  Launches,
  MonthAndYears,
} from '../../interfaces/launches.interface';

@Injectable({
  providedIn: 'root',
})
export class LaunchesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMonthsAndYears(): Observable<MonthAndYears[]> {
    return this.http.get<MonthAndYears[]>(`${this.apiUrl}/months`);
  }

  getLaunchesForMonth(month: string, year: string): Observable<Launches> {
    return this.http.get<Launches>(
      `${this.apiUrl}/${month.toLowerCase()}${year}`
    );
  }

  postLaunche(
    month: string,
    year: string,
    launches: Launches
  ): Observable<Launches> {
    return this.http.post<Launches>(
      `${this.apiUrl}/${month.toLowerCase()}${year}`,
      launches
    );
  }

  putLaunche(
    month: string,
    year: string,
    launches: Launche[]
  ): Observable<Launches> {
    return this.http.put<Launches>(
      `${this.apiUrl}/${month.toLowerCase()}${year}`,
      launches
    );
  }

  deleteLaunche(
    month: string,
    year: string,
    launches: Launches
  ): Observable<Launches> {
    return this.http.post<Launches>(
      `${this.apiUrl}/${month.toLowerCase()}${year}`,
      launches
    );
  }
}
