import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DialogDollar } from './shared/components/dialog-dollar/dialog-dollar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, DialogDollar],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open dialogDollar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const spyDialog = jest.spyOn(MatDialog.prototype, 'open');
    app.openDialogDollar();

    expect(spyDialog).toHaveBeenCalled();
  });
});
