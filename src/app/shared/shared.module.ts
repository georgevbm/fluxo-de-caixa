import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxCurrencyModule } from 'ngx-currency';

import { ReactiveFormsModule } from '@angular/forms';
import { CardLauncheComponent } from './components/card-launche/card-launche.component';
import { DialogConfirm } from './components/dialog-confirm/dialog-confirm.component';
import { DialogDollar } from './components/dialog-dollar/dialog-dollar.component';
import { DialogEditLaunche } from './components/dialog-edit-launche/dialog-edit-launche.component';
import { FormLauncheComponent } from './components/form-launche/form-launche.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MonthNavigateComponent } from './components/month-navigate/month-navigate.component';

@NgModule({
  declarations: [
    LoadingComponent,
    MonthNavigateComponent,
    DialogEditLaunche,
    DialogConfirm,
    DialogDollar,
    FormLauncheComponent,
    CardLauncheComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
  ],
  exports: [
    LoadingComponent,
    MonthNavigateComponent,
    DialogEditLaunche,
    DialogConfirm,
    DialogDollar,
    FormLauncheComponent,
    CardLauncheComponent,
  ],
})
export class SharedModule {}
