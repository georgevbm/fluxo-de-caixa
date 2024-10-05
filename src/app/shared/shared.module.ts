import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { DialogEditLaunche } from './components/dialog-edit-launche/dialog-edit-launche.component';
import { FormLauncheComponent } from './components/form-launche/form-launche.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MonthNavigateComponent } from './components/month-navigate/month-navigate.component';

@NgModule({
  declarations: [
    LoadingComponent,
    MonthNavigateComponent,
    DialogEditLaunche,
    FormLauncheComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    LoadingComponent,
    MonthNavigateComponent,
    DialogEditLaunche,
    FormLauncheComponent,
  ],
})
export class SharedModule {}
