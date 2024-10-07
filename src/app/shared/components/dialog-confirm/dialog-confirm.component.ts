import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Launche } from '../../interfaces/launches.interface';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: 'dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirm {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: Launche
  ) {}

  deleteOrCancel(isCancel: boolean) {
    this.dialogRef.close(isCancel ? undefined : this.data.id);
  }
}
