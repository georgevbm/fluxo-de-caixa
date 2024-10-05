import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditLaunche } from 'src/app/shared/components/dialog-edit-launche/dialog-edit-launche.component';
import { FormLaunche } from 'src/app/shared/interfaces/form-launche.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  save(event: FormLaunche) {
    console.log(event);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditLaunche, {
      width: '100%',
      height: 'fit-content',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
