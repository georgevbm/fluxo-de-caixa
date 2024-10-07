import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDollar } from './dialog-dollar.component';

describe('DialogDollar', () => {
  let component: DialogDollar;
  let fixture: ComponentFixture<DialogDollar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDollar],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDollar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
