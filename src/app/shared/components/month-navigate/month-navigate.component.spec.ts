import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MonthAndYears } from '../../interfaces/launches.interface';
import { MonthNavigateComponent } from './month-navigate.component';

describe('MonthNavigateComponent', () => {
  let component: MonthNavigateComponent;
  let fixture: ComponentFixture<MonthNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [MonthNavigateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthNavigateComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the current month and year on initialization', () => {
    const mockMonthsAndYears: MonthAndYears[] = [
      { month: 'Outubro', year: '2024' },
      { month: 'Novembro', year: '2024' },
    ];
    component.monthsAndYears = mockMonthsAndYears;

    const spy = jest.spyOn(component.currentMonthAndYears, 'emit');

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(mockMonthsAndYears[0]);
  });

  it('should emit the next month and year when next() is called', () => {
    const mockMonthsAndYears: MonthAndYears[] = [
      { month: 'Outubro', year: '2024' },
      { month: 'Novembro', year: '2024' },
    ];
    component.monthsAndYears = mockMonthsAndYears;

    const spy = jest.spyOn(component.currentMonthAndYears, 'emit');

    component.ngOnInit();
    component.next();

    expect(spy).toHaveBeenCalledWith(mockMonthsAndYears[1]);
  });

  it('should not emit anything if next() is called on the last month', () => {
    const mockMonthsAndYears: MonthAndYears[] = [
      { month: 'Outubro', year: '2024' },
      { month: 'Novembro', year: '2024' },
    ];
    component.monthsAndYears = mockMonthsAndYears;

    const spy = jest.spyOn(component.currentMonthAndYears, 'emit');

    component.ngOnInit();
    component.next();
    component.next();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should emit the previous month and year when previous() is called', () => {
    const mockMonthsAndYears: MonthAndYears[] = [
      { month: 'Outubro', year: '2024' },
      { month: 'Novembro', year: '2024' },
    ];
    component.monthsAndYears = mockMonthsAndYears;

    const spy = jest.spyOn(component.currentMonthAndYears, 'emit');

    component.ngOnInit();
    component.next();
    component.previous();

    expect(spy).toHaveBeenCalledWith(mockMonthsAndYears[0]);
  });

  it('should not emit anything if previous() is called on the first month', () => {
    const mockMonthsAndYears: MonthAndYears[] = [
      { month: 'Outubro', year: '2024' },
      { month: 'Novembro', year: '2024' },
    ];
    component.monthsAndYears = mockMonthsAndYears;

    const spy = jest.spyOn(component.currentMonthAndYears, 'emit');

    component.ngOnInit();
    component.previous();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
