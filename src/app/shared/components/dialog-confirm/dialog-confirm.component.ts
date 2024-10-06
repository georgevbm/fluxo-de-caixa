import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Launche } from '../../interfaces/launches.interface';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: 'dialog-confirm.component.html',
})
export class DialogConfirm {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: Launche
  ) {}

  saveOrCancel(event: Launche) {
    const launche: Launche = {
      id: this.data.id,
      description: event.description,
      type: event.type,
      value: event.value,
    };

    this.dialogRef.close(launche ? launche : undefined);
  }
}
