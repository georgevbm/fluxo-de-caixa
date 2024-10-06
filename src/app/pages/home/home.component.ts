import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  isLoading = false;

  totalEntries = 0;
  totalExits = 0;
  total = 0;

  constructor(private launchesService: LaunchesService) {}

  ngOnInit() {
    this.monthsAndYears$ = this.launchesService.getMonthsAndYears();
  }

  save(event: Launche) {
    console.log(event);
  }

  sumTotal(type: TypeLauncheEnum) {
    const launcheEntries = this.currentLaunches.filter(
      launche => launche.type === type
    );

    return launcheEntries.reduce((acc, item) => acc + item.value, 0);
  }

  getCurrentLaunches(monthAndYear: MonthAndYears) {
    this.launchesService
      .getLaunchesForMonth(monthAndYear.month, monthAndYear.year)
      .subscribe(data => {
        this.currentLaunches = data.launches;

        this.totalEntries = this.sumTotal(TypeLauncheEnum.ENTRADA);
        this.totalExits = this.sumTotal(TypeLauncheEnum.SAIDA);
        this.total = this.totalEntries - this.totalExits;
      });
  }
}
