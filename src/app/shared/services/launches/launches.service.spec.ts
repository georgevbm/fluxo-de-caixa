import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TypeLauncheEnum } from '../../enums/type-launch.enum';
import { Launche, MonthAndYears } from '../../interfaces/launches.interface';
import { LaunchesService } from './launches.service';

describe('LaunchesService', () => {
  let service: LaunchesService;
  let httpMock: HttpTestingController;

  const mockLaunches: Launche[] = [
    { id: 1, description: 'Test 1', type: TypeLauncheEnum.ENTRADA, value: 100 },
    { id: 2, description: 'Test 2', type: TypeLauncheEnum.SAIDA, value: 200 },
  ];

  const mockMonthsAndYears: MonthAndYears[] = [
    { month: 'Outubro', year: '2024' },
    { month: 'Novembro', year: '2024' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LaunchesService],
    });

    service = TestBed.inject(LaunchesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve months and years', () => {
    service.getMonthsAndYears().subscribe(monthsAndYears => {
      expect(monthsAndYears).toEqual(mockMonthsAndYears);
    });

    const req = httpMock.expectOne('http://localhost:3000/months');
    expect(req.request.method).toBe('GET');
    req.flush(mockMonthsAndYears);
  });

  it('should retrieve launches for a specific month and year', () => {
    const month = 'Outubro';
    const year = '2024';

    service.getLaunchesForMonth(month, year).subscribe(launches => {
      expect(launches).toEqual(mockLaunches);
    });

    const req = httpMock.expectOne('http://localhost:3000/Outubro2024');
    expect(req.request.method).toBe('GET');
    req.flush(mockLaunches);
  });

  it('should post a new launche for a specific month and year', () => {
    const month = 'Outubro';
    const year = '2024';
    const newLaunche: Launche = {
      id: 3,
      description: 'New Launche',
      type: TypeLauncheEnum.ENTRADA,
      value: 300,
    };

    service.postLaunche(month, year, newLaunche).subscribe(launches => {
      expect(launches).toEqual([...mockLaunches, newLaunche]);
    });

    const req = httpMock.expectOne('http://localhost:3000/Outubro2024');
    expect(req.request.method).toBe('POST');
    req.flush([...mockLaunches, newLaunche]);
  });

  it('should update a launche for a specific month and year', () => {
    const month = 'Outubro';
    const year = '2024';
    const updatedLaunche: Launche = {
      id: 1,
      description: 'Updated Launche',
      type: TypeLauncheEnum.ENTRADA,
      value: 150,
    };

    service.putLaunche(month, year, updatedLaunche).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:3000/Outubro2024/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });

  it('should delete a launche for a specific month and year', () => {
    const month = 'Outubro';
    const year = '2024';
    const launcheId = 1;

    service.deleteLaunche(month, year, launcheId).subscribe(launches => {
      expect(launches).toEqual(mockLaunches);
    });

    const req = httpMock.expectOne('http://localhost:3000/Outubro2024/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockLaunches);
  });
});
