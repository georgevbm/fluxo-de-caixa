import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { FormLauncheComponent } from '../../shared/components/form-launche/form-launche.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MessageErrors } from '../../shared/enums/message-errors.enum';
import { TypeLauncheEnum } from '../../shared/enums/type-launch.enum';
import {
  Launche,
  MonthAndYears,
} from '../../shared/interfaces/launches.interface';
import { LaunchesService } from '../../shared/services/launches/launches.service';
import { HomeComponent } from './home.component';

const mockLaunchesService = {
  getMonthsAndYears: jest.fn(),
  postLaunche: jest.fn(),
  putLaunche: jest.fn(),
  deleteLaunche: jest.fn(),
  getLaunchesForMonth: jest.fn(),
};

const mockMatDialog = {
  open: jest.fn().mockReturnValue({
    afterClosed: () => of(true),
  }),
};

const matSnackBarMock = {
  open: jest.fn(),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockMonthAndYears: MonthAndYears = { month: 'Outubro', year: '2024' };
  const mockLaunches: Launche[] = [
    {
      id: 1,
      description: 'Launche 1',
      type: TypeLauncheEnum.ENTRADA,
      value: 100,
    },
    { id: 2, description: 'Launche 2', type: TypeLauncheEnum.SAIDA, value: 50 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
      ],
      declarations: [HomeComponent, FormLauncheComponent, LoadingComponent],
      providers: [
        { provide: LaunchesService, useValue: mockLaunchesService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: matSnackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize monthsAndYears$ on ngOnInit', () => {
    const mockMonthsAndYearsData = [mockMonthAndYears];
    mockLaunchesService.getMonthsAndYears.mockReturnValue(
      of(mockMonthsAndYearsData)
    );

    component.ngOnInit();
    expect(mockLaunchesService.getMonthsAndYears).toHaveBeenCalled();
    component.monthsAndYears$.subscribe(monthsAndYears => {
      expect(monthsAndYears).toEqual(mockMonthsAndYearsData);
    });
  });

  it('should get current launches and set total values', () => {
    mockLaunchesService.getLaunchesForMonth.mockReturnValue(of(mockLaunches));

    component.getCurrentLaunches(mockMonthAndYears);
    expect(mockLaunchesService.getLaunchesForMonth).toHaveBeenCalledWith(
      'Outubro',
      '2024'
    );

    expect(component.currentMonthAndYear).toEqual(mockMonthAndYears);
    expect(component.currentLaunches).toEqual(mockLaunches);
    expect(component.totalEntries).toBe(100);
    expect(component.totalExits).toBe(50);
    expect(component.total).toBe(50);
  });

  it('should call postLaunche when save is called', () => {
    const mockNewLaunche: Launche = {
      id: 3,
      description: 'New Launche',
      type: TypeLauncheEnum.ENTRADA,
      value: 150,
    };
    component.currentMonthAndYear = mockMonthAndYears;
    mockLaunchesService.postLaunche.mockReturnValue(of([]));

    component.save(mockNewLaunche);
    expect(mockLaunchesService.postLaunche).toHaveBeenCalledWith(
      'Outubro',
      '2024',
      mockNewLaunche
    );
  });

  it('should open edit dialog and call putLaunche', () => {
    const mockEditedLaunche: Launche = {
      id: 1,
      description: 'Edited Launche',
      type: TypeLauncheEnum.ENTRADA,
      value: 200,
    };
    component.currentMonthAndYear = mockMonthAndYears;
    mockMatDialog.open.mockReturnValue({
      afterClosed: () => of(mockEditedLaunche),
    });
    mockLaunchesService.putLaunche.mockReturnValue(of([]));

    component.openDialogEdit(mockLaunches[0]);
    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(mockLaunchesService.putLaunche).toHaveBeenCalledWith(
      'Outubro',
      '2024',
      mockEditedLaunche
    );
  });

  it('should open delete dialog and call deleteLaunche', () => {
    component.currentMonthAndYear = mockMonthAndYears;
    mockMatDialog.open.mockReturnValue({
      afterClosed: () => of(1),
    });
    mockLaunchesService.deleteLaunche.mockReturnValue(of([]));

    component.openDialogDelete(mockLaunches[0]);
    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(mockLaunchesService.deleteLaunche).toHaveBeenCalledWith(
      'Outubro',
      '2024',
      1
    );
  });

  it('should show snakbar when there is error getting data', () => {
    mockLaunchesService.getLaunchesForMonth.mockReturnValue(
      throwError(() => new Error('error'))
    );

    component.getCurrentLaunches(mockMonthAndYears);

    expect(matSnackBarMock.open).toHaveBeenCalledWith(
      MessageErrors.ERROR_FETCH,
      'Ok'
    );
  });

  it('should show snakbar when there is error updating', () => {
    const mockEditedLaunche: Launche = {
      id: 1,
      description: 'Edited Launche',
      type: TypeLauncheEnum.ENTRADA,
      value: 200,
    };
    component.currentMonthAndYear = mockMonthAndYears;
    mockMatDialog.open.mockReturnValue({
      afterClosed: () => of(mockEditedLaunche),
    });
    mockLaunchesService.putLaunche.mockReturnValue(
      throwError(() => new Error('error'))
    );

    component.openDialogEdit(mockLaunches[0]);

    expect(matSnackBarMock.open).toHaveBeenCalledWith(
      MessageErrors.ERROR_EDIT,
      'Ok'
    );
  });

  it('should show snakbar when there is error deleting', () => {
    component.currentMonthAndYear = mockMonthAndYears;
    mockMatDialog.open.mockReturnValue({
      afterClosed: () => of(1),
    });
    mockLaunchesService.deleteLaunche.mockReturnValue(
      throwError(() => new Error('error'))
    );

    component.openDialogDelete(mockLaunches[0]);

    expect(matSnackBarMock.open).toHaveBeenCalledWith(
      MessageErrors.ERROR_DELETE,
      'Ok'
    );
  });

  it('should show snakbar when there is error creating', () => {
    component.currentMonthAndYear = mockMonthAndYears;
    jest
      .spyOn(mockLaunchesService, 'postLaunche')
      .mockReturnValue(throwError(() => new Error('error')));

    component.save(mockLaunches[0]);

    expect(matSnackBarMock.open).toHaveBeenCalledWith(
      MessageErrors.ERROR_CREATE,
      'Ok'
    );
  });
});
