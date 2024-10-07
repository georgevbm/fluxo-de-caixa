import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogConfirm } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { DialogEditLaunche } from 'src/app/shared/components/dialog-edit-launche/dialog-edit-launche.component';
import { TypeLauncheEnum } from 'src/app/shared/enums/type-launch.enum';
import {
  Launche,
  MonthAndYears,
} from 'src/app/shared/interfaces/launches.interface';
import { LaunchesService } from 'src/app/shared/services/launches/launches.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  monthsAndYears$!: Observable<MonthAndYears[]>;
  currentLaunches!: Launche[];
  currentMonthAndYear!: MonthAndYears;

  totalEntries = 0;
  totalExits = 0;
  total = 0;

  constructor(
    private launchesService: LaunchesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.monthsAndYears$ = this.launchesService.getMonthsAndYears();
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
      .subscribe(() => {
        this.getCurrentLaunches(this.currentMonthAndYear);
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
      console.log(result);

      if (result) {
        this.launchesService
          .putLaunche(
            this.currentMonthAndYear.month,
            this.currentMonthAndYear.year,
            result
          )
          .subscribe(() => {
            this.getCurrentLaunches(this.currentMonthAndYear);
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.launchesService
          .deleteLaunche(
            this.currentMonthAndYear.month,
            this.currentMonthAndYear.year,
            result.id
          )
          .subscribe(() => {
            this.getCurrentLaunches(this.currentMonthAndYear);
          });
      }
    });
  }

  getCurrentLaunches(monthAndYear: MonthAndYears) {
    this.currentMonthAndYear = monthAndYear;

    this.launchesService
      .getLaunchesForMonth(monthAndYear.month, monthAndYear.year)
      .subscribe(data => {
        this.currentLaunches = data;
        this.defineTotalValues();
      });
  }
}
