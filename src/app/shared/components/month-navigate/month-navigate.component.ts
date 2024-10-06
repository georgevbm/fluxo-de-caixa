import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MonthAndYears } from '../../interfaces/launches.interface';

@Component({
  selector: 'app-month-navigate',
  templateUrl: './month-navigate.component.html',
  styleUrls: ['./month-navigate.component.scss'],
})
export class MonthNavigateComponent implements OnInit {
  @Input() monthsAndYears!: MonthAndYears[];
  @Output() currentMonthAndYears = new EventEmitter<MonthAndYears>();

  currentIndex = 0;

  ngOnInit() {
    this.currentMonthAndYears.emit(this.monthsAndYears[this.currentIndex]);
  }

  next() {
    if (this.currentIndex !== this.monthsAndYears.length - 1) {
      this.currentIndex++;
      this.currentMonthAndYears.emit(this.monthsAndYears[this.currentIndex]);
    }
  }

  previous() {
    if (this.currentIndex !== 0) {
      this.currentIndex--;
      this.currentMonthAndYears.emit(this.monthsAndYears[this.currentIndex]);
    }
  }
}
