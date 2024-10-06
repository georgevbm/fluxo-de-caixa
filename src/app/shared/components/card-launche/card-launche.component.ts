import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TypeLauncheEnum } from '../../enums/type-launch.enum';
import { Launche } from '../../interfaces/launches.interface';
import { LaunchesService } from '../../services/launches/launches.service';
import { DialogEditLaunche } from '../dialog-edit-launche/dialog-edit-launche.component';

@Component({
  selector: 'app-card-launche',
  templateUrl: './card-launche.component.html',
  styleUrls: ['./card-launche.component.scss'],
})
export class CardLauncheComponent {
  @Input() launches!: Launche[];
  TypeLauncheEnum = TypeLauncheEnum;

  constructor(
    public dialog: MatDialog,
    private launcheService: LaunchesService
  ) {}

  openDialogEdit(launche: Launche): void {
    const dialogRef = this.dialog.open(DialogEditLaunche, {
      width: '100%',
      height: 'fit-content',
      data: launche,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.launcheService
        .putLaunche('Outubro', '2024', [result])
        .subscribe(data => {
          console.log(data);
        });
    });
  }
}
