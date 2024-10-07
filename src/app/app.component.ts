import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDollar } from './shared/components/dialog-dollar/dialog-dollar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openDialogDollar() {
    this.dialog.open(DialogDollar, {
      width: '100%',
      height: 'fit-content',
    });
  }
}
