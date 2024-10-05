import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormLaunche } from '../../interfaces/form-launche.interface';

@Component({
  selector: 'app-dialog-edit-launche',
  templateUrl: 'dialog-edit-launche.component.html',
})
export class DialogEditLaunche {
  constructor(
    public dialogRef: MatDialogRef<DialogEditLaunche>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveOrCancel(event: FormLaunche) {
    console.log(event);
    if (event) {
    } else {
      this.dialogRef.close();
    }
  }
}
