import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Launche } from '../../interfaces/launches.interface';

@Component({
  selector: 'app-dialog-edit-launche',
  templateUrl: 'dialog-edit-launche.component.html',
})
export class DialogEditLaunche {
  constructor(
    public dialogRef: MatDialogRef<DialogEditLaunche>,
    @Inject(MAT_DIALOG_DATA) public data: Launche
  ) {}

  saveOrCancel(launche: Launche) {
    const newLaunche: Launche = {
      id: this.data.id,
      description: launche?.description,
      type: launche?.type,
      value: launche?.value,
    };

    this.dialogRef.close(newLaunche ? newLaunche : undefined);
  }
}
