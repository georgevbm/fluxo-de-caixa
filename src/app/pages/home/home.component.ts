import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogConfirm } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { DialogEditLaunche } from '../../shared/components/dialog-edit-launche/dialog-edit-launche.component';
import { MessageErrors } from '../../shared/enums/message-errors.enum';
import { TypeLauncheEnum } from '../../shared/enums/type-launch.enum';
import {
  Launche,
  MonthAndYears,
} from '../../shared/interfaces/launches.interface';
import { LaunchesService } from '../../shared/services/launches/launches.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  monthsAndYears$!: Observable<MonthAndYears[]>;
  currentLaunches!: Launche[];
  currentMonthAndYear!: MonthAndYears;

  resetForm = false;
  isLoading = false;

  totalEntries = 0;
  totalExits = 0;
  total = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private launchesService: LaunchesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.monthsAndYears$ = this.launchesService.getMonthsAndYears();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  private defineTotalValues() {
    this.totalEntries = this.sumTotal(TypeLauncheEnum.ENTRADA);
    this.totalExits = this.sumTotal(TypeLauncheEnum.SAIDA);
    this.total = this.totalEntries - this.totalExits;
  }

  save(launche: Launche) {
    this.launchesService
      .postLaunche(
        this.currentMonthAndYear.month,
        this.currentMonthAndYear.year,
        launche
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.getCurrentLaunches(this.currentMonthAndYear);
          this.resetForm = true;
        },
        error: () => {
          this.snackBar.open(MessageErrors.ERROR_CREATE, 'Ok');
          this.isLoading = false;
        },
      });
  }

  sumTotal(type: TypeLauncheEnum) {
    const launches = this.currentLaunches.filter(
      launche => launche.type === type
    );

    return launches.reduce((acc, item) => acc + Number(item.value), 0);
  }

  openDialogEdit(launche: Launche): void {
    const dialogRef = this.dialog.open(DialogEditLaunche, {
      width: '100%',
      height: 'fit-content',
      data: launche,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.launchesService
          .putLaunche(
            this.currentMonthAndYear.month,
            this.currentMonthAndYear.year,
            result
          )
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.getCurrentLaunches(this.currentMonthAndYear);
            },
            error: () => {
              this.snackBar.open(MessageErrors.ERROR_EDIT, 'Ok');
              this.isLoading = false;
            },
          });
      }
    });
  }

  openDialogDelete(launche: Launche): void {
    const dialogRef = this.dialog.open(DialogConfirm, {
      width: 'fit-content',
      height: 'fit-content',
      data: launche,
    });

    dialogRef.afterClosed().subscribe(idLaunche => {
      if (idLaunche) {
        this.launchesService
          .deleteLaunche(
            this.currentMonthAndYear.month,
            this.currentMonthAndYear.year,
            idLaunche
          )
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.getCurrentLaunches(this.currentMonthAndYear);
            },
            error: () => {
              this.snackBar.open(MessageErrors.ERROR_DELETE, 'Ok');
              this.isLoading = false;
            },
          });
      }
    });
  }

  getCurrentLaunches(monthAndYear: MonthAndYears) {
    this.isLoading = true;
    this.currentMonthAndYear = monthAndYear;

    this.launchesService
      .getLaunchesForMonth(monthAndYear.month, monthAndYear.year)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: data => {
          this.currentLaunches = data;
          this.defineTotalValues();
          this.isLoading = false;
        },
        error: () => {
          this.snackBar.open(MessageErrors.ERROR_FETCH, 'Ok');
          this.isLoading = false;
        },
      });
  }
}
